import React from "react"
import styled from "styled-components"

const SetList = ({ values, select }) => (
  <Block>
    <Title>Найденные коллекции: {values.length}</Title>
    <div onClick={select}>
      {values.map(({ _id, name, created: { date, author } }) => (
        <Link
          key={_id}
          data-id={_id}
          data-selected={false}
        >
          <Name>{name}</Name>
          <CreatedAt>{date}</CreatedAt>
          <Author>{author}</Author>
        </Link>
      ))}
    </div>
  </Block>
)

export default SetList

const Block = styled.div`
  margin-top: 5px;
`

const Title = styled.div`
  margin-bottom: 5px;
  text-transform: uppercase;
  color: #888;
  padding: 4px 8px;
`

const Name = styled.span`
  font-weight: 500;
  color: #292929;
  display: inline-block;
`

const CreatedAt = styled.span`
  color: #999;
`

const Author = styled.span`
  color: #999;
`

const Link = styled.div`
  width: 100%;
  display: flex;
  padding: 4px 8px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &[data-selected="true"] {
    background-color: #cad1d6;
  }

  & > * {
    margin-right: 8px;
    pointer-events: none;
  }
`
