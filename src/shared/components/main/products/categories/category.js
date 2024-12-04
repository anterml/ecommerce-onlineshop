import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

const Category = ({ name, links, style, category, width, align }) => {
  const url = `/catalog/mebel/${category}/`
  return (
    <Block
      w={width}
      data-align={align}
    >
      <div>
        <Links>
          {Object.keys(links).map(name => (
            <StyledLink
              to={url + links[name]}
              key={name}
            >
              {name}
            </StyledLink>
          ))}
        </Links>
        <Name>
          <Link to={url}>{name}</Link>
        </Name>
      </div>
      <ForwardLink to={url}>Смотреть</ForwardLink>
      <Image style={style} />
    </Block>
  )
}

export default Category

const Block = styled.div`
  background: #ebebeb;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  @media (max-width: 1023px) {
    padding-bottom: 15px;
    margin-bottom: 30px;
    width: 100%;
  }

  @media (min-width: 1024px) {
    height: 220px;
    width: ${props => props.w};
  }

  &:not(:last-child) {
    margin-right: 30px;
  }

  &[data-align="right"] {
    text-align: right;
  }
`

const Image = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 1024px) and (max-width: 1130px) {
    transform: translateX(100px);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 25px 10px;
`

const StyledLink = styled(Link)`
  color: #8c8c8c;
  font-weight: 500;

  &:hover {
    color: #333;
  }

  &:not(:last-child):after {
    display: inline-block;
    content: "|";
    padding: 0 10px;
    font-weight: 300;
    color: #ccc;
  }
`

const Name = styled.h2`
  margin: 0 0 10px;
  padding: 0 25px;

  a {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    text-shadow: 0 0 1px white;
    color: #333;
  }
`

const ForwardLink = styled(Link)`
  display: inline-block;
  font-size: 15px;
  color: rgb(82, 82, 82);
  text-decoration: underline;
  padding: 25px;

  @media (max-width: 1023px) {
    display: none;
  }
`
