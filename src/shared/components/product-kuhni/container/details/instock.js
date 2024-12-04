import React from "react"
import styled from "styled-components"
import values from "utils/data/instock-values"

const color = {
  "-1": "#a66c03",
  "0": "#be0001",
  "1": "green",
  "2": "gray",
}

const Instock = ({ value }) => <Text value={value}>{values[value]}</Text>

export default Instock

const Text = styled.div`
  color: ${props => color[props.value]};
`
