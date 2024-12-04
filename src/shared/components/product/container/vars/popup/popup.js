import React, { Component, Fragment } from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"
import Result from "./result"

const fieldList = {
  value: "Цвет",
  category: "Категория",
  material: "Материал",
}

export default class PopupColors extends Component {
  state = {
    currentField: null,
  }

  render() {
    const {
      selectedField,
      groupName,
      changeField,
      handle,
      handlePopupChoice,
      children,
    } = this.props
    const currentField = this.state.currentField || selectedField || {}

    return (
      <Fragment>
        {/*<Overlay onClick={this.handlePopupChoice} data-action='cancel' />*/}
        <Block>
          <Choice>
            <Title>ВЫБОР: {groupName.toLowerCase()}</Title>
            <Content
              onMouseLeave={this.clearCurrentField}
              onClick={changeField}
            >
              {children(this.setCurrentField)}
            </Content>
            <Controls onClick={handlePopupChoice}>
              <span
                data-field="colors"
                data-action="cancel"
              >
                Отмена
              </span>
              <span
                data-field={groupName}
                data-action="apply"
              >
                Применить
              </span>
            </Controls>
          </Choice>
          <Result
            field={currentField}
            fieldList={fieldList}
            totalPrice={this.getPrice()}
          >
            {handle(currentField.styles)}
          </Result>
        </Block>
      </Fragment>
    )
  }

  getPrice = () => {
    const { selectedField, totalPrice } = this.props
    const currentField = this.state.currentField || selectedField || {}
    const prevPrice = parseInt(selectedField.price) || 0
    const nextPrice = parseInt(currentField.price) || 0
    const price =
      parseInt(totalPrice.replace(/\s+/g, "")) - prevPrice + nextPrice

    return typeof price === "number" && !Number.isNaN(price)
      ? prettyPrice(price)
      : price
  }

  setCurrentField = e => {
    const { name, id } = e.currentTarget.dataset
    const target = this.props.target.filter(t => t._id === id)[0] || {}
    this.setState({ currentField: target })
  }

  clearCurrentField = e => {
    this.setState({ currentField: null })
  }
}

const Block = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 541px;
  background-color: white;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  z-index: 1000;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  box-shadow: 0 0 4px 2px #5d5a5a;
  padding: 20px;
`

const Choice = styled.div`
  min-width: 245px;
  width: 245px;
  margin-right: 20px;
`

const Title = styled.div`
  position: relative;
  white-space: nowrap;
  color: #595757;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 15px;
  display: inline-block;
`

const Content = styled.div`
  min-height: 350px;
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: #b5b5b5;
    border-radius: 13px;
  }

  &::-webkit-scrollbar-thumb {
    border: 0px solid rgb(255, 255, 255);
    min-height: 30px;
    background-color: #6b6b6b;
    border-radius: 13px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
`

const Controls = styled.div`
  margin-top: 18px;
  margin-right: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: rgb(0, 118, 193);

  span {
    cursor: pointer;
    font-size: 12px;
    background: #cfdbe3;
    border-radius: 3px;
    color: #4a5359;
    width: 100%;
    padding: 8px 0;
    text-align: center;
    text-transform: uppercase;

    &:hover {
      color: #337ab7;
    }

    &:nth-of-type(1) {
      margin-right: 10px;
    }
  }
`
