import React, { Component, Fragment } from "react"
import qs from "query-string"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import styled from "styled-components"
import CategoryLinks from "./category-links/category-links"
import * as ProductActions from "./products/actions"
import * as FilterActions from "./filter/actions"

import Filter from "./filter/filter"

import Header from "./header"
import Sort from "./sort/sort"
import FilterLinks from "./filterLinks/filterLinks"
import Products from "./products/products"
import Breadcrumbs from "./breadcrumbs"

const removeTrailingSlash = value =>
  value[value.length - 1] === "/" ? value.slice(0, -1) : value

const getCategory = ({ category, 0: section }) => {
  // в текущей версии react-router 4.3.1 есть странное поведение
  // когда урл типа ".../kreslo/?something=beautiful" в section оказываются данные из query (т.е. ?something=beautiful)
  // поэтому делаем доп. проверку "section[0] !== '?'""
  return section && section[0] !== "?"
    ? (category += "_" + removeTrailingSlash(section).replace("/", "_"))
    : category
}

const DEFAULT_TITLE = "Каталог мебели в магазине yoursite"
const validQuery = search => {
  // проверка на валидные параметры в url
  try {
    decodeURIComponent(search)
  } catch (e) {
    return false
  }

  return true
}

class CatalogContainer extends Component {
  static title(store) {
    return store.catalog.products.title || DEFAULT_TITLE
  }

  static fetchData({ dispatch, params, Cookie }) {
    let { category, 0: ending } = params
    const [section, search] = ending.split("?")
    if (section)
      category += "_" + removeTrailingSlash(section).replace("/", "_")

    const query = search && validQuery(search) ? qs.parse(search) : {}

    return Promise.all([
      dispatch(ProductActions.fetch({ category, query, Cookie })),
      dispatch(FilterActions.fetch({ category, query, Cookie })),
    ])
  }

  componentDidMount() {
    this.pageSection = 1
    const { products, match, location, history } = this.props

    // невалидные параметры в url
    if (!validQuery(location.search)) {
      return history.replace({
        pathname: location.pathname,
        search: "",
      })
    }

    const category = getCategory(match.params)
    const query = qs.parse(location.search)

    if (!products.status || products.category !== category) {
      this.loadData(category, query)
    }

    document.title = products.title || DEFAULT_TITLE
  }

  componentDidUpdate(prevProps) {
    const { location, match, products } = this.props
    const category = getCategory(match.params)
    const query = qs.parse(location.search)

    if (
      location.pathname !== prevProps.location.pathname &&
      category !== prevProps.products.category
    ) {
      return this.loadData(category, query)
    }

    if (location.search !== prevProps.location.search)
      this.handleQueryChanges(category, query)

    if (products.title !== prevProps.products.title)
      document.title = products.title
  }

  loadData(category, query) {
    this.props.actions.products.fetch({ category, query })
    this.props.actions.filter.fetch({ category, query })
  }

  loadDataOnScroll = () => {
    const { location, match, actions, products } = this.props
    const category = getCategory(match.params)
    const query = qs.parse(location.search)

    return actions.products.fetch({
      category,
      query,
      pageSection: products.pageSection + 1,
      productOptions: {
        dontCalcCategoryCount: true,
        needAppend: true,
      },
    })
  }

  handleQueryChanges(category, query) {
    // productOptions содержит информацию о подгрузке постраничных дополнительных данных:
    // нужно ли обновить статистику о кол-ве; присоединить дополнительные данные или начать с новой странице
    let productOptions
    if (this.productOptions) {
      productOptions = this.productOptions
      this.productOptions = null
    }

    this.props.actions.products.fetch({ category, query, productOptions })
  }

  render() {
    const { actions, location, history, filter, match, products, auth } =
      this.props
    const { department } = match.params
    const category = getCategory(match.params)
    const query = qs.parse(location.search)

    return (
      <Block>
        <FilterLayout>
          <CategoryLinks />
          <Filter
            filter={filter}
            history={history}
            location={location}
            category={category}
            query={query}
            actions={actions.filter}
          />
        </FilterLayout>
        <Section>
          {products.status === "pending" && products.newCategory && <Overlay />}
          <Breadcrumbs
            breadcrumbs={products.breadcrumbs}
            department={department}
          />
          <Header
            category={category}
            count={products.count}
            title={products.title}
            status={products.status}
          />
          <FilterLinks {...{ location, query, history }} />
          <Sort {...{ history, query, location }} />
          <Products
            {...{
              products,
              actions,
              department,
              query,
              location,
              history,
              auth,
            }}
            setProductOptions={this.setProductOptions}
            load={this.loadDataOnScroll}
          />
        </Section>
      </Block>
    )
  }

  setProductOptions = productOptions => {
    this.productOptions = productOptions
  }
}

export default connect(
  state => ({
    products: state.catalog.products,
    filter: state.catalog.filter,
    auth: state.auth,
  }),
  dispatch => ({
    actions: {
      products: bindActionCreators(ProductActions, dispatch),
      filter: bindActionCreators(FilterActions, dispatch),
    },
  }),
)(CatalogContainer)

const Block = styled.div`
  min-height: 500px;
  position: relative;
  margin-top: 15px;
  padding-bottom: 140px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  @media (min-width: 768px) {
    margin-top: 20px;
  }
`

const Section = styled.div`
  position: relative;
  flex: 1 1 auto;
`

const FilterLayout = styled.div`
  flex: 0 0 240px;
  margin-right: 30px;

  @media (max-width: 1023px) {
    display: none;
  }
`

const Overlay = styled.div`
  position: absolute;
  //filter: blur(52px);
  top: -20px;
  left: -30px;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.79);
  bottom: 0;
  right: 0;
`
