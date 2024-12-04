import React, { Component, Fragment } from "react"
import styled from "styled-components"
import translite from "utils/translite"
import CATEGORIES from "../data-categories"
import { ObjectID } from "bson"

export default class PopupCreating extends Component {
  state = {
    name: "",
    kind: "",
  }

  render() {
    const { kind, name } = this.state
    const { hidePopup } = this.props

    return (
      <Fragment>
        <Overlay onClick={hidePopup} />
        <Block>
          <Header>
            <Title>Создание модуля</Title>
            <CloseButton onClick={hidePopup}>Закрыть</CloseButton>
          </Header>

          <select
            name="kind"
            onChange={this.change}
            value={kind}
          >
            <option value="">Выбор модуля</option>
            {Object.keys(CATEGORIES).map(category => (
              <option
                value={category}
                key={category}
              >
                {category}
              </option>
            ))}
          </select>

          <input
            name="name"
            placeholder="Название"
            value={name}
            onChange={this.change}
            onKeyPress={this.create}
            disabled={!kind}
          />
          <button
            onClick={this.create}
            disabled={!kind || !name}
          >
            Создать
          </button>
        </Block>
      </Fragment>
    )
  }

  change = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  create = e => {
    if (e.key && e.key !== "Enter") return

    let { kind, name } = this.state
    name = name.trim()

    if (!kind || !name) return

    const code =
      Math.max.apply(
        null,
        [0].concat(this.props.parts.map(part => part.code)),
      ) + 1
    const imageFolder = CATEGORIES[kind] + "-" + translite(name) + "-" + code
    const part = {
      _id: new ObjectID().toString(),
      name,
      kind,
      price: 0,
      code,
      description: "",
      inset: false,
      position: "bottom",
      imageFolder,
      images: [],
      fields: [],
      properties: [],
      attrs: [],
    }

    this.props.create(part)
    this.props.hidePopup()
  }
}

const Block = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  z-index: 100;
  white-space: nowrap;
  padding: 0 30px 15px;
  box-shadow: 0 0 2px 2px #aaa;
  border-radius: 2px;
  display: flex;
  flex-flow: column nowrap;
  & > * {
    display: block;
    margin-bottom: 5px;
  }

  button,
  select,
  input {
    padding: 8px 12px;
  }

  input {
    flex: 1 1 auto;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(233, 233, 233, 0.95);
  z-index: 50;
  overflow: auto;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  margin: 0 -30px 15px;
  border-bottom: 1px solid #aaa;
`

const Title = styled.div`
  font-weight: 500;
  margin-right: 45px;
`

const CloseButton = styled.div`
  cursor: pointer;
  color: #0670eb;

  &:hover {
    color: red;
  }
`
