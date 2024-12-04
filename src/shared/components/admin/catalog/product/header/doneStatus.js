import React, { Component } from "react"
import styled from "styled-components"

export default class DoneStatus extends Component {
  render() {
    const { auth, product } = this.props
    const { doneStatus } = product.general
    const disabled = auth.accessList.indexOf("doneStatus-limit_ready") !== -1
    const canRemove = auth.accessList.indexOf("doneStatus-remove") !== -1

    return (
      <Select
        onChange={this.change}
        value={doneStatus}
      >
        <option
          value="6"
          disabled={!canRemove}
        >
          Удален
        </option>
        <option value="7">Тест</option>
        <option value="0">В работе</option>
        <option value="1">Содержит ошибки</option>
        <option value="2">Готов, но без картинок</option>
        <option value="4">Готов на проверку</option>
        <option
          value="5"
          disabled={disabled}
        >
          Полностью готов
        </option>
        <option
          value="3"
          disabled={disabled}
        >
          На сервере
        </option>
      </Select>
    )
  }

  change = e => {
    const { value } = e.target
    this.props.actions.change("doneStatus", parseInt(value))
  }
}

const Select = styled.select`
  padding: 5px 10px;
`
