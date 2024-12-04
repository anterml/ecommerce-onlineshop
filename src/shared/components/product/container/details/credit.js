import React from "react"
import styled from "styled-components"

const Credit = ({ price }) => (
  <Text>
    В рассрочку от <strong>{price}</strong>
    <Unit>руб/мес</Unit>.<div>0 руб, 0%, 24 мес.</div>
  </Text>
)

export default Credit

const Text = styled.div`
  margin: 10px 0;
  font-weight: 300;
  font-style: italic;
  color: #909090;

  strong {
    color: #000;
    font-size: 15px;
    font-weight: 500;
    margin-right: 4px;
  }
`

const Unit = styled.span`
  color: #000;
`
