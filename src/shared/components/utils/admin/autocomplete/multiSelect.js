import React, { PureComponent } from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import List from "./list"

export default class Autocomplete extends PureComponent {
  state = {
    text: "",
    hide: true,
    index: -1,
  }

  render() {
    const { text, hide, index } = this.state
    const { placeholder, payload } = this.props
    this.values = getValues(text, this.props.values).slice(0, 50)

    return (
      <Block>
        <Input
          autoComplete="off"
          placeholder={placeholder || "Введите значение"}
          value={text}
          onChange={this.change}
          onKeyUp={this.handleEnterKey}
          onKeyDown={this.handleArrowKeys}
          onFocus={this.focus}
          onBlur={this.blur}
        />
        {!hide && (
          <List
            index={index}
            values={this.values}
            text={text.toLowerCase()}
            select={this.changeByClickMouse}
            mouseOver={this.mouseOver}
            mouseOut={this.mouseOut}
          />
        )}
      </Block>
    )
  }

  handleArrowKeys = e => {
    const { index } = this.state

    if (e.key === "ArrowUp" && index > -1) {
      this.setState({ index: index - 1 })
    } else if (e.key === "ArrowDown" && index < this.values.length - 1) {
      this.setState({ index: index + 1 })
    }
  }

  handleEnterKey = e => {
    if (e.key && e.key !== "Enter") return

    const { index } = this.state
    let value = index > -1 ? this.values[index] : e.target.value

    this.setState(state => ({
      text: "",
      hide: true,
      index: -1,
    }))

    this.values = this.props.values
    this.props.onChange(value.trim(), this.props.payload)
  }

  changeByClickMouse = e => {
    const { value } = e.target.dataset

    this.setState({
      text: "",
      hide: true,
      index: -1,
    })
    this.values = this.props.values
    this.props.onChange(value.trim(), this.props.payload)
  }

  change = e => {
    const text = e.target.value
    this.setState({
      text,
      hide: false,
    })
  }

  mouseOver = e => {
    const { value } = e.target.dataset

    if (!value) return

    const index = this.values.indexOf(value)
    if (index !== -1) this.setState({ index })
  }

  mouseOut = e => {
    if (this.state.index !== -1) this.setState({ index: -1 })
  }

  focus = e => {
    if (this.state.hide === true) this.setState({ hide: false })
  }

  blur = e => {
    if (!this.state.hide) this.setState({ hide: true, index: -1 })
  }
}

function getValues(text = "", values) {
  const value = text.toLowerCase().replace(/ё/gi, "е")

  if (!value) return values

  return values
    .filter(name => name.toLowerCase().indexOf(value) !== -1)
    .sort(sort(value))
}

function sort(text) {
  return (a, b) => {
    const _a = a.toLowerCase()
    const _b = b.toLowerCase()
    const posA = _a.indexOf(text)
    const posB = _b.indexOf(text)

    if (posA < posB) return -1
    if (posA > posB) return 1

    if (_a < _b) return -1
    if (_a > _b) return 1

    return 0
  }
}

const Block = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
`
