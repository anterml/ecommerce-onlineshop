import React from "react"
import styled from "styled-components"
import { PHONE_NUMBERS } from "utils/data/phone-numbers"

const requisiteDataOT = []

const Requisite = () => (
  <Block>
    <Section>
      <Title>Телефоны</Title>
      {PHONE_NUMBERS.ELECTRONICS.map((number, i) => (
        <PhoneNumber key={i}>{number}</PhoneNumber>
      ))}
    </Section>

    <Section>
      <Title>Email</Title>
      <EmailLink href="mailto:info@yoursite.ru">info@yoursite.ru</EmailLink>
    </Section>

    <Section>
      <Title>Реквизиты: онлайн торговля</Title>
      <Wrap>
        {requisiteDataOT.map(([name, value]) => (
          <Item key={name}>
            <Name>{name}</Name>
            {value}
          </Item>
        ))}
      </Wrap>
    </Section>
  </Block>
)

export default Requisite

const Block = styled.div`
  font-size: 15px;

  @media (min-width: 768px) {
    font-size: 17px;
    margin-top: 50px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`

const Section = styled.section`
  margin-top: 50px;
`

const Wrap = styled.div`
  display: inline-block;
`

const Title = styled.h2`
  font-weight: 600;
  margin: 0 0 10px;
  font-size: inherit;

  @media (min-width: 768px) {
    margin: 0 0 25px;
  }
`

const Item = styled.div`
  padding: 0 0 8px;

  @media (min-width: 768px) {
    padding: 25px 0;
    border-bottom: 1px solid #ddd;
  }

  display: flex;
  justify-content: flex-start;
  flex: 1 1 auto;
`

const Name = styled.div`
  width: 100px;
  @media (min-width: 768px) {
    width: 170px;
  }
  text-align: left;
  color: #999;
`

const PhoneNumber = styled.div`
  margin-bottom: 10px;
`
const EmailLink = styled.a`
  color: #333;
  &:hover {
    color: #b30202;
  }
`
