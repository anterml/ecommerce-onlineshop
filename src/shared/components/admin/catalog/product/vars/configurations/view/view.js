import React, { Fragment } from "react"
import styled from "styled-components"
import Groups from "./groups"
import instockValues from "utils/data/instock-values"

const View = ({ configuration, groups, remove }) => {
  const { instock, article, imageUrl, _id } = configuration
  return (
    <Fragment>
      <Groups
        groups={groups}
        configuration={configuration}
      />

      {instock !== -2 && <ResultInput>{instockValues[instock]}</ResultInput>}

      {article && <ResultInput>Артикул {article}</ResultInput>}

      {imageUrl && <ResultInput>Картинка {imageUrl}</ResultInput>}

      <RemoveButton
        onClick={remove}
        data-id={_id}
      >
        Удалить
      </RemoveButton>
    </Fragment>
  )
}

export default View

const ResultInput = styled.div`
  display: block;
  padding: 5px 8px;
  background-color: #ddd;
  border-radius: 3px;
  margin-bottom: 5px;
`

const RemoveButton = styled.button`
  margin-top: 20px;
  padding: 6px 22px;
`
