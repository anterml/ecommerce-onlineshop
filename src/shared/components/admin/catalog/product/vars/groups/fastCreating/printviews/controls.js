import React from "react"
import styled from "styled-components"

const Controls = ({ create, remove }) => (
  <Block>
    {/*<button onClick={create} data-continue="true">Создать и продолжить</button>*/}
    <button onClick={remove}>Удалить всё</button>
    <button onClick={create}>Создать</button>
  </Block>
)

export default Controls

const Block = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    flex: 1 1 auto;
  }
  button:not(:last-child) {
    margin-right: 5px;
  }
`
