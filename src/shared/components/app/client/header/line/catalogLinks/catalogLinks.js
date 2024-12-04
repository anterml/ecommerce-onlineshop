import React, { PureComponent } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import Button from "./button"
import Links from "./links"
import mebel from "../data/categories/mebel"
import elektronika from "../data/categories/elektronika"

export default class Catalog extends PureComponent {
  state = {
    menu: false,
    submenu: "",
  }

  render() {
    const { menu, submenu } = this.state
    const { showMenu, hideMenu, showSubmenu, hideAllByLinkClick } = this
    return (
      <div
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
      >
        <Button />
        <ItemsColumn
          className={menu ? "" : "hidden"}
          onClick={hideAllByLinkClick}
        >
          <Menu>
            <DepartmentLink
              to="/department/electronics"
              onMouseEnter={showSubmenu}
              data-name="electronics"
            >
              Электроника
            </DepartmentLink>
            <DepartmentLink
              to="/department/mebel"
              onMouseEnter={showSubmenu}
              data-name="mebel"
            >
              Мебель
            </DepartmentLink>
            <DepartmentLink
              to="/catalog/mebel/kuhnya/"
              onMouseEnter={showSubmenu}
              data-name="kuhnya"
            >
              Кухни
            </DepartmentLink>
            <DepartmentLink
              to="/brands/mebel/"
              onMouseEnter={showSubmenu}
              data-name="brands"
            >
              Фабрики мебели
            </DepartmentLink>
          </Menu>
          {submenu === "electronics" && (
            <Links
              department="electronics"
              categories={elektronika}
            />
          )}
          {submenu === "mebel" && (
            <Links
              department="mebel"
              categories={mebel}
              needPaddingBottom={true}
            />
          )}
        </ItemsColumn>
      </div>
    )
  }

  hideAllByLinkClick = e => {
    if (e.target.nodeName.toLowerCase() === "a") this.hideMenu()
  }

  showMenu = e => {
    this.setState(() => ({ menu: true }))
  }

  hideMenu = e => {
    this.setState(() => ({ menu: false, submenu: "" }))
  }

  showSubmenu = e => {
    const { name } = e.currentTarget.dataset
    this.setState(() => ({ submenu: name }))
  }
}

const ItemsColumn = styled.div`
  background: #ddd;
  position: absolute;
  display: flex;
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.41);
  background-color: #fff;
`

const Menu = styled.div`
  width: 208px;
  background-color: #e7ebee;
`

const DepartmentLink = styled(Link)`
  display: block;
  padding: 6px 15px 6px 20px;
  color: #444;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: #bddcf1;
    color: #4f4f4f;
  }
`
