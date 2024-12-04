import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"

import List from "./list/list"
import Search from "./search/search"
import SetItem from "./set/set"

export default class Sets extends Component {
  static title = "Наборы"

  componentDidMount() {
    document.title = this.constructor.title
  }

  render() {
    const { id, removedId } = qs.parse(this.props.location.search)

    return (
      <Block>
        <List
          changeRoute={this.changeRoute}
          selectedId={id}
          removedId={removedId}
        />
        <Content>
          <Search changeRoute={this.changeRoute} />
          <SetItem
            id={id}
            changeRoute={this.changeRoute}
          />
        </Content>
      </Block>
    )
  }

  changeRoute = (name, value, method) => {
    const { location, history } = this.props
    let search

    if (name === "removedId" && value) search = { [name]: value }

    if (name === "id" && value) search = { id: value }

    // удаление продукта:
    // removeId => empty
    if (name === "empty") search = {}

    if (search) {
      history[method !== "replace" ? "push" : method]({
        pathname: location.pathname,
        search: qs.stringify(search),
      })
    }
  }
}

const Block = styled.div`
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
`

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
`
