import React from "react"
import styled from "styled-components"
import setkinds from "utils/admin/data/set-kinds"

const Values = ({ list, selectedId }) =>
  list.map(({ _id, name, productIds, created, kind }) => (
    <Item
      key={_id}
      data-selected={_id === selectedId}
      data-id={_id}
    >
      <Line>
        <Name>{name}</Name>
        <b>{productIds.length}</b>
      </Line>
      <Line>
        <span>{setkinds[kind]}</span>
        <div>
          <Author>{created.author},</Author>
          <Datetime>{created.date}</Datetime>
        </div>
      </Line>
    </Item>
  ))

export default Values

const Item = styled.div`
  padding: 8px 15px;
  border-bottom: 1px solid #ccc;

  b {
    font-weight: 500;
  }

  &:nth-of-type(10n) {
    border-width: 5px;
  }

  &[data-selected="true"] {
    background: #ccc;
  }

  &[data-selected="false"] {
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }

  & * {
    pointer-events: none;
  }
`

const Line = styled.div`
  display: flex;
  justify-content: space-between;
`

const Name = styled.span`
  font-weight: 500;
  margin-right: 4px;
`

const Author = styled.span`
  color: #888;
`

const Datetime = styled.span`
  color: #888;
  margin-left: 3px;
`
