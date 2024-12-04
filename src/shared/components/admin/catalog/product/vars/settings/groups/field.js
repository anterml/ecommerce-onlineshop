import React, { PureComponent } from "react"
import styled from "styled-components"

export default class Field extends PureComponent {
  render() {
    const {
      selected,
      current,
      status,
      dragEnd,
      dragOver,
      dragStart,
      field,
      setDefaultField,
    } = this.props
    const { _id, value, price } = field

    return (
      <Block
        selected={selected}
        current={current}
        draggable="true"
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        data-field-id={_id}
        key={_id}
      >
        <Status
          status={status}
          onClick={setDefaultField}
          data-field-id={_id}
        />
        <Value>{value}</Value>
        <Price>{price ? `${price} руб` : ""}</Price>
      </Block>
    )
  }
}

const selectedF = props => props.selected && "border-color: #5e94c4"
const currentF = props => props.current && "opacity: 0.5"

const Block = styled.div`
  cursor: pointer;
  display: block;
  border-top: 2px solid transparent;
  ${selectedF};
  ${currentF};
`

const Status = styled.span`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
  background-color: #bbb;
  margin-right: 10px;
  ${props => props.status === 1 && "background-color: #be0000"};
`

const Value = styled.span`
  margin-right: 10px;
`

const Price = styled.span`
  color: green;
  white-space: nowrap;
`
