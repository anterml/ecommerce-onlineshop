import React, { Component } from "react"
import styled from "styled-components"
import DATA from "./data"
import Controls from "../controls"
import { ObjectID } from "bson"
import COLORS from "utils/data/colors"
import { Input } from "globalComponents/admin/elements"

export default class Auto extends Component {
  state = {
    fabricName: "",
    price: "",
  }

  render() {
    const { fabricName, price } = this.state
    const { changeFabric, changePrice, create } = this
    const disabled = !fabricName
    return (
      <Block>
        <select
          name="fabric"
          value={fabricName}
          onChange={changeFabric}
        >
          <option
            value=""
            disabled
          >
            Выберите фабрику
          </option>
          {DATA.map(({ name }) => (
            <option
              value={name}
              key={name}
            >
              {name}
            </option>
          ))}
        </select>
        <Input
          value={price}
          onChange={changePrice}
          placeholder="Цена"
        />
        <Controls>
          <button
            onClick={this.props.remove}
            disabled={disabled}
          >
            Удалить всё
          </button>
          <button
            onClick={create}
            disabled={disabled}
          >
            Создать
          </button>
        </Controls>
      </Block>
    )
  }

  changePrice = e => {
    if (!e.target.value) return this.setState({ price: "" })

    const price = parseInt(e.target.value)

    if (!Number.isNaN(price)) {
      this.setState({ price })
    }
  }

  changeFabric = e => {
    this.setState({ fabricName: e.target.value })
  }

  create = e => {
    const { groupName } = this.props
    const { fabricName, price } = this.state

    if (!fabricName) return

    const target = DATA.find(fabric => fabric.name === fabricName)

    if (!target)
      return alert(
        "Не удалось найти набор картинок для " +
          (fabricName || "данной фабрики"),
      )

    let results = []
    if (target.prefix)
      results = Object.keys(COLORS).filter(
        color => color.indexOf(target.prefix) === 0,
      )
    else if (target.imageFolder)
      results = Object.keys(COLORS).filter(
        color => (COLORS[color].image || "").indexOf(target.imageFolder) === 0,
      )

    if (Array.isArray(target.additional))
      results = results.concat(target.additional.filter(name => COLORS[name]))

    const field = { name: groupName }
    if (price) field.price = price

    const fields = results.map(value => ({
      ...field,
      _id: new ObjectID().toString(),
      value,
    }))

    this.props.addFields(fields, !e.target.dataset.continue)
  }
}

const Block = styled.div`
  select {
    padding: 8px 10px;
    margin-bottom: 10px;
    width: 100%;
  }

  input {
    width: 100%;
  }
`
