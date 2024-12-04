import React from "react"
import styled from "styled-components"

const List = ({ comments }) =>
  comments.map(({ text, userName, date }, i) => (
    <Item key={i}>
      <Header>
        <Author>{userName}</Author>
        <span>{date}</span>
      </Header>
      <Text
        dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br />") }}
      />
    </Item>
  ))

export default List

const Item = styled.div`
  border-top: 1px solid #ddd;
  padding: 15px 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`

const Author = styled.div`
  font-weight: 500;
`

const Text = styled.div`
  color: #666;
`
