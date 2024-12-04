import React from "react"
import styled from "styled-components"
import { Button } from "globalComponents/admin/buttons"
import { getFullDate } from "utils/date"

const ExportBlock = ({ date, update }) => (
  <Block>
    <Button onClick={update}>Добавить</Button>
    {date && <Datetime>{getFullDate(date)}</Datetime>}
  </Block>
)

export default ExportBlock

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`

const Datetime = styled.span`
  margin-left: 10px;
  color: #999;
`
