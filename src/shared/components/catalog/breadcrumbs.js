import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

const BreadCrumbs = ({ department, breadcrumbs }) => {
  const category = breadcrumbs[0]
  const body = breadcrumbs.slice(1, -1)
  const tail = breadcrumbs[breadcrumbs.length - 1] || {}
  const ruDepartment = department === "mebel" ? "Мебель" : "Электроника"

  return (
    <Nav>
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <Item
          name="yoursite"
          url="/"
          pos="1"
        />
        <Item
          name={ruDepartment}
          url={`/department/${department}`}
          pos="2"
        />

        {breadcrumbs.length > 1 && (
          <Item
            name={category.ru}
            url={`/catalog/${department}/${category.eng}/`}
            pos="3"
          />
        )}
        {body.map(({ ru, eng }, i) => (
          <Item
            name={ru}
            url={`/catalog/${department}/${category.eng}/${eng}/`}
            pos={i + 4}
            key={eng}
          />
        ))}
      </ol>
      <Tail>{tail.ru}</Tail>
    </Nav>
  )
}

const Item = ({ url, name, pos }) => (
  <li
    itemProp="itemListElement"
    itemScope
    itemType="https://schema.org/ListItem"
  >
    <StyledLink
      itemProp="item"
      to={url}
    >
      <span itemProp="name">{name}</span>
    </StyledLink>
    <meta
      itemProp="position"
      content={pos}
    />
  </li>
)

export default BreadCrumbs

const Nav = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  user-select: none;

  ol {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    list-style: none;
  }

  li {
    margin: 0;
    padding: 0;
  }
`

const StyledLink = styled(Link)`
  display: inline-block;
  color: #337ab7;
  cursor: pointer;
  &:hover {
    color: #2c5571;
  }

  &:after {
    content: "/";
    display: inline-block;
    margin: 0 10px;
    color: #aaa;

    @media (max-width: 767px) {
      &:nth-last-of-type(2) {
        display: none;
      }
    }
  }
`

const Tail = styled.span`
  color: #626262;
  @media (max-width: 767px) {
    display: none;
  }
`
