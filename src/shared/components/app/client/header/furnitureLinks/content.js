import React from "react"
import styled from "styled-components"
import CATEGORIES from "utils/data/categories"
import Link from "react-router-dom/Link"

const Category = ({ column, hide }) =>
  Object.keys(column).map(ruCategory => {
    const target = column[ruCategory]
    const category =
      target.category ||
      Object.keys(CATEGORIES).find(name => CATEGORIES[name] === ruCategory)

    const query = target.query ? "?" + target.query : ""
    const values = target ? target.values || target : null
    const url = `/catalog/mebel/${category + "/" + query}`

    return (
      <Item key={ruCategory}>
        <CategoryLink
          to={url}
          data-link={!!category}
          onClick={hide}
        >
          {ruCategory}
        </CategoryLink>

        {!!target &&
          Object.keys(values).map((name, k) => {
            let query, url, isLink

            if (typeof values[name] === "string") {
              query = values[name] ? "?" + values[name] : ""
              url = `/catalog/mebel/${category + "/" + query}`
              isLink = !!query
            } else {
              query = values[name].query ? "?" + values[name].query : ""
              const category = values[name].category || category
              url = `/catalog/mebel/${category + "/" + query}`
              isLink = !!(query || category)
            }

            return (
              <StyledLink
                to={url}
                data-link={isLink}
                onClick={hide}
                key={k}
              >
                {name}
              </StyledLink>
            )
          })}
      </Item>
    )
  })

export default Category

const Item = styled.div`
  min-width: 200px;
`

const CategoryLink = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px;
  display: block;
  color: #999;
  cursor: default;

  &[data-link="true"] {
    cursor: pointer;
    color: #333;

    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledLink = styled(Link)`
  display: block;
  color: #999;
  margin-bottom: 5px;
  cursor: default;

  &[data-link="true"] {
    cursor: pointer;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    margin-bottom: 30px;
  }
`
