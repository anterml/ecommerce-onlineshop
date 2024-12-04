import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"
import Icon from "globalComponents/icons/svg"

const data_ru = {
  createdAt: "Новые",
  popular: "Популярные",
  priceUp: "По возрастанию цены",
  priceDown: "По убыванию цены",
  alphabeticUp: "По алфавиту А-Я",
  alphabeticDown: "По алфавиту Я-А",
}

function getSortType({ query, location: { pathname } }) {
  if (query.sort) return query.sort
  if (
    pathname.indexOf("stoli/obedennie") !== -1 ||
    pathname.indexOf("/stulya/") !== -1
  )
    return "popular"

  return "createdAt"
}

export default class Sort extends Component {
  state = {
    show: false,
  }

  render() {
    const selectedType = getSortType(this.props)

    const sortElems = Object.keys(data_ru).map(name => (
      <Item
        data-selected={selectedType === name}
        data-value={name}
        key={name}
      >
        {data_ru[name]}
      </Item>
    ))

    const { show } = this.state

    return (
      <Block onClick={this.changeType}>
        <Choice
          onClick={this.toggleChoice}
          data-visible={show}
        >
          <span>{data_ru[selectedType]}</span>
          <Icon name="arrow" />
        </Choice>
        <Items>{sortElems}</Items>
      </Block>
    )
  }

  toggleChoice = () => {
    if (window.outerWidth < 768) this.setState(state => ({ show: !state.show }))
  }

  changeType = e => {
    const { value } = e.target.dataset
    if (value) {
      this.changeRoute("sort", value)
      this.setState({ show: false })
    }
  }

  changeRoute(type, value) {
    const { history, location, query } = this.props

    if (type === "sort") {
      query.p = 1
      query.sort = value
    }

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(query),
    })
  }
}

const Items = styled.span`
  display: flex;
  padding-bottom: 10px;
  flex-flow: column nowrap;
  width: 100%;

  @media (min-width: 768px) {
    flex-flow: row wrap;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
  }

  @media (max-width: 767px) {
    position: absolute;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-top: none;
  }
`

const Choice = styled.div`
  display: none;
  justify-content: space-between;
  border: 1px solid #ddd;
  align-items: center;
  padding: 5px 10px;

  @media (max-width: 767px) {
    display: flex;

    &[data-visible="false"] + ${Items} {
      display: none;
    }
  }

  svg {
    width: 12px;
    height: 12px;
  }
`

const Block = styled.div`
  margin-bottom: 30px;
  position: relative;
  background-color: #fff;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Item = styled.span`
  display: inline-block;
  font-size: 13px;
  color: #747070;
  white-space: nowrap;
  margin-bottom: 1px;
  border: 2px solid transparent;
  padding: 5px 10px;

  @media (min-width: 768px) {
    padding: 5px 15px;
  }

  &[data-selected="true"] {
    @media (max-width: 767px) {
      background-color: #c7d5df;
    }

    @media (min-width: 768px) {
      border-color: #b30202;
      border-radius: 3px;
    }
  }

  &[data-selected="false"]:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 0;
  }
`
