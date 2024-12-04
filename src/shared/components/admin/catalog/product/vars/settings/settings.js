import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Instock from "./instock"
import InstockPlaces from "./instock-places"
import Fields from "./groups/list"
import AvailableVisibility from "./available-visibility"

export default class Settings extends Component {
  render() {
    const { groups, settings, auth, actions } = this.props
    const { instock, instockPlaces, selectedFieldIds, availableVisibility } =
      settings
    return (
      <Fragment>
        <Title>Доступность</Title>
        <Line>
          <Instock
            instock={instock}
            change={this.changeInstock}
          />
          <AvailableVisibility
            change={this.changeAvailableVisibility}
            value={availableVisibility}
          />
        </Line>

        <Title>Наличие в магазинах</Title>
        <InstockPlaces
          places={instockPlaces}
          auth={auth}
          change={this.changeInstockPlaces}
        />

        <Title>Выбор полей по умолчанию</Title>
        <Fields {...{ groups, selectedFieldIds, actions }} />
      </Fragment>
    )
  }

  changeInstock = e => {
    this.props.actions.settings.changeInstock(parseInt(e.target.value))
  }

  changeInstockPlaces = e => {
    const i = Number(e.currentTarget.dataset.i)
    const { settings, actions } = this.props
    const { instockPlaces } = settings

    if (typeof i === "number" && !Number.isNaN(i)) {
      const places = instockPlaces.includes(i)
        ? instockPlaces.filter(placeIndex => placeIndex !== i)
        : [...instockPlaces, i]
      actions.settings.changeInstockPlaces(places)
    }
  }

  changeAvailableVisibility = e => {
    this.props.actions.settings.changeAvailableVisibility(e.target.checked)
  }
}

const Line = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 13px;
  text-transform: uppercase;
`
