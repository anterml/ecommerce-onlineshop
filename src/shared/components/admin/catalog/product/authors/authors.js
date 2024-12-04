import React from "react"
import styled from "styled-components"

const Authors = ({ general }) => (
  <Block>
    {general.creating && (
      <Item
        data={general.creating}
        title="Создано"
      />
    )}
    {general.updating && (
      <Item
        data={general.updating}
        title="Изменено"
      />
    )}
  </Block>
)

const Item = ({ data, title }) => (
  <Content>
    <Title>{title}</Title>
    <Author>{data.userName}</Author>
    <Datetime>{prepareDate(data.date)}</Datetime>
  </Content>
)

function prepareDate(date) {
  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  })

  return formatter.format(new Date(date)).replace(" г.", "")
}

export default Authors

const Block = styled.div`
  white-space: nowrap;
  margin-top: 5px;
  margin-bottom: 25px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  &:nth-of-type(2) {
    padding-top: 5px;
  }
`

const Title = styled.span`
  flex: 0 0 200px;
  color: #aaa;
  margin-right: 5px;
`

const Author = styled.span`
  margin-right: 10px;
  font-weight: 500;
  color: #555;
`

const Datetime = styled.span`
  color: #777;
`
