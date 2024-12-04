import React, { Fragment } from "react"
import styled from "styled-components"

import List from "./list"
import Creating from "./creating"

const AdminComment = ({ comments, add }) => (
  <Fragment>
    <Title>Наши комментарии</Title>
    <List comments={comments} />
    <Creating add={add} />
  </Fragment>
)

export default AdminComment

const Title = styled.div`
  margin-top: 100px;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 10px;
`
