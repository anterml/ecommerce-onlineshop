import React from "react"
import styled from "styled-components"

const AvailableVisibility = ({ change, value }) => (
  <Label>
    <input
      type="checkbox"
      onChange={change}
      checked={!!value}
    />
    <span>
      Неотображать доступность товара{" "}
      <em>(Не действует, если выбрано "В наличии")</em>
    </span>
  </Label>
)

export default AvailableVisibility

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;

  input {
    margin-right: 4px;
  }

  em {
    color: #999;
  }
`
