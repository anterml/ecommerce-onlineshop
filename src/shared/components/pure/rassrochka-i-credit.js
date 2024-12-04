import React, { Component } from "react"
import styled from "styled-components"
import { PHONE_NUMBERS } from "utils/data/phone-numbers"

const conditionData = [
  "Срок рассмотрения заявки 1-2 минуты;",
  "Досрочное погашение без ограничений",
  "Индивидуальная процентная ставка;",
  "Без первоначального взноса;",
  "Сумма кредита от 3000 до 200 000 рублей;",
  "Срок кредитования от 3 до 24 месяцев;",
]

const howToBuyData = [
  "Добавить товар в корзину",
  "В корзине ввести имя, телефон и при необходимости добавить комментарий «в рассрочку» или «в кредит»",
  "Нажать кнопку «Оформить заказ»",
  "В течение 5 минут вам перезвонит менеджер yoursite и подтвердит заказ, а также согласует передачу заказа кредитному специалисту.",
  "Далее с вами свяжется менеджер из банка и согласует детали кредитования и подберет подходящую вам программу.",
]

export default class CreditMebel extends Component {
  static title = "Рассрочка и кредит"

  componentDidMount() {
    document.title = this.constructor.title
    window.scrollTo(0, 0)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Block>
        <h1>Рассрочка и кредит</h1>
        <Section>
          <h2>Рассрочка</h2>
          Вы можете приобрести любой товар с рассрочкой от 1 до 6 месяцев. Без
          комиссии и переплат. Оформление онлайн. Проценты по рассрочке
          компенсирует Интернет-магазин, предоставляя скидку на покупку, в
          результате чего выплаченная сумма по кредиту не превышает
          первоначальную цену товара при надлежащем исполнении обязательств
          Покупателя перед Банком. Банк оставляет за собой право предоставить
          кредит Покупателю или отказать в предоставлении кредита.
        </Section>

        <Section>
          <h2>Специальный кредит - 5%</h2>
          Мы так же готовы предоставить нашим клиентам кредит на особых
          условиях. Срок - 1 год с переплатой всего 5%.
        </Section>

        <Section>
          <h2>Кредит</h2>
          Простой и удобный сервис для кредитования-онлайн. Для оформления
          кредита, потребуется паспорт гражданина РФ. Кредит доступен гражданам
          РФ от 18 до 70 лет.
        </Section>

        <Point
          title="Условия по кредитованию"
          data={conditionData}
        />
        <Point
          title="Оформление покупки"
          data={howToBuyData}
        />
        <p>
          Вы всегда можете обратиться к нам по телефону{" "}
          <strong>{PHONE_NUMBERS.ELECTRONICS.join(" или ")}</strong> или через
          форму обратной связи, наши специалисты подскажут всю информацию и
          помогут правильно оформить рассрочку или кредит на вашу покупку.
        </p>

        <StarText>
          <div>* - Финансовые услуги предоставляют:</div>
          <div>ОАО «Альфа-Банк» лицензия ЦБ РФ №1326 от 05.03.2012</div>
          <div>ООО «Хоум Кредит Банк» лицензия ЦБ РФ № 316 от 15.03.2012</div>
          <div>ООО «Русфинанс Банк» лицензия ЦБ РФ №1792 от 13.02.2013</div>
          <div>АО «Банк Русский Стандарт» лицензия ЦБ РФ №2289 от 19.11.14</div>
          <div>АО «Тинькофф Банк» лицензия ЦБ РФ №2673 от 24.03.15</div>
        </StarText>
      </Block>
    )
  }
}

const Point = ({ title, data }) => (
  <Section>
    <h2>{title}</h2>
    {data.map((text, i) => (
      <Item key={i}>
        <Index>{i + 1}</Index>
        <span>{text}</span>
      </Item>
    ))}
  </Section>
)

const Block = styled.main`
  min-height: 500px;
  margin-bottom: 70px;
  padding-top: 20px;
  font-size: 14px;

  h1 {
    margin-bottom: 50px;
  }

  h2 {
    font-weight: 500;
    color: #333;
    font-size: 18px;
    margin-bottom: 10px;
  }
`

const Section = styled.section`
  margin-bottom: 20px;
`

const Item = styled.div`
  margin-bottom: 5px;
`

const Index = styled.span`
  width: 24px;
  border-radius: 50%;
  border: 1px solid #81c138;
  margin-right: 8px;
  color: #7ab537;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 22px;
`

const StarText = styled.div`
  color: #888;
  font-size: 12px;

  & > div {
    line-height: 15px;
  }
`
