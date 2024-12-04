import React, { Component, Fragment } from "react"
import styled from "styled-components"
import DONE_STATUS_LIST from "utils/data/doneStatusList"
import DropDown, { Item } from "./dropdown"

export default class DoneStatus extends Component {
  render() {
    const { doneStatus, stats, change } = this.props

    if (!stats) return <div>Загрузка статусов...</div>

    const total = DONE_STATUS_LIST.reduce(
      (acc, status) => acc + (stats[status.code] || 0),
      0,
    )
    const selectedValue =
      typeof doneStatus !== "number"
        ? "Показать все"
        : DONE_STATUS_LIST.find(status => status.code === doneStatus).name

    const elems = DONE_STATUS_LIST.map(({ name, code, color }) => (
      <Status
        code={code}
        selected={doneStatus === code}
        change={change}
        name={name}
        color={color}
        count={stats[code] || 0}
        key={code}
      />
    ))

    return (
      <DropDown
        title="Состояние"
        selectedValue={selectedValue}
        width="50%"
      >
        <Fragment>
          <Status
            code=""
            selected={typeof doneStatus !== "number"}
            change={change}
            name="Показать все"
            color="white"
            count={total}
          />
          {elems}
        </Fragment>
      </DropDown>
    )
  }
}

const Status = ({ code, selected, change, count, name, color }) => (
  <Item
    onClick={change}
    data-status={code}
    selected={selected}
  >
    <Type color={color} />
    <Name>{name}</Name>
    <Count>{count}</Count>
  </Item>
)

const Type = styled.span`
  width: 10px;
  height: 10px;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 7px;
  background-color: ${props => props.color};
`

const Name = styled.span`
  width: 100%;
  margin-right: 15px;
`

const Count = styled.span`
  color: #999;
  margin-left: 5px;
`
