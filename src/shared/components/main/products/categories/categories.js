import React, { Component } from "react"
import styled from "styled-components"

import Category from "./category"
import DATA from "./data"

export default class Categories extends Component {
  render() {
    return (
      <Block onClick={this.scrollTop}>
        {DATA.map((line, i) => (
          <Line key={i}>
            {line.map((category, k) => (
              <Category
                {...category}
                width={100 / line.length + "%"}
                key={k}
              />
            ))}
          </Line>
        ))}
      </Block>
    )
  }

  scrollTop = e => {
    if (e.target.nodeName.toLowerCase() === "a" || e.target.dataset.url)
      window.scrollTo(0, 106)
  }

  shouldComponentUpdate() {
    return false
  }
}

const Block = styled.div`
  margin-bottom: 50px;
`

const Line = styled.div`
  display: flex;
  flex-flow: column nowrap;

  @media (min-width: 1024px) {
    align-items: center;
    flex-flow: row;
    margin-bottom: 30px;
  }
`
