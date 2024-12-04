import React, { Component } from "react"

export default (Title, List) =>
  class Dropdown extends Component {
    state = {
      hover: false,
    }

    prepare(f) {
      if (window.outerWidth > 768) {
        this.setState(f)
      }
    }

    hover = () => {
      this.prepare(state => ({ hover: true }))
    }

    blur = () => {
      this.prepare(state => ({ hover: false }))
    }

    toggle = () => {
      this.setState(state => ({ hover: !state.hover }))
    }

    render() {
      return (
        <div
          onClick={this.toggle}
          onMouseEnter={this.hover}
          onMouseLeave={this.blur}
        >
          <Title />
          {this.state.hover && <List />}
        </div>
      )
    }
  }
