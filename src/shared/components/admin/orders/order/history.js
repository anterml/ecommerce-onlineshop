import React, { Fragment } from "react"
import styled from "styled-components"

const History = ({ values }) => (
  <Fragment>
    <Title>История изменений</Title>
    <div>
      {values.map(({ _id, author, date, runame, value }) => (
        <Item key={_id}>
          <Header>
            <span>{date}</span>
            <span>{author}</span>
          </Header>
          <Body>
            <Name>{runame}:</Name>
            <span>{value}</span>
          </Body>
        </Item>
      ))}
    </div>
  </Fragment>
)

export default History

const Title = styled.div`
  margin-top: 100px;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 20px;
`

const Item = styled.div`
  margin-bottom: 15px;
`

const Header = styled.div`
  margin-bottom: 2px;
  color: #666;

  & > span:first-child {
    margin-right: 5px;
  }
`

const Body = styled.div`
  font-weight: 500;
`

const Name = styled.span`
  width: 150px;
  margin-right: 5px;
  color: green;
`
