import React, { Component } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"
import Phones from "./phones"

const links = [
  { path: "/dostavka-i-oplata", name: "Доставка и оплата" },
  { path: "/kak-oformit-zakaz", name: "Как оформить заказ?" },
  { path: "/garantiya", name: "Гарантия" },
  { path: "/kontakty", name: "Контакты" },
  { path: "/vakansii", name: "Вакансии" },
  { path: "/aktsii/instruktsii-po-otzivam", name: "Акции" },
]

const rootUrl = "shop/stuff/footer/"

export default class Footer extends Component {
  render() {
    return (
      <Block>
        <Wrap className="container">
          <Item>
            <Title>Ссылки</Title>
            <Links>
              {links.map(({ path, name }) => (
                <StyledLink
                  to={path}
                  key={path}
                  rel="nofollow"
                >
                  {name}
                </StyledLink>
              ))}
            </Links>
          </Item>

          <Item>
            <Title>Наши группы</Title>
            <a
              href="https://vk.com/yoursitespb"
              title="Группа yoursite в инстаграме"
              target="_blank"
              rel="nofollow noopener"
            >
              <GroupButton data-name="vk" />
            </a>
            <a
              href="https://www.instagram.com/yoursite.ru/"
              title="Группа yoursite.ru вконтакте"
              target="_blank"
              rel="nofollow noopener"
            >
              <GroupButton data-name="instagram" />
            </a>
          </Item>

          <Item>
            <Title>Телефоны</Title>
            <Phones />
          </Item>
        </Wrap>
        <PersonalData className="container">
          <PersonalLink
            to="/politika-konfidentsialnosti-personalnoi-informatsii"
            rel="nofollow noopener"
          >
            Политика конфиденциальности персональной информации
          </PersonalLink>
          <PersonalLink
            to="/polzovatelskoe-soglashenie-ob-ispolzovanii-personalnih-dannih"
            rel="nofollow noopener"
          >
            Пользовательское соглашение об использовании персональных данных
          </PersonalLink>
        </PersonalData>
      </Block>
    )
  }

  shouldComponentUpdate() {
    return false
  }
}

const Block = styled.div`
  padding: 60px 0;
  margin-top: 30px;
  border-top: 1px solid #ddd;

  @media (max-width: 767px) {
    flex-flow: column nowrap;
    align-items: center;
    padding-bottom: 0;
    margin-top: 0;
    border: none;
  }
`

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 767px) {
    flex-flow: column nowrap;
    align-items: center;
  }
`

const Item = styled.div`
  text-align: center;

  @media (max-width: 767px) {
    margin-bottom: 50px;
  }

  @media (min-width: 768px) {
    margin-right: 20px;

    &:nth-of-type(1) {
      text-align: left;
    }

    &:nth-of-type(3) {
      text-align: right;
      margin: 0;
    }
  }
`

const Title = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #909090;
  font-weight: 300;
`

const Links = styled.div`
  display: inline-block;
  margin-right: 20px;
`

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 15px;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #23527c;
  }
`
const GroupButton = styled.div`
  width: 185px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.78);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 1);
  }

  &[data-name="vk"] {
    background-image: url(${rootUrl}vk.jpg);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #44678d;
    margin-bottom: 15px;
  }

  &[data-name="instagram"] {
    background-image: url(${rootUrl}instagram.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`

const PersonalData = styled.div`
  margin-top: 20px;
`

const PersonalLink = styled(Link)`
  color: #0670eb;
  display: block;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  &:hover {
    color: #0f56a9;
  }
`
