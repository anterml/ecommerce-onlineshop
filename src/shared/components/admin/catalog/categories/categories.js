import React, { PureComponent } from "react"
import styled from "styled-components"
import qs from "query-string"
import CATEGORIES, { ELECTRONIC_CATEGORIES } from "utils/data/categories"

const CATEGORY_NAMES = Object.values(CATEGORIES)
  .sort()
  .map(ruName => ({
    engName: Object.keys(CATEGORIES).find(
      engName => CATEGORIES[engName] === ruName,
    ),
    ruName,
  }))

const ELECTRONIC_CATEGORIES_NAMES = Object.values(ELECTRONIC_CATEGORIES)
  .sort()
  .map(ruName => ({
    engName: Object.keys(ELECTRONIC_CATEGORIES).find(
      engName => ELECTRONIC_CATEGORIES[engName] === ruName,
    ),
    ruName,
  }))

const last = { marginBottom: "20px" }

export default class Categories extends PureComponent {
  render() {
    const { category } = this.props.match.params

    return (
      <Block>
        <Item
          style={last}
          onClick={this.changeRoute}
          data-category="all"
        >
          <Text selected={category === "all"}>Последние</Text>
        </Item>
        {CATEGORY_NAMES.map(({ engName, ruName }) => (
          <Item
            onClick={this.changeRoute}
            key={engName}
            data-category={engName}
          >
            <Text selected={category === engName}>{ruName}</Text>
          </Item>
        ))}

        <Container>
          {ELECTRONIC_CATEGORIES_NAMES.map(({ engName, ruName }) => (
            <Item
              onClick={this.changeRoute}
              key={engName}
              data-category={engName}
            >
              <Text selected={category === engName}>{ruName}</Text>
            </Item>
          ))}
        </Container>
      </Block>
    )
  }

  changeRoute = e => {
    const { category } = e.currentTarget.dataset
    const { location, history, match, query } = this.props
    const search = qs.stringify(query)

    if (category && category !== match.params.category) {
      history.push({
        pathname: location.pathname.replace(
          /(\/catalog=)[^\/]+/,
          `$1${category}`,
        ),
        search,
      })
    }
  }
}

const Block = styled.div`
  flex: 1 1 auto;
`

const Container = styled.div`
  margin-top: 20px;
`

const Item = styled.div`
  display: block;
  white-space: nowrap;
  margin-bottom: 5px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #000;
    text-decoration: underline;
  }
`

const Text = styled.span`
  margin-right: 4px;
  font-weight: 500;
  ${props => props.selected && "color: #c80707"};
`
