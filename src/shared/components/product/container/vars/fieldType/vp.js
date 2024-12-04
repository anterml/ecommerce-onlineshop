import React from "react"
import styled from "styled-components"

const VPFields = ({ fields, change, selectedId, only, getBackgrounds }) => (
  <List onClick={change}>
    {fields.map(({ _id, name, value, styles, material, price }) => {
      const elems = getBackgrounds(styles)
      return (
        <Field key={_id}>
          <Item
            data-id={_id}
            data-name={name}
            selected={selectedId === _id && !only}
          >
            <Wrap>{elems}</Wrap>
          </Item>
          <Preview>
            <PreviewWrap>{elems}</PreviewWrap>
            <PreviewTitle>
              <div>{material}</div>
              <PreviewPrice>{price || 0} &#8381;</PreviewPrice>
              <span>{value}</span>
            </PreviewTitle>
          </Preview>
        </Field>
      )
    })}
  </List>
)

export default VPFields

const List = styled.div`
  display: flex;
  flex-flow: row wrap;

  @media (max-width: 1023px) {
    position: relative;
  }
`

const Preview = styled.div`
  position: absolute;
  visibility: hidden;
  overflow: hidden;
  opacity: 0;
  z-index: 1;
  width: 215px;
  height: 215px;
  top: -225px;
  left: 0;
  transition: top 0.3s ease;
  box-shadow: 2px 0px 14px #000;
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  background-color: white;

  @media (min-width: 1024px) {
    width: 250px;
    height: 250px;
    top: -256px;
    left: -100px;
  }
`

const Field = styled.div`
  margin-right: 5px;

  @media (min-width: 1024px) {
    position: relative;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover ${Preview} {
    opacity: 1;
    z-index: 1000;
    background-color: #fff;
    visibility: visible;
    @media (min-width: 1024px) {
      top: -260px;
    }
  }
`

const Item = styled.div`
  cursor: pointer;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;
  ${props => props.selected && "border-color: #b9090a"};
`

const Wrap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 2px;
  border: 2px solid #333;
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  pointer-events: none;
`

const PreviewWrap = styled.div`
  display: flex;
  height: 100%;
  flex-flow: row nowrap;
`

const PreviewTitle = styled.div`
  padding: 8px 20px;
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-top: 1px solid #ddd;

  & > span {
    display: inline-block;
    vertical-align: middle;
  }
`

const PreviewPrice = styled.span`
  font-weight: 600;
  margin-right: 5px;
  font-size: 19px;
  white-space: nowrap;
`
