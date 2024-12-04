import React, { Component } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import asyncRequest from "utils/request"

const links = {
  Каталог: "/admin/catalog=all/product=empty/",
  Цвета: "/admin/colors",
  Статистика: "/admin/stats/employees/",
  Наборы: "/admin/sets",
}

export default class Header extends Component {
  state = {
    orderCount: 0,
    hasNewOrder: false,
  }

  componentDidMount() {
    document.getElementsByTagName("html")[0].style.overflow = "auto"

    // неактивная вкладка браузера
    // изменить title при новом заказе
    window.onblur = () => {
      this.title = document.title
      clearInterval(this.titleInterval)
      if (this.state.hasNewOrder)
        this.setState(state => ({ hasNewOrder: false }))
      this.titleInterval = setInterval(this.changeTitle, 1000)
    }

    // активная вкладка браузера
    window.onfocus = () => {
      clearInterval(this.titleInterval)
      if (this.state.hasNewOrder)
        this.setState(state => ({ hasNewOrder: false }))

      // this.title может не быть, если админка была открыта как
      // "открыть ссылку в новой вкладке"
      if (this.title) document.title = this.title
    }

    // запросить кол-во новых заказов
    this.getOrderStats()

    // запрашивать данные о кол-ве новых заказов раз в 3 мин
    this.requestInterval = setInterval(this.getOrderStats, 180000)
  }

  changeTitle = () => {
    if (this.state.hasNewOrder) {
      if (document.title === "Новый заказ") {
        document.title = this.title
      } else {
        this.title = document.title
        document.title = "Новый заказ"
      }
    }
  }

  getOrderStats = () => {
    asyncRequest({ url: "admin/orders/online-stats" }).then(orderCount => {
      const data = { orderCount }

      if (orderCount && orderCount > this.state.orderCount)
        data.hasNewOrder = true

      this.setState(state => data)
    })
  }

  componentWillUnmount() {
    clearInterval(this.requestInterval)
    clearInterval(this.titleInterval)
  }

  render() {
    const { accessList, restrict } = this.props.auth
    const { orderCount } = this.state

    return (
      <Block id="admin-header-links-block">
        <Links>
          <StyledNavLink
            to="/"
            target="_blank"
          >
            Главная
          </StyledNavLink>
          {Object.keys(links).map(name => (
            <StyledNavLink
              to={links[name]}
              key={name}
            >
              {name}
            </StyledNavLink>
          ))}
          {accessList.find(
            value => value.indexOf("#a-instock-products") === 0,
          ) && (
            <StyledNavLink to="/admin/instock-products">
              Товары в магазинах
            </StyledNavLink>
          )}
          {accessList.includes("orders") && !restrict && (
            <StyledNavLink to="/admin/orders/">
              Заказы {!!orderCount && <OrderCount>{orderCount}</OrderCount>}
            </StyledNavLink>
          )}
          {accessList.includes("display") && (
            <StyledNavLink to="/admin/display/">Отображение</StyledNavLink>
          )}
          {accessList.includes("#a-section-words") && (
            <StyledNavLink to="/admin/section-words">
              Ключевые слова
            </StyledNavLink>
          )}

          {accessList.includes("#a-seo") && (
            <StyledNavLink to="/admin/seo/templates">Seo</StyledNavLink>
          )}
        </Links>
      </Block>
    )
  }
}

const Block = styled.div`
  background-color: #222;
  margin-bottom: 2px;
`

const Links = styled.div`
  width: 100%;
  max-width: 1343px;
  margin: 0 auto;
  text-align: center;
`

const StyledNavLink = styled(Link)`
  display: inline-block;
  margin-right: 15px;
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 3px solid transparent;
  font-weight: 500;
  padding: 8px 0px 5px;
  cursor: pointer;
  &:hover {
    border-color: orange;
  }
`

const OrderCount = styled.span`
  display: inline-block;
  width: 21px;
  height: 20px;
  border-radius: 50%;
  background-color: #b30202;
  color: white;
`
