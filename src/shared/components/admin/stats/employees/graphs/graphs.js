import React, { Component } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import Highstock from "highcharts/highstock"
import config from "./config"

export default class Graphs extends Component {
  componentDidMount() {
    const { userName, changeRoute } = this.props
    let previousPoint

    Highstock.setOptions({
      lang: {
        rangeSelectorFrom: "От",
        rangeSelectorTo: "До",
        rangeSelectorZoom: "",
      },
    })

    config.plotOptions.series.point.events.click = function () {
      const date = new Date(this.x).toISOString().split("T")[0]
      changeRoute("date", date)
      if (previousPoint && previousPoint.update) {
        previousPoint.update({ color: "#7cb5ec" })
      }
      previousPoint = this

      if (this && this.update) {
        this.update({ color: "#be0000" })
      }
    }

    this.stock = Highstock.StockChart("graph", { ...config })

    if (userName) this.loadData(userName)
  }

  componentDidUpdate(prevProps, prevState) {
    const { userName } = this.props
    if (userName !== prevProps.userName) {
      this.loadData(userName)
    }
  }

  async loadData(userName) {
    try {
      const value = await asyncRequest({
        url: `admin/stats/employees/graph/${userName}`,
      })

      this.stock.series[0].setData(
        value.map(v => [new Date(v._id).getTime(), v.count]).reverse(),
      )
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return <Container id="graph" />
  }
}

const Container = styled.div`
  width: 100%;
  height: 250px;
  display: inline-block;
`
