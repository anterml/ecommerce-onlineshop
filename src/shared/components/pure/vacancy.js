import React, { Component } from "react"
import styled from "styled-components"

export default class Vacancy extends Component {
  static title = "Вакансии"

  componentDidMount() {
    document.title = this.constructor.title
    window.scrollTo(0, 0)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  render() {
    return (
      <Block>
        <h1>Вакансии</h1>
        <section>
          <h2>Продавец-консультант мебели.</h2>
          <Price>От 50 000 руб. на руки</Price>
          <div>Требуемый опыт работы: 1–3 года.</div>
          <div>Полная занятость, сменный график.</div>

          <section>
            <h3>Обязанности:</h3>
            <ul>
              <li>Продажа мебели и предметов интерьера.</li>
              <li>
                Разработка дизайн-проекта кухонных гарнитуров, шкафов-купе,
                гардеробных, и другой корпусной мебели.
              </li>
              <li>Просчет стоимости изделия.</li>
              <li>
                Заключение договоров и сопровождение проекта на всех стадиях.
              </li>
            </ul>
          </section>

          <section>
            <h3>Требования:</h3>
            <p>
              Умение и желание продавать! Успешный опыт работы в продажах не
              менее 1 года, желательно в корпусной мебели, владение программами
              моделирования интерьера будет Вашим преимуществом.
            </p>
            <p>
              Стрессоустойчивость, коммуникабельность, нацеленность на
              результат.
            </p>
          </section>

          <section>
            <h3>Условия:</h3>
            <ul>
              <li>
                Сменный график по договоренности - 2/2, 3/3, индивидуальный.
              </li>
              <li>Зарплата: выход 1000р + 2%-5% с продаж.</li>
            </ul>
          </section>

          <p>
            <b>Место работы:</b>
          </p>
          <ul>
            <li>СПб, МЦ «МебельСити», ул. Мебельная</li>
            <li>СПб, МЦ «МебельХаус», Привокзальная площадь</li>
            <li>СПб, МЦ «МебельВуд», Дальневосточный пр</li>
          </ul>
        </section>
      </Block>
    )
  }
}

const Block = styled.main`
  font-size: 15px;

  h2 {
    margin: 0 0 11px;
    color: #3886ba;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  section {
    margin: 30px 0;
  }
`

const Price = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
`
