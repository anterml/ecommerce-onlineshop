import React, { Component } from "react"
import styled from "styled-components"

import DoneStatus from "./doneStatus"
import Brands from "./brands"

export default class Filter extends Component {
  render() {
    const {
      doneStatus,
      stats,
      brands,
      changeDoneStatus,
      changeBrand,
      category,
      selectedBrand,
    } = this.props

    return (
      <Block>
        <DoneStatus
          doneStatus={doneStatus}
          stats={stats}
          change={changeDoneStatus}
        />
        <Brands
          {...{ brands, category, selectedBrand }}
          change={changeBrand}
        />
      </Block>
    )
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex: 1 1 auto;
  justify-content: space-between;
`
