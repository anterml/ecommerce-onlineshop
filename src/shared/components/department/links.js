import React, { Component } from "react"
import styled from "styled-components"

const rootImageUrl = "shop/departments/"

export default class Links extends Component {
  render() {
    const { department, values } = this.props

    const elems = values.map(({ eng, ru, query }, i) => {
      const imageUrl = rootImageUrl + eng + ".jpg"
      const href = `/catalog/${department}/${query || eng + "/"}`

      return (
        <Link
          href={href}
          title={ru}
          onClick={this.goToCategory}
          key={i}
        >
          <Wrap>
            <Image
              src={imageUrl}
              title={ru}
              alt={ru}
            />
          </Wrap>
          <Name>{ru}</Name>
        </Link>
      )
    })

    return (
      <List>
        {elems}
        <ItemPlaceholder />
        <ItemPlaceholder />
        <ItemPlaceholder />
        <ItemPlaceholder />
      </List>
    )
  }

  goToCategory = e => {
    e.preventDefault()
    const pathname = e.target.getAttribute("href")

    if (pathname) {
      window.scrollTo(0, 0)
      this.props.history.push({ pathname })
    }
  }
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Link = styled.a`
  display: inline-block;
  margin-bottom: 35px;
  padding: 10px 20px 20px;
  border: 1px solid #ddd;
  flex: 0 0 235px;

  &:hover {
    border-color: #aaa;
  }

  & * {
    pointer-events: none;
  }
`

const Wrap = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
`

const Name = styled.div`
  font-size: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #333;
  font-weight: 600;
`

const ItemPlaceholder = styled.div`
  flex: 0 0 235px;
  height: 0px;
`
