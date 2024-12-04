import React, { Component, Fragment } from "react"
import styled from "styled-components"

import Header from "./header"

import Price from "./fields/price"
import Colors from "./fields/colors"
import Texts from "./fields/texts"

import ApplyButton from "./applyButton"

const FILTER_ATTR_VALUES_COUNT = 3

export default class List extends Component {
  state = {
    expandList: [],
    collapseList: [],
    selectedAttrs: [],
    category: "",
    applyButtonCss: false,
  }

  static getDerivedStateFromProps({ category, location }, prevState) {
    let search, selectedAttrs

    try {
      search = decodeURIComponent(location.search).substr(1)
      selectedAttrs = search
        ? search.split("&").filter(q => q.indexOf("p=") === -1)
        : []
    } catch (e) {
      search = ""
      selectedAttrs = []
    }

    if (category !== prevState.category) {
      return {
        category,
        expandList: [],
        collapseList: [],
        selectedAttrs,
        search,
        applyButtonCss: false,
      }
    } else if (search !== prevState.search) {
      return {
        selectedAttrs,
        search,
      }
    }

    return null
  }

  render() {
    const { filter, query } = this.props
    const { collapse, toggleAttr, applyFilter, expand } = this
    const { collapseList, expandList, applyButtonCss, selectedAttrs } =
      this.state

    const elems = filter.value.map(attr => {
      const name = attr._id
      const isCollapse = collapseList.includes(name)
      const isExpand = expandList.includes(name)
      const value = isExpand
        ? attr.value
        : attr.value.slice(0, FILTER_ATTR_VALUES_COUNT)
      const { field } = attr
      const showAll =
        !isCollapse && !isExpand && attr.value.length > FILTER_ATTR_VALUES_COUNT

      return (
        <Item key={name}>
          <Header {...{ collapse, name, isCollapse }} />
          {!isCollapse &&
            (name === "Цвет" ? (
              <Colors
                attrName={name}
                values={attr.value}
                isExpand={isExpand}
                selectedAttrs={selectedAttrs}
                toggleAttr={toggleAttr}
              />
            ) : (
              <Texts
                {...{ name, value, query, field, selectedAttrs, toggleAttr }}
              />
            ))}
          {!isCollapse && showAll && (
            <ExpandLink
              onClick={expand}
              data-name={name}
            >
              Показать все {attr.value.length}
            </ExpandLink>
          )}
        </Item>
      )
    })

    return (
      <Fragment>
        <Item>
          <Header
            isCollapse={collapseList.includes("Цена")}
            name="Цена"
            collapse={collapse}
          />
          {!collapseList.includes("Цена") && (
            <Price
              min={query.minPrice || ""}
              max={query.maxPrice || ""}
              change={this.changePrice}
              apply={applyFilter}
            />
          )}
        </Item>
        {elems}
        {applyButtonCss && (
          <ApplyButton
            name={name}
            apply={applyFilter}
            css={applyButtonCss}
          />
        )}
      </Fragment>
    )
  }

  changePrice = e => {
    const { name, value } = e.target
    // remove old
    let selectedAttrs = this.state.selectedAttrs.filter(
      attr => attr.indexOf(name + "Price=") === -1,
    )

    let price = parseInt(value)
    if (typeof price === "number" && !Number.isNaN(price)) {
      if (price < 0 || price > 500000) price = name === "min" ? 0 : 500000
      selectedAttrs = [...selectedAttrs, `${name}Price=${price}`]
    }

    this.setState(state => ({ selectedAttrs }))
  }

  toggleAttr = e => {
    let { target, currentTarget } = e

    if (!target.dataset.value) {
      return
    }

    const filterContainer = document.getElementById("catalog-filter")
    if (!filterContainer) return

    const { name } = currentTarget.dataset
    const { value } = target.dataset
    const { offsetWidth } = filterContainer
    const { offsetTop } = target
    const additionalHeight = currentTarget.dataset.hasOverflowY
      ? currentTarget.scrollTop
      : 0

    const applyButtonCss = {
      left: offsetWidth - 40,
      top: offsetTop - 10 - additionalHeight,
    }

    const text = name + "=" + value
    const { selectedAttrs } = this.state

    const sa = selectedAttrs.includes(text)
      ? selectedAttrs.filter(t => t !== text)
      : [...selectedAttrs, text]

    this.setState({
      selectedAttrs: sa,
      applyButtonCss,
    })
  }

  applyFilter = () => {
    const { history, location } = this.props
    const search = this.state.selectedAttrs.join("&")

    this.setState(state => ({
      applyButtonCss: false,
    }))

    // "Выходим" из "Недорогие", если выбрана цена
    const pathname =
      search.indexOf("minPrice=") !== -1 || search.indexOf("maxPrice=") !== -1
        ? location.pathname
            .split("_")
            .filter(v => v !== "nedorogie")
            .join("_")
        : location.pathname

    history.replace({
      pathname,
      search,
    })

    window.scrollTo(0, 0)
  }

  collapse = e => {
    const { name } = e.currentTarget.dataset

    // убираем кнопку "показать"
    if (this.applyButton) this.applyButton.style.display = "none"

    this.setState(state => ({
      collapseList:
        state.collapseList.indexOf(name) === -1
          ? [...state.collapseList, name]
          : state.collapseList.filter(_name => _name !== name),
    }))
  }

  expand = e => {
    const { name } = e.target.dataset
    const { expandList } = this.state
    if (!expandList.includes(name))
      this.setState(state => ({ expandList: [...expandList, name] }))
  }
}

const Item = styled.div`
  border-bottom: 1px solid #dedede;
  padding: 20px 0;
`

const ExpandLink = styled.div`
  color: #0670eb;
  cursor: pointer;
  margin-left: 25px;

  &:hover {
    color: #0f56a9;
  }
`
