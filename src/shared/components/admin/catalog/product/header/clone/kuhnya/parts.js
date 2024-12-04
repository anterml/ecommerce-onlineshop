import React from "react"
import styled from "styled-components"

const Parts = ({ parts, toggle, enabledParts, enable }) => (
  <Block data-enable={enable}>
    <label>
      <input
        type="checkbox"
        name="part"
        checked={enabledParts.length === parts.length}
        data-id="select all"
        onChange={toggle}
      />
      <Value>
        <b>Выбрать всё</b>
      </Value>
    </label>
    {parts.map(({ _id, name, kind }) => (
      <label key={_id}>
        <input
          type="checkbox"
          name="part"
          checked={enabledParts.includes(_id)}
          disabled={!enable}
          data-id={_id}
          onChange={toggle}
        />
        <Value>
          {kind} {name}
        </Value>
      </label>
    ))}
  </Block>
)

export default Parts

const Block = styled.div`
  margin: 5px 0 5px 18px;
  max-height: 300px;
  overflow-y: auto;

  &[data-enable="false"] {
    opacity: 0.5;

    label {
      cursor: default;
      &:hover {
        color: #333;
      }
    }
  }

  & > label {
    padding: 0 10px 0 0;
    margin: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input {
    margin: 0;
  }
`

const Value = styled.div`
  margin-left: 4px;
`
