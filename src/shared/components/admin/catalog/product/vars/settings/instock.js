import React from "react"
import styled from "styled-components"
import values from "utils/data/instock-values"

const Instock = ({ instock, change }) => (
  <Select
    data-name="instock"
    value={typeof instock === "number" ? instock : ""}
    onChange={change}
  >
    <option value="-2">Нет статуса</option>
    {Object.keys(values).map(value => (
      <option
        value={value}
        key={value}
      >
        {values[value]}
      </option>
    ))}
  </Select>
)

export default Instock

const Select = styled.select`
  background: white;
  border: 1px solid #dedede;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 2px;
`
