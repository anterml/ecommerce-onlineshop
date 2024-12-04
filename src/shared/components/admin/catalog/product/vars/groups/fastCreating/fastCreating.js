import React, { Component, Fragment } from "react"
import styled from "styled-components"

//import PrintViews from './printViews'
import PrintViews from "./printviews/printviews"
import Colors from "./colors/colors"

const initialState = {
  popup: false,
  fields: {},
}

export default class FastCreating extends Component {
  state = initialState

  render() {
    const { groupName } = this.props
    const { create, remove, closePopup } = this
    const popupArgs = { create, remove, closePopup, groupName }

    return (
      <Fragment>
        <FastCreatingLink onClick={this.showPopup}>
          Быстрое создание полей
        </FastCreatingLink>

        {this.state.popup && groupName.indexOf("Цвет") === 0 && (
          <Colors
            {...popupArgs}
            addFields={this.addFields}
            remove={this.removeFields}
          />
        )}

        {this.state.popup && groupName === "Вид принта" && (
          <PrintViews
            {...popupArgs}
            addFields={this.addFields}
            remove={this.removeFields}
          />
        )}
      </Fragment>
    )
  }

  addFields = (fields, closePopup) => {
    this.props.addFields(this.props.groupName, fields)
    if (closePopup) this.closePopup()
  }

  removeFields = () => {
    alert("Удаление пока не реализовано!")
  }

  change = e => {
    let { name, value } = e.target
    if (name === "imageAutoindex") value = e.target.checked
    if (name === "price" || name === "count") value = parseInt(value) || ""

    this.setState(state => ({
      fields: {
        ...state.fields,
        [name]: value,
      },
    }))
  }

  remove = () => {
    this.props.bulkFieldsChanges(this.state.fields, "remove")
    this.setState(initialState)
  }

  create = e => {
    this.props.bulkFieldsChanges(this.state.fields, "create")
    if (!e.target.dataset.continue) {
      this.setState(initialState)
    } else {
      this.setState({ ...initialState, popup: true })
    }
  }

  showPopup = e => {
    this.setState(state => ({ popup: true }))
  }

  closePopup = e => {
    this.setState(state => ({ popup: false }))
  }
}

const FastCreatingLink = styled.button`
  width: 100%;
  margin-bottom: 10px;
  padding: 7px 10px;
`
