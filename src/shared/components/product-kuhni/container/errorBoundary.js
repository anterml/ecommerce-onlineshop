import React, { Component } from "react"
import styled from "styled-components"

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    if (
      status !== prevProps.status &&
      status === "fulfilled" &&
      this.state.hasError
    ) {
      this.setState(state => ({ hasError: false }))
    }
  }

  componentDidCatch(error, info) {
    this.setState(state => ({ hasError: true }))
  }

  render() {
    if (this.state.hasError) {
      return <Block>Извините, не получилось загрузить продукт.</Block>
    }

    return this.props.children
  }
}

const Block = styled.div`
  height: 500px;
  text-align: center;
  font-size: 30px;
  line-height: 32px;
  font-weight: 500;
  padding-top: 100px;
`
