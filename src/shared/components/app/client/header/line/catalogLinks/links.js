import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

const Links = ({ department, categories, needPaddingBottom }) => (
  <Block needPaddingBottom={needPaddingBottom}>
    {categories.map((items, i) => (
      <div key={i}>
        {Object.keys(items).map(name => (
          <StyledLink
            to={`/catalog/${department}/${name}/`}
            key={name}
          >
            {items[name]}
          </StyledLink>
        ))}
      </div>
    ))}
  </Block>
)

export default Links

const Block = styled.div`
  background: #ddd;
  display: flex;
  color: white;
  background-color: #fff;
  ${props => props.needPaddingBottom && "padding-bottom: 5px"};
`

const StyledLink = styled(Link)`
  display: block;
  padding: 6px 20px;
  font-size: 13px;
  cursor: pointer;
  color: #444;
  min-width: 160px;
  white-space: nowrap;

  &:hover {
    background: #bddcf1;
    color: #4f4f4f;
  }
`
