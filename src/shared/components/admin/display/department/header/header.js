import React from "react"
import styled from "styled-components"
import Datetime from "./datetime"
import { Button } from "globalComponents/admin/buttons"

const Header = ({ title, productCount, save, changed, block }) => (
  <Block>
    <div>
      <Title>{title}</Title>
      <ProductCount>{productCount} продуктов</ProductCount>
    </div>
    <div>
      {block.created && (
        <Datetime
          title="Создано"
          value={block.created}
        />
      )}
      {block.updated && (
        <Datetime
          title="Изменено"
          value={block.updated}
        />
      )}
    </div>
    <Button
      onClick={save}
      disabled={!changed}
    >
      Сохранить
    </Button>
  </Block>
)

export default Header

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;

  & button {
    margin-left: 5px;
  }
`

const Title = styled.span`
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
`

const ProductCount = styled.div`
  color: #888;
  font-weight: 300;
`
