import React from "react"
import styled from "styled-components"
import { engPlaceNames, ruPlaceNames } from "utils/data/instock-places"

const accessPrefix = "#a-instock-products-"

const InstockPlaces = ({ places, auth, change }) => (
  <Block>
    {ruPlaceNames.map((name, i) => {
      const accessValue = accessPrefix + engPlaceNames[i]
      const disabled = !auth.accessList.includes(accessValue)

      return (
        <label
          key={i}
          data-disabled={disabled}
        >
          <input
            type="checkbox"
            data-i={i}
            checked={places.includes(i)}
            disabled={disabled}
            onChange={change}
          />
          <span>{name}</span>
        </label>
      )
    })}
  </Block>
)

export default InstockPlaces

const Block = styled.div`
  display: flex;
  margin-bottom: 40px;

  h3 {
    margin: 0 0 10px;
  }

  select {
    display: block;
    margin-bottom: 5px;
  }

  input {
    margin: 0 4px 0 0;
  }

  label {
    margin: 0 20px 3px 0;
    display: flex;
    align-items: center;
    user-select: none;

    &[data-disabled="false"] {
      cursor: pointer;
    }

    &[data-disabled="true"] > span {
      opacity: 0.5;
    }
  }
`
