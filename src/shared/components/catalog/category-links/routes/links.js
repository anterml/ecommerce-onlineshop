import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { Route, NavLink } from "react-router-dom"

export default class Links extends Component {
  render() {
    const {
      ENG,
      RU,
      NOINDEX_URLS,
      category,
      categoryRu,
      DATA,
      department,
      BOTTOM_LINKS,
      TOP_LINKS,
    } = this.props
    const PATH = `/catalog/${department || "mebel"}/`

    return (
      <Block>
        {Array.isArray(TOP_LINKS) &&
          TOP_LINKS.map(({ eng, ru }) => (
            <BigCategory
              to={PATH + eng + "/"}
              key={eng}
              onClick={this.changeRoute}
            >
              {ru}
            </BigCategory>
          ))}

        <BigCategory
          to={PATH + category + "/"}
          onClick={this.changeRoute}
        >
          {categoryRu}
        </BigCategory>

        {DATA.map(({ name, values }) => {
          const path = PATH + category + "/" + ENG[name]
          return (
            <Fragment key={name}>
              <StyledLink
                to={path + "/"}
                onClick={this.changeRoute}
              >
                {RU[name]}
              </StyledLink>
              <Route
                path={path + "*"}
                component={({ location }) => (
                  <WrapLink onClick={this.changeRoute}>
                    {values.map((value, i) => {
                      const url = path + "_" + ENG[value] + "/"
                      const noLink = NOINDEX_URLS.includes(
                        ENG[name] + "_" + ENG[value],
                      )
                      const active = location.pathname === url ? "active" : ""
                      return noLink ? (
                        <NoLink
                          className={active}
                          data-url={url}
                          key={i}
                        >
                          {RU[value]}
                        </NoLink>
                      ) : (
                        <a
                          href={url}
                          className={active}
                          key={i}
                        >
                          {RU[value]}
                        </a>
                      )
                    })}
                  </WrapLink>
                )}
              />
            </Fragment>
          )
        })}

        {Array.isArray(BOTTOM_LINKS) &&
          BOTTOM_LINKS.map(({ eng, ru }) => (
            <BigCategory
              to={PATH + eng + "/"}
              key={eng}
              onClick={this.changeRoute}
            >
              {ru}
            </BigCategory>
          ))}
      </Block>
    )
  }

  changeRoute = e => {
    e.preventDefault()
    const url = e.target.getAttribute("href") || e.target.dataset.url
    if (url) {
      // сохраняем сортировку
      const search = this.props.location.search
        .split("&")
        .find(v => v.indexOf("sort=") !== -1)
      this.props.history.push({
        pathname: url,
        search,
      })
    }
  }
}

const Block = styled.div`
  a {
    color: #333;
  }

  & .active {
    color: #b30202;
  }
`
const WrapLink = styled.div`
  margin-left: 20px;
`

const StyledLink = styled(NavLink)`
  color: #333;
  margin-left: 10px;
`

const BigCategory = styled(NavLink)`
  font-weight: 500;
  margin-bottom: 10px;
  text-transform: uppercase;
`

const NoLink = styled.div`
  cursor: pointer;
  margin-bottom: 5px;
`
