import React, { Component } from "react"
import styled from "styled-components"
import Controls from "../controls"
import { ObjectID } from "bson"

export default class Manual extends Component {
  state = {
    count: "",
    price: "",
    imageAutoindex: false,
  }

  render() {
    const { count, imageAutoindex, price } = this.state
    const { change, create } = this
    const disabled = !count

    return (
      <Block>
        <input
          name="count"
          placeholder="Кол-во"
          value={count}
          onChange={change}
        />
        <input
          name="price"
          placeholder="Цена"
          value={price}
          onChange={change}
        />
        <Label>
          <input
            type="checkbox"
            checked={!!imageAutoindex}
            name="imageAutoindex"
            onChange={change}
          />
          <LabelText>Авто заполнение картинок</LabelText>
        </Label>
        <Controls>
          <button
            onClick={create}
            disabled={disabled}
            data-keep="true"
          >
            Создать и продолжить
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

  change = e => {
    let { name, value } = e.target

    if (name === "price" || name === "count") value = parseInt(value) || ""
    else if (name === "imageAutoindex") value = e.target.checked

    this.setState({ [name]: value })
  }

  create = e => {
    const { count, imageAutoindex, price } = this.state

    if (!count) return alert('Поле "Кол-во" не заполнено')

    const { groupName, addFields } = this.props
    const fields = []

    for (let i = 1; i <= count; ++i) {
      const field = { name: groupName, _id: new ObjectID().toString() }

      if (price) field.price = price
      if (imageAutoindex) field.imageUrl = i + ".jpg"

      fields.push(field)
    }

    const { keep } = e.target.dataset
    addFields(fields, !keep)

    if (keep) this.setState({ count: "", price: "" })
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  user-select: none;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`

const LabelText = styled.span`
  margin-left: 8px;
`
