import React, { Fragment } from "react"
import styled from "styled-components"

const Comment = ({ text }) => (
  <Fragment>
    <Title>Комментарий</Title>
    <div>{text}</div>
  </Fragment>
)

export default Comment

const Title = styled.div`
  color: #999;
  text-transform: uppercase;
  margin-bottom: 10px;
`
