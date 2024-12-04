import React from "react"
import styled from "styled-components"
import { PHONE_NUMBERS } from "utils/data/phone-numbers"
const data = [
  {
    name: "ТК «Мебельвуд»",
    engName: "mebelwood",
    locality: "Санкт-Петербург",
    streetAddress: "Дальневосточный проспект, д.14 А, 1 этаж, секция 135",
    phoneExtra: 703,
    howGo: [
      "М. Новочеркасская, остановка Заневский пр., троллейбус: 33, автобус: 191, маршрутки: К254, К269, К83, трамваи: 10,65",
      "М. Большевиков: трамваи 10, 27, 65",
      "М. Дыбенко: автобус 191 до ост. Нерчинская ул.",
    ],
  },

  {
    name: "МЦ «Мебель-Сити»",
    engName: "mebelcity",
    locality: "Санкт-Петербург",
    streetAddress: "ул. Мебельная, 1 этаж, секция 31",
    phoneExtra: 704,
    howGo: ["200 метров от метро Старая Деревня."],
  },

  {
    name: "МЦ «MebelHouse»",
    engName: "mebelhouse",
    locality: "Ленинградская область, п. Мурино",
    streetAddress: "Привокзальная площадь 3Б, 2 этаж, секция 213",
    phoneExtra: 705,
    howGo: ["300 метров от метро Девяткино."],
  },
]

const Info = ({ shopNames, hidePopup }) => (
  <Block>
    <Overlay onClick={hidePopup} />
    <Content>
      {data
        .filter(({ engName }) => shopNames.includes(engName))
        .map(({ name, locality, streetAddress, phoneExtra, howGo }) => (
          <Item key={name}>
            <Name>{name}</Name>
            <div>
              <div>
                {locality} {streetAddress}
              </div>
              <Phone>
                {PHONE_NUMBERS.MEBEL[0]} {phoneExtra}
              </Phone>
            </div>
          </Item>
        ))}
      <a
        href="/kontakty"
        target="_blank"
        onClick={hidePopup}
      >
        Подробнее
      </a>
    </Content>
  </Block>
)

export default Info

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: 15px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 15px;
  }
`

const Name = styled.div`
  color: #b30202;
  font-size: 17px;
  margin-bottom: 5px;
`

const Phone = styled.div`
  font-weight: 500;
`

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
`

const Content = styled.div`
  position: absolute;
  top: 15px;
  background: #fff;
  padding: 15px 30px 20px;
  box-shadow: 0 0 2px 2px #aaa;
  border-radius: 2px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;

  a {
    color: #3b7ba7;
    text-decoration: underline;

    &:hover {
      color: #2c5571;
    }
  }

  @media (max-width: 425px) {
    font-size: 13px;
  }

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    left: 25px;
    right: 25px;
  }

  @media (min-width: 1200px) {
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
`
