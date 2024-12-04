import React from "react"
import ColorPopup from "./popup"
import { ColorBlock, Item, Wrap, List } from "./elements"

const Colors = props => {
  const { target, selectedVars, groupName, getBackgrounds } = props
  return (
    <ColorPopup
      {...props}
      handle={getBackgrounds}
    >
      {setCurrentField => (
        <List>
          {target.map(field => (
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
          ))}
        </List>
      )}
    </ColorPopup>
  )
}

export default Colors
