import React from "react"
import styled from "styled-components"
import ColorPopup from "./popup"
import { ColorBlock, Item, Wrap, List } from "./elements"

const Printviews = props => {
  const { target, selectedVars, groupName, getBackgrounds } = props

  const categories = target.reduce((acc, field) => {
    const category = field.category || "Базовая"
    if (!acc[category]) acc[category] = []
    acc[category].push(field)
    return acc
  }, {})

  return (
    <ColorPopup
      {...props}
      handle={getBackgrounds}
    >
      {setCurrentField =>
        Object.keys(categories).map(category => {
          const pv = categories[category].map(field => (
            <ColorBlock
              key={field._id}
              data-id={field._id}
              data-name={groupName}
              onMouseEnter={setCurrentField}
            >
              <Item
                data-selected={
                  selectedVars[field.name] === field._id && target.length > 1
                }
              >
                <Wrap>{getBackgrounds(field.styles)}</Wrap>
              </Item>
            </ColorBlock>
          ))

          return (
            <Category key={category}>
              <CategoryName>{category}</CategoryName>
              <List>{pv}</List>
            </Category>
          )
        })
      }
    </ColorPopup>
  )
}

export default Printviews

const Category = styled.div`
  margin-bottom: 10px;
`

const CategoryName = styled.div`
  font-weight: 300;
  font-style: italic;
  padding: 15px 0;
  margin-right: 20px;
  border-top: 1px solid #dad5d5;
`
