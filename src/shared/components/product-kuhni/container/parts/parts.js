import React, { PureComponent, Fragment } from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

import Part from "./part"
import Details from "./details/details"
import Slider from "./slider/slider"
import FilterLinks from "./filter-links"

const getParts = (parts, partPosition) =>
  partPosition === "all"
    ? parts
    : parts.filter(part => part.position === partPosition)

export default class Parts extends PureComponent {
  state = {
    part: false,
    insetPosition: "all",
    nonsetPosition: "all",
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageFolder !== this.props.imageFolder)
      this.setState({ part: false })
  }

  render() {
    const { parts } = this.props
    const {
      toggleInset,
      showDetails,
      hideDetails,
      filterByPosition,
      changeCountInset,
    } = this
    const insets = parts.filter(part => part.inset)
    const nonsets = parts.filter(part => !part.inset)
    const insetSum = insets.reduce(
      (sum, part) => sum + (part.totalPrice || 0) * (part.countInset || 1),
      0,
    )

    const { part, insetPosition, nonsetPosition } = this.state
    const filterInsetParts = getParts(insets, insetPosition)
    const filterNonsetParts = getParts(nonsets, nonsetPosition)
    const insetText = insets.length
      ? `В комлекте ${insets.length} шт. на сумму ${prettyPrice(insetSum)} руб`
      : "В комплекте не выбраны модули"

    return (
      <Fragment>
        <OverlayWrap>
          {!insets.length && (
            <OverlayTextIfEmpty>Добавьте модули</OverlayTextIfEmpty>
          )}
          <Slider
            totalCount={filterInsetParts.length}
            name={insetText}
            filterName={insetPosition}
            links={
              <FilterLinks
                change={filterByPosition}
                value={insetPosition}
                name="inset"
              />
            }
          >
            {filterInsetParts.map(part => (
              <Part
                {...{ part, toggleInset, changeCountInset, showDetails }}
                buttonText="Удалить"
                key={part._id}
              />
            ))}
          </Slider>
        </OverlayWrap>
        {!!nonsets.length && (
          <Slider
            totalCount={filterNonsetParts.length}
            name="Не в комплекте"
            filterName={nonsetPosition}
            links={
              <FilterLinks
                change={filterByPosition}
                value={nonsetPosition}
                name="nonset"
              />
            }
          >
            {filterNonsetParts.map(part => (
              <Part
                {...{ part, toggleInset, showDetails }}
                buttonText="Добавить"
                key={part._id}
              />
            ))}
          </Slider>
        )}
        {part && (
          <Details
            part={part}
            hideDetails={hideDetails}
          />
        )}
      </Fragment>
    )
  }

  hideDetails = () => {
    this.setState({ part: false })
  }

  showDetails = e => {
    const { id } = e.currentTarget.dataset
    const part = this.props.parts.find(part => part._id === id)
    if (part) this.setState({ part })
  }

  toggleInset = e => {
    const code = Number(e.target.dataset.code)
    if (code) this.props.togglePart(code)
  }

  changeCountInset = e => {
    const code = Number(e.currentTarget.dataset.code)
    const { action } = e.target.dataset
    if (action && code) {
      this.props.changeCountInset(code, action)
    }
  }

  filterByPosition = e => {
    const { name } = e.currentTarget.dataset
    const { value } = e.target.dataset
    if (name && value) this.setState(state => ({ [name + "Position"]: value }))
  }
}

const OverlayWrap = styled.div`
  position: relative;
  margin-bottom: 50px;
`

const OverlayTextIfEmpty = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #b5b5b5;
  font-size: 25px;
`
