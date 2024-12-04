import React, { Component } from "react"
import styled from "styled-components"
import Item from "./item"

export default class FilterLinks extends Component {
  render() {
    const links = this.getLinks()

    if (!links.length) return null

    const items = links.map((data, i) => (
      <Item
        {...data}
        remove={this.remove}
        key={i}
      />
    ))

    return (
      <Block>
        {items}
        {items.length > 1 && (
          <ClearButton onClick={this.clear}>Сбросить всё</ClearButton>
        )}
      </Block>
    )
  }

  clear = () => {
    const { location, history, query } = this.props
    const { view, sort, p, yclid } = query
    let search = []

    if (view) search.push("view=" + view)
    if (sort) search.push("sort=" + sort)
    if (p) search.push("p=" + p)
    if (yclid) search.push("yclid=" + yclid)

    search = search.join("&")

    if (search) search = "?" + search

    history.push({
      pathname: location.pathname,
      search,
    })
  }

  remove = e => {
    const { location, history, query } = this.props
    const { name, value } = e.currentTarget.dataset
    let search = decodeURIComponent(location.search)
      .replace(`${name}=${value}&`, "")
      .replace(`${name}=${value}`, "")

    if (search[search.length - 1] === "&")
      search = search.substr(0, search.length - 1)

    history.push({
      pathname: location.pathname,
      search,
    })
  }

  getLinks() {
    const { query } = this.props
    const filterIgnoreList = ["sort", "view", "p", "yclid"]
    const filterList = []

    for (let name in query) {
      if (filterIgnoreList.includes(name)) continue

      let _name = name + ": "

      if (name.indexOf("ss-") === 0) _name = "Спальное место: "
      else if (name.indexOf("minPrice") === 0) _name = "Цена: от "
      else if (name.indexOf("maxPrice") === 0) _name = "Цена: до "

      if (Array.isArray(query[name])) {
        query[name].forEach(value => {
          filterList.push({ name, value, text: _name + value })
        })
      } else {
        filterList.push({
          name,
          value: query[name],
          text: _name + query[name],
        })
      }
    }

    return filterList
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  white-space: nowrap;
  padding: 10px 0;
  margin-bottom: 15px;
  font-size: 13px;
`

const ClearButton = styled.span`
  font-size: 12px;
  margin-bottom: 7px;
  display: inline-block;
  cursor: pointer;
  color: #0670eb;
  &:hover {
    color: #0f56a9;
  }
`
