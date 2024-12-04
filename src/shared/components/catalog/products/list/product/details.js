import React, { Fragment } from "react"
import styled from "styled-components"
import Arrow from "./css/arrow"

const Details = ({ values, hover }) => (
  <Fragment>
    <Button hover={hover}>
      <Arrow />
      Подробнее
    </Button>

    <List>
      {Object.keys(values).map((attr, i) => (
        <Item key={i}>
          <Title>{attr}</Title>
          <Values>
            {values[attr].map((value, k) => (
              <Value key={k}>{parse(value)}</Value>
            ))}
          </Values>
        </Item>
      ))}
    </List>
  </Fragment>
)

function parse(value) {
  let v = value
  if (typeof v === "object") {
    if (v.length && v.width && v.height)
      v = v.length + " x " + v.width + " x " + v.height
    else if (v.width && v.height) v = v.width + " x " + v.height
    else if (v.length && v.width) v = v.length + " x " + v.width
    else v = "na"
  }
  return v
}

export default Details

const List = styled.div`
  position: absolute;
  display: none;
  top: 0;
  left: -285px;
  width: 280px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.28);
  background-color: white;
  z-index: 1;
  font-size: 13px;
  text-align: left;
  padding: 10px 12px;
  border-radius: 2px;
`

const Item = styled.div`
  display: flex;
  padding: 8px 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border: none;
  }
`

const Title = styled.div`
  max-width: 113px;
  min-width: 113px;
  width: 113px;
  margin-right: 3px;
  font-weight: 500;
  color: #343434;
  font-size: 13px;
  line-height: 19px;
`

const Values = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`

const Value = styled.div`
  line-height: 19px;
  font-weight: 300;
`

const Button = styled.div`
  display: ${props => (props.hover ? "flex" : "none")};
  position: absolute;
  flex-flow: row nowrap;
  align-items: center;
  top: 0;
  font-size: 13px;
  padding: 4px 20px 4px 5px;
  border-radius: 0 0 2px 0px;
  left: 0;
  background-color: rgba(218, 218, 218, 0.9);
  color: #555555;
  cursor: pointer;

  &:hover + ${List} {
    display: block;
  }
`
