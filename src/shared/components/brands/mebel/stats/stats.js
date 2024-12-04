import React, { Component, Fragment } from "react"
import styled from "styled-components"

import { MEBEL } from "utils/data/categories"
const SEPARATOR = ";"

export default class Stats extends Component {
  state = {
    showAllCategories: true,
  }

  render() {
    const { stats, selectedBrand, selectedCategories } = this.props
    const { values } = stats

    const { showAllCategories } = this.state
    const availableBrands = getBrands(values, selectedCategories)
    let availableCategories = getCategories(values, selectedBrand)
    const categories =
      !showAllCategories && availableCategories.length
        ? availableCategories
        : Object.keys(MEBEL)

    return (
      <Fragment>
        <List
          onClick={this.select}
          data-name="brand"
        >
          {values.map(({ name, engName, notAdded }) => (
            <Link
              href={`/brands/mebel/${engName}/`}
              data-not-added={notAdded}
              data-value={engName}
              data-selected={selectedBrand === engName}
              data-adjacent-group-is-selected={!!selectedCategories.length}
              data-availability={
                !selectedCategories.length || availableBrands.includes(engName)
              }
              key={engName}
            >
              {name}
            </Link>
          ))}
        </List>

        <Header>
          <Title>Категории</Title>
          {selectedBrand && (
            <ShowAllButton onClick={this.toggleCategoryVisibility}>
              Показать {showAllCategories ? "только доступные" : "все"}
            </ShowAllButton>
          )}
        </Header>
        <List
          data-name="categories"
          onClick={this.select}
        >
          {categories.map(name => (
            <Item
              key={name}
              data-value={name}
              data-selected={selectedCategories.includes(name)}
              data-adjacent-group-is-selected={!!selectedBrand}
              data-availability={
                !selectedBrand || availableCategories.includes(name)
              }
            >
              {MEBEL[name]}
            </Item>
          ))}
        </List>
      </Fragment>
    )
  }

  toggleCategoryVisibility = e => {
    this.setState(state => ({ showAllCategories: !state.showAllCategories }))
  }

  select = e => {
    e.preventDefault()
    const { name } = e.currentTarget.dataset
    const { value, availability, adjacentGroupIsSelected } = e.target.dataset
    const { location, history, selectedBrand, selectedCategories, stats } =
      this.props

    if (!value) return console.log("no value")

    if (name === "brand") {
      if (adjacentGroupIsSelected && availability === "false")
        return console.log("ignore brand")

      const brand = stats.values.find(brand => brand.engName === value)
      if (!brand) return

      const categories = brand.value.map(category => category.name)
      const availableCategories = selectedCategories.filter(category =>
        categories.includes(category),
      )

      const search = availableCategories.length
        ? `?categories=${availableCategories.join(";")}`
        : ""

      const result = selectedBrand === value ? "" : value + "/"

      history.push({
        pathname: `/brands/mebel/${result}`,
        search,
      })
    } else if (name === "categories") {
      // не добавлять поле, если оно не доступно
      if (
        !selectedCategories.includes(value) &&
        adjacentGroupIsSelected &&
        availability === "false"
      )
        return

      const result = getResultString(selectedCategories, value)
      history.push({
        pathname: location.pathname,
        search: result ? `?categories=${result}` : "",
      })
    }
  }
}

function getCategories(values, selectedBrand) {
  const brand = values.find(brand => brand.engName === selectedBrand)
  return brand ? brand.value.map(category => category.name) : []
}

function getBrands(values, selectedCategories) {
  return values
    .filter(brand =>
      brand.value.find(category => selectedCategories.includes(category.name)),
    )
    .map(brand => brand.engName)
}

function getResultString(values, value) {
  const result = values.includes(value)
    ? values.filter(v => v !== value)
    : [...values, value]

  return result.join(SEPARATOR)
}

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
`

const ShowAllButton = styled.span`
  margin-left: 10px;
  color: #0670eb;
  cursor: pointer;
  &:hover {
    color: #0f56a9;
  }
`

const Title = styled.div`
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const Item = styled.span`
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 4px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;

  &[data-selected="true"] {
    border-color: #b30202;
    color: #b30202;
  }

  &[data-adjacent-group-is-selected="true"][data-availability="false"] {
    opacity: 0.5;
    cursor: default;
  }
`

const Link = styled.a`
  color: #333;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 4px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  &[data-selected="true"] {
    border-color: #b30202;
    color: #b30202;
  }

  &[data-adjacent-group-is-selected="true"][data-availability="false"] {
    opacity: 0.5;
    cursor: default;
  }

  &[data-not-added="true"] {
    font-weight: 500;
    color: green;
  }
`
