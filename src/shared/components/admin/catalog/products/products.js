import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"

import CreateProduct from "./createProduct/createProduct"
import Filter from "./filter/filter"
import List from "./list/list"
import Spinner from "globalComponents/spinners/inline"

import Actions from "./actions"

import DONE_STATUS_LIST from "utils/data/doneStatusList"
import prettyPrice from "utils/prettyPrice"

const PAGE_LIMIT = 20

export default class Products extends Component {
  static title = "Управление продуктами"

  state = {
    page: 0,
    doneStatus: "",
    categories: {},
    brands: "",
    selectedBrand: "",
    products: [],
    paginatorCount: 0,
    status: null,
    folding: false,
  }

  componentDidMount() {
    document.title = this.constructor.title
    this.loadProducts()
    this.loadStats()

    try {
      const folding = JSON.parse(
        window.localStorage.getItem("admin-catalog-products-folding-btn"),
      )
      if (folding) this.setState({ folding: true })
    } catch (e) {
      console.log(
        "Ошибка при обращении к localStorage для admin-catalog-products-folding-btn",
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params

    if (prevProps.match.params.category !== category) {
      this.setState(
        () => ({ selectedBrand: "", doneStatus: "", newCategory: true }),
        () => this.loadProducts(),
      )
    }
  }

  async loadStats() {
    try {
      const [categories, brands] = await Promise.all([
        Actions.fetchCategories(),
        Actions.fetchBrands(),
      ])
      this.setState({ categories, brands })
    } catch (e) {
      console.error(e)
    }
  }

  async loadProducts(more) {
    const { actions, location, match, query } = this.props
    const { category } = match.params
    this.setState(state => ({ status: "pending" }))
    // скроллинг наверх
    if (!more) {
      const container = document.getElementById("js_catalog-list")
      if (container) container.scrollTop = 0
    }
    const { doneStatus, selectedBrand } = this.state
    const page = more ? this.state.page + 1 : 1
    try {
      const { count, products } = await Actions.fetchProducts(
        category,
        PAGE_LIMIT,
        page,
        doneStatus,
        selectedBrand,
      )

      const result = products.map(this.prepareProduct)
      this.setState(state => ({
        products: more ? state.products.concat(result) : result,
        paginatorCount: count,
        status: "fulfilled",
        page,
        newCategory: false,
        productEmpty: result.length < PAGE_LIMIT,
      }))
    } catch (e) {
      console.error(e)
      this.setState(() => ({ status: "" }))
    }
  }

  prepareProduct(product) {
    return {
      ...product,
      ...product.base,
      creating: product.creating ? prepareDate(product.creating.date) : "",
      updating: product.updating ? prepareDate(product.updating.date) : "",
      doneStatusColor: (
        DONE_STATUS_LIST.find(ds => ds.code === product.doneStatus) || {}
      ).color,
      prettyPrice: prettyPrice(product.base.price || 0),
    }
  }

  render() {
    const {
      doneStatus,
      selectedBrand,
      products,
      paginatorCount,
      status,
      newCategory,
      productEmpty,
      folding,
    } = this.state
    const { category, urlName } = this.props.match.params
    const {
      changeDoneStatus,
      changeBrand,
      selectProduct,
      changeProductRoute,
      prependNewProduct,
    } = this
    const stats =
      this.state.categories[
        category === "krovat_cherdak" ? "detskaya_krovat" : category
      ]
    const brands = this.state.brands[category] || []

    return (
      <Wrap folding={folding}>
        <FoldingWrap>
          <FoldingButton onClick={this.foldToggle}>
            {folding ? "Развернуть" : "Свернуть"}
          </FoldingButton>
        </FoldingWrap>

        {folding && <FoldingOverlay onClick={this.unfold} />}

        <Block
          id="js_catalog-list"
          folding={folding}
        >
          <Controls>
            <Filter
              {...{
                doneStatus,
                brands,
                stats,
                category,
                changeDoneStatus,
                changeBrand,
                selectedBrand,
              }}
            />
            <CreateProduct
              {...{ category, changeProductRoute, prependNewProduct }}
            />
          </Controls>
          <List {...{ products, selectProduct, urlName }} />
          <BottomBlock>
            {!newCategory && status === "pending" && (
              <SpinnerBlock>
                <Spinner borderWidth="6" />
              </SpinnerBlock>
            )}
            {!productEmpty && status !== "pending" && (
              <LoadMoreButton onClick={this.loadMore}>
                Подгрузить ещё
              </LoadMoreButton>
            )}
          </BottomBlock>
          {newCategory && status === "pending" && (
            <Overlay>
              <SpinnerBlock>
                <Spinner borderWidth="6" />
              </SpinnerBlock>
            </Overlay>
          )}
        </Block>
      </Wrap>
    )
  }

  setFolding(folding) {
    window.localStorage.setItem("admin-catalog-products-folding-btn", folding)
    this.setState({ folding })
  }

  unfold = () => {
    if (this.state.folding) this.setFolding(false)
  }

  foldToggle = e => {
    const { folding } = this.state
    this.setFolding(!folding)
  }

  loadMore = e => {
    this.setState(state => ({
      status: state.status === "pending" ? "" : "pending",
    }))
    this.loadProducts(true)
  }

  changeDoneStatus = e => {
    let { status } = e.currentTarget.dataset

    status = !status ? false : parseInt(status)

    if (this.state.doneStatus !== status)
      this.setState(
        state => ({ doneStatus: status }),
        () => this.loadProducts(),
      )
  }

  changeBrand = e => {
    let { brand } = e.currentTarget.dataset

    if (brand === "Показать всё") brand = ""

    if (this.state.selectedBrand !== brand)
      this.setState(
        state => ({ selectedBrand: brand }),
        () => this.loadProducts(),
      )
  }

  prependNewProduct = product => {
    this.setState(state => ({
      products: [this.prepareProduct(product), ...state.products],
    }))
  }

  selectProduct = e => {
    const { urlName } = e.currentTarget.dataset
    this.changeProductRoute(urlName)
  }

  changeProductRoute = urlName => {
    const { history, location, match, query } = this.props
    const search = qs.stringify(query)

    if (urlName && urlName !== match.params.urlName) {
      history.push({
        pathname: location.pathname.replace(
          /(\/product=)[^\/]+/,
          `$1${urlName}`,
        ),
        search,
      })
    }
  }
}

function prepareDate(date) {
  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  })
  return formatter.format(new Date(date)).replace(/\s+г\..+/, "")
}

const FoldingButton = styled.span`
  padding: 15px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.41);
  background: #007dd0;
  color: white;
  border-radius: 1px;
  cursor: pointer;
  &:hover {
    background: #115892;
  }
`

const FoldingWrap = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  padding-left: 10px;
  z-index: 100;
  transform: translateX(100%);
`

const FoldingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: -30px;
  right: 0;
  background: #ccc;
  bottom: 0;
  z-index: 500;
  cursor: pointer;

  &:hover {
    background-color: #007dd0;
  }
`

const Wrap = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-flow: column nowrap;
  flex: 0 0 ${props => (props.folding ? 30 : 400)}px;
  background-color: #fff;

  &:hover ${FoldingWrap} {
    display: flex;
  }
`

const Block = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  ${props => props.folding && "width: 30px; overflow: hidden"};
  flex-flow: column nowrap;
  background-color: #fff;
`

const Controls = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 2px;
  position: relative;
`

const BottomBlock = styled.div`
  margin: 20px 0 150px;
  text-align: center;
`

const LoadMoreButton = styled.button`
  padding: 6px 15px;
`

const SpinnerBlock = styled.div`
  width: 48px;
  height: 48px;
  display: inline-block;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: 70px;
  text-align: center;
`
