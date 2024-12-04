import React, { Component } from "react"
import { PHONE_NUMBERS } from "utils/data/phone-numbers"

export default class ProductOrder extends Component {
  static title = "Как оформить заказ"

  componentDidMount() {
    document.title = "Как оформить заказ"
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <main
        style={{ paddingBottom: "70px", fontSize: "14px", paddingTop: "20px" }}
      >
        <h1>Как оформить заказ</h1>
        <p>Доступны несколько способов:</p>
        <ul>
          {/*
          <li>По номерам телефонов {PHONE_NUMBERS.MEBEL.join(", ")} (отдел мебели) или {PHONE_NUMBERS.ELECTRONICS.join(", ")} (отдел электроники)</li>
          */}
          <li>Через кнопку "В корзину"</li>
          <li>Через кнопку "Купить в 1 клик"</li>
          <li>
            Отправив нам сообщение на e-mail{" "}
            <a href="mailto:info@yoursite.ru">info@yoursite.ru</a>
          </li>
          <li>
            Позвонить по телефонам{" "}
            <strong>{PHONE_NUMBERS.ELECTRONICS.join(" или ")}</strong>
          </li>
          <li>Заказать обратный звонок</li>
          <li>Заказать менеджеру в чат</li>
        </ul>
      </main>
    )
  }

  shouldComponentUpdate() {
    return false
  }
}
