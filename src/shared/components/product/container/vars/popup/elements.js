import styled from "styled-components"

export const ColorBlock = styled.div`
  position: relative;
  margin-bottom: 5px;
  margin-right: 5px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`

export const List = styled.div`
  display: flex;
  flex-flow: row wrap;
`

export const Wrap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 2px;
  border: 2px solid #333;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
`

export const MultiItem = styled.div`
  width: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
`

export const Item = styled.div`
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  pointer-events: none;

  &[data-selected="true"] {
    border-bottom: 2px solid #b9090a;
  }
`
