import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import mebel from "../data/categories/mebel"
import elektronika from "../data/categories/elektronika"

export default class Links extends Component {
  state = {
    popup: false,
  }

  render() {
    return (
      <Item>
        <span onClick={this.togglePopup}>Каталог</span>
        {this.state.popup && (
          <Block>
            <Content onClick={this.hidePopupIfLink}>
              <Title>Каталог электроники</Title>
              <Department>
                {elektronika.map((items, i) => (
                  <Fragment key={i}>
                    {Object.keys(items).map(name => (
                      <StyledLink
                        to={`/catalog/electronics/${name}/`}
                        key={name}
                      >
                        {items[name]}
                      </StyledLink>
                    ))}
                  </Fragment>
                ))}
              </Department>
              <Department>
                <Title>Каталог мебели</Title>
                {mebel.map((items, i) => (
                  <Fragment key={i}>
                    {Object.keys(items).map(name => (
                      <StyledLink
                        to={`/catalog/mebel/${name}/`}
                        key={name}
                      >
                        {items[name]}
                      </StyledLink>
                    ))}
                  </Fragment>
                ))}
              </Department>
            </Content>
            <Overlay onClick={this.hidePopup} />
          </Block>
        )}
      </Item>
    )
  }

  hidePopupIfLink = e => {
    if (e.target.nodeName.toLowerCase() === "a") {
      this.hidePopup()
    }
  }

  togglePopup = () => {
    this.setState(state => ({ popup: !state.popup }))
  }

  hidePopup = () => {
    this.setState(() => ({ popup: false }))
  }
}

const Item = styled.div`
  position: relative;
`

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  display: flex;
`

const Title = styled.div`
  padding: 15px 15px 5px;
  font-weight: 600;
  font-size: 16px;
`

const Department = styled.div`
  margin-bottom: 10px;
`

const Overlay = styled.div`
  flex: 1 1 auto;
  background-color: rgba(0, 0, 0, 0.5);
`

const Content = styled.div`
  overflow-y: auto;
  width: 290px;
  padding-bottom: 80px;
  z-index: 102;
  background-color: #fff;
  color: #333;
`

const StyledLink = styled(Link)`
  display: block;
  padding: 5px 15px;
  font-size: 13px;
  cursor: pointer;
  color: #444;
  white-space: nowrap;

  &:hover {
    background: #bddcf1;
    color: #4f4f4f;
  }
`
