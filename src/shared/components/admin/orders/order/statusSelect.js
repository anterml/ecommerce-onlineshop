import React from "react"
import styled from "styled-components"
import STATUS_LIST from "../statusList"

const Status = ({ value, change }) => (
  <Select
    value={value}
    onChange={change}
  >
    {Object.keys(STATUS_LIST).map(status => (
      <option
        key={status}
        value={status}
      >
        {STATUS_LIST[status]}
      </option>
    ))}
  </Select>
)

export default Status

const Select = styled.select`
  margin-right: 10px;
  padding: 8px 14px;
`
