import React from "react"
import styled from "styled-components"

const Header = ({ name, collapse, isCollapse }) => (
  <Block
    onClick={collapse}
    data-name={name}
    isCollapse={isCollapse}
  >
    <Collapse isCollapse={isCollapse} />
    <span>{name}</span>
  </Block>
)

export default Header

const Block = styled.div`
  margin-bottom: 5px;
  font-weight: 700;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  cursor: pointer;
  ${props => props.isCollapse && "margin-bottom: 0;"};
`

const Collapse = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 9px;
  background-image: url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 129 129'><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'/></svg>");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 10px auto;
  ${props => props.isCollapse && "transform: rotate(-90deg);"};
`
