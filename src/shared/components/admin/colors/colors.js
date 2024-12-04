import React, { Component } from "react"
import styled from "styled-components"
import _COLORS from "utils/data/colors"

import Tabs from "./tabs"
import All from "./all"
import Match from "./match"

const COLORS = Object.keys(_COLORS).map(ru => ({
  ..._COLORS[ru],
  ru,
}))

export default class Colors extends Component {
  static title = "Цвета"

  state = {
    colors: COLORS,
    searchText: "",
    tab: "all",
  }

  componentDidMount() {
    document.title = this.constructor.title
  }

  render() {
    const { tab, searchText, colors } = this.state
    const text = searchText.trim().toLowerCase()

    return (
      <Block>
        <Tabs
          tab={tab}
          change={this.changeTab}
        />
        <SearchInput
          value={searchText}
          onChange={this.changeSearchText}
          placeholder={`Поиск среди ${COLORS.length} цветов`}
        />
        <Count visible={searchText}>Найдено цветов: {colors.length}</Count>
        {tab === "all" && (
          <All
            colors={colors}
            searchText={text}
          />
        )}
        {tab === "match" && (
          <Match
            colors={colors}
            searchText={text}
          />
        )}
      </Block>
    )
  }

  changeTab = e => {
    const { tab } = e.target.dataset
    if (tab) this.setState({ tab })
  }

  changeSearchText = e => {
    const { value } = e.target
    const _value = value.trim().toLowerCase()
    const colors = _value
      ? COLORS.filter(({ ru }) => ru.toLowerCase().indexOf(_value) !== -1)
      : COLORS

    this.setState(() => ({
      searchText: value,
      colors,
    }))
  }
}

const Block = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  margin: 30px 0;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px;
`

const Count = styled.div`
  padding: 5px;
  margin-top: 15px;
  color: #777;
  opacity: ${props => (props.visible ? 1 : 0)};
`
