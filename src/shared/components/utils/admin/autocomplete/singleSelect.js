import React, { PureComponent } from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import List from "./list"

export default class Autocomplete extends PureComponent {
  state = {
    text: this.props.value || "",
    hide: true,
    index: -1,
    values: getValues(this.props.value, this.props.values),
  }

  static getDerivedStateFromProps({ values, value, productId }, state) {
    if (productId !== state.productId) {
      return {
        productId,
        text: value || "",
        hide: true,
        index: -1,
        values: getValues(value, values),
      }
    }

    if (state.prevText !== state.text) {
      return {
        prevText: state.text,
        index: -1,
        values: getValues(state.text, values),
      }
    }

    return null
  }

  render() {
    const { text, values, hide, index } = this.state
    const { placeholder, payload } = this.props
    return (
      <Block>
        <Input
          autoComplete="off"
          placeholder={placeholder}
          value={text}
          onChange={this.change}
          onKeyUp={this.apply}
          onKeyDown={this.handlePressedArrowButton}
          onFocus={this.focus}
          onBlur={this.blur}
        />
        {!hide && (
          <List
            index={index}
            values={values}
            text={text.toLowerCase()}
            select={this.select}
            mouseOver={this.mouseOver}
            mouseOut={this.mouseOut}
          />
        )}
      </Block>
    )
  }

  handlePressedArrowButton = e => {
    const { index, values } = this.state

    if (e.key === "ArrowUp" && index > -1) {
      this.setState({ index: index - 1 })
    } else if (e.key === "ArrowDown" && index < values.length - 1) {
      this.setState({ index: index + 1 })
    }
  }

  apply = e => {
    if (e.key && e.key !== "Enter") return

    const { index, values } = this.state
    let value = index > -1 ? values[index] : e.target.value

    this.setState(state => ({
      text: value,
      hide: true,
    }))

    this.props.onChange(value.trim(), this.props.payload)
  }

  select = e => {
    const { value } = e.target.dataset

    this.setState({
      text: value,
      hide: true,
    })

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

    const index = this.state.values.indexOf(value)
    if (index !== -1) this.setState({ index })
  }

  mouseOut = e => {
    if (this.state.index !== -1) this.setState({ index: -1 })
  }

  focus = e => {
    if (this.state.hide === true) this.setState({ hide: false })
  }

  blur = e => {
    const { text, hide } = this.state
    const { onChange, value, payload } = this.props

    if (value !== text) onChange(text.trim(), payload)

    if (!hide) this.setState({ hide: true, index: -1 })
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
