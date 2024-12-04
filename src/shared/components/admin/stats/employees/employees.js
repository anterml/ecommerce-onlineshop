import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Sidebar from "./sidebar"
import Graphs from "./graphs/graphs"
import Products from "./products/products"
import qs from "query-string"

export default class Employees extends Component {
  render() {
    const { changeRoute } = this
    const { userName, date } = qs.parse(this.props.location.search)

    return (
      <Block>
        <Sidebar
          changeRoute={changeRoute}
          selectedUser={userName}
        />
        <Content>
          {userName ? (
            <Fragment>
              <Graphs {...{ userName, changeRoute }} />
              <Products {...{ userName, date, changeRoute }} />
            </Fragment>
          ) : (
            <Empty>Выберите пользователя слева в списке</Empty>
          )}
        </Content>
      </Block>
    )
  }

  changeRoute = (name, value) => {
    const { location, history, match } = this.props
    const search = qs.stringify({
      ...qs.parse(location.search),
      [name]: value,
    })

    history.push({
      pathname: location.pathname,
      search,
    })
  }
}

const Block = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;

  .highcharts-container {
    width: 100% !important;
    border-radius: 3px;
    border: 2px solid #ddd;
  }
  & .highcharts-tooltip {
    font-size: 11px;
  }

  & .highcharts-tooltip > * > span {
    display: inline-block;
    vertical-align: middle;
    background: rgb(231, 235, 238);
    border: 1px solid #be0000;
    border-radius: 3px;
  }

  & .highcharts-tooltip > * > span > span:nth-of-type(2) {
    display: inline-block;
    color: #464242;
    font-size: 11px;
    border-radius: 3px;
    padding: 8px 15px;
  }

  & .highcharts-tooltip > * > span > span:nth-of-type(1) {
    display: inline-block;
    background: #be0000;
    border-radius: 3px 0 0 3px;
    color: white;
    font-size: 16px;
    padding: 8px 15px;
    text-shadow: 0 0 4px black;
  }
`

const Content = styled.div`
  flex: 1 1 auto;
  padding: 0 20px;
  border-left: 1px solid #ddd;
  overflow: auto;
`

const Empty = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 100px;
  font-weight: 300;
  color: #b5b5b5;
`
