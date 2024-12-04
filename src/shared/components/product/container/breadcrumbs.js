import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import { CATEGORIES_BY_DEPARTMENTS } from "utils/data/categories"

const newCategories = {
  stol: "stoli",
  stul: "stulya",
  banketka: "banketki",
  puf: "pufiki",
  komod: "komodi",
  kreslo: "kresla",
  kreslo_kachalka: "kresla-kachalki",
  kreslo_meshok: "kresla-meshki",
}

const BreadCrumbs = ({ department, category, productName, breadcrumbs }) => {
  const { name, categories } = CATEGORIES_BY_DEPARTMENTS[department] || {}

  if (!categories || !categories[category]) return null

  const startPos = 3
  return (
    <Nav>
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <Item
          name="yoursite"
          url="/"
          pos={1}
        />
        <Item
          name={name}
          url={`/department/${department}`}
          pos={2}
        />
        {Array.isArray(breadcrumbs) ? (
          breadcrumbs.map(({ ru, eng }, i) => (
            <Item
              name={ru}
              url={`/catalog/${department}/${eng}/`}
              pos={startPos + i}
              key={eng}
            />
          ))
        ) : (
          <Item
            name={categories[category]}
            url={`/catalog/${department}/${
              newCategories[category] || category
            }/`}
            pos={startPos}
          />
        )}
      </ol>
      <Tail>{productName}</Tail>
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
