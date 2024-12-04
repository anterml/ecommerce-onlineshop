import React from "react"
import styled from "styled-components"

const List = ({
  values,
  name,
  selectedValue,
  select,
  remove,
  edit,
  drag = {},
}) => (
  <Items>
    {values.map(({ value, count, _id }) => (
      <Item
        key={_id}
        draggable="true"
        data-value={value}
        data-drag-selected={value === drag.value}
        onDragStart={drag.start}
        onDragOver={drag.over}
        onDragEnd={drag.end}
      >
        <RemoveButton
          data-value={value}
          onClick={remove}
        >
          x
        </RemoveButton>
        <Edit
          viewBox="0 0 15 15"
          onClick={edit}
          data-value={value}
          data-name={name}
        >
          <path d="M13.444 3.356c-0.325-0.444-0.779-0.962-1.277-1.461s-1.017-0.952-1.461-1.277c-0.755-0.554-1.122-0.618-1.332-0.618h-7.266c-0.646 0-1.172 0.526-1.172 1.172v12.656c0 0.646 0.526 1.172 1.172 1.172h10.781c0.646 0 1.172-0.526 1.172-1.172v-9.141c0-0.21-0.064-0.576-0.618-1.332zM11.505 2.558c0.45 0.45 0.803 0.855 1.063 1.192h-2.255v-2.255c0.337 0.26 0.742 0.613 1.192 1.063zM13.125 13.828c0 0.127-0.107 0.234-0.234 0.234h-10.781c-0.127 0-0.234-0.107-0.234-0.234v-12.656c0-0.127 0.107-0.234 0.234-0.234 0 0 7.265-0 7.266 0v3.281c0 0.259 0.21 0.469 0.469 0.469h3.281v9.141z"></path>
          <path d="M10.781 12.188h-6.563c-0.259 0-0.469-0.21-0.469-0.469s0.21-0.469 0.469-0.469h6.563c0.259 0 0.469 0.21 0.469 0.469s-0.21 0.469-0.469 0.469z"></path>
          <path d="M10.781 10.313h-6.563c-0.259 0-0.469-0.21-0.469-0.469s0.21-0.469 0.469-0.469h6.563c0.259 0 0.469 0.21 0.469 0.469s-0.21 0.469-0.469 0.469z"></path>
          <path d="M10.781 8.438h-6.563c-0.259 0-0.469-0.21-0.469-0.469s0.21-0.469 0.469-0.469h6.563c0.259 0 0.469 0.21 0.469 0.469s-0.21 0.469-0.469 0.469z"></path>
        </Edit>
        <Value
          data-name={name}
          data-id={_id}
          onClick={select}
        >
          <Name data-selected={_id === selectedValue}>{value}</Name>
          <Count>{count}</Count>
        </Value>
      </Item>
    ))}
    {!!values.length && (
      <Placeholder
        draggable="true"
        data-value="last"
        data-drag-selected={"last" === drag.value}
        onDragStart={drag.start}
        onDragOver={drag.over}
        onDragEnd={drag.end}
      />
    )}
  </Items>
)

export default List

const Items = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 430px;
  min-height: 100%;
  border-left: 1px solid #ddd;
`

const RemoveButton = styled.div`
  transform: scaleY(0.85);
  display: inline-block;
  margin: 0 10px 0 12px;
  padding: 3px 6px;
  color: #999;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`

const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid transparent;
  border-bottom: 1px solid #ddd;

  &:hover ${RemoveButton} {
    display: block;
  }

  &[data-drag-selected="true"] {
    border-top-color: #b30202;
  }
`

const Value = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 0;
  flex: 1 1 auto;
  cursor: pointer;

  & * {
    pointer-events: none;
  }
`

const Name = styled.div`
  font-weight: 500;
  &[data-selected="true"] {
    color: #b30202;
  }
`

const Count = styled.span`
  color: #999;
  font-weight: 500;
`

const Placeholder = styled.div`
  cursor: pointer;
  display: block;
  border-top: 2px solid transparent;
  background: white;
  &[data-drag-selected="true"] {
    border-top-color: #b30202;
  }
`

const Edit = styled.svg`
  width: 15px;
  height: 15px;
  margin-right: 12px;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`
