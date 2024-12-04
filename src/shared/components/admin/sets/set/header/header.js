import React from "react"
import styled from "styled-components"
import Datetime from "./datetime"
import { Button } from "globalComponents/admin/buttons"
import { Select } from "globalComponents/admin/elements"
import setkinds from "utils/admin/data/set-kinds"

const Header = ({ set, productCount, remove, save, changed, changeKind }) => (
  <Block>
    <div>
      <Title>{set.name}</Title>
      <ProductCount>{productCount} продуктов</ProductCount>
    </div>
    <div>
      <Datetime
        title="Создано"
        value={set.created}
      />
      {set.updated && (
        <Datetime
          title="Изменено"
          value={set.updated}
        />
      )}
    </div>
    <span>
      <Select
        value={set.kind}
        onChange={changeKind}
      >
        <option value="0">{setkinds[0]}</option>
        <option value="1">{setkinds[1]}</option>
      </Select>
      <Button onClick={remove}>Удалить</Button>
      <Button
        onClick={save}
        disabled={!changed}
      >
        Сохранить
      </Button>
    </span>
  </Block>
)

export default Header

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
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
