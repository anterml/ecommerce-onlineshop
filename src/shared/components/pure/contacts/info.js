import React from "react"
import styled from "styled-components"

const data = []

const Info = ({ rootImageUrl, showImage }) => (
  <Block>
    {data.map(
      ({ name, engName, locality, streetAddress, phoneExtra, howGo }) => (
        <Item
          itemScope
          itemProp="https://schema.org/Store"
          key={name}
        >
          <Data>
            <Header itemProp="name">yoursite в {name}</Header>
            <div
              itemProp="address"
              itemScope
              itemType="http://schema.org/PostalAddress"
            >
              <Title>Адрес:</Title>
              <span itemProp="addressLocality">{locality}</span>,
              <Span itemProp="streetAddress">{streetAddress}</Span>
            </div>
            {/*
          <div>
            <Title>Телефон:</Title>
            <span itemProp="telephone" content={PHONE_NUMBERS.MEBEL[0].replace(/[^\d\+]+/g, "")}>
              {PHONE_NUMBERS.MEBEL[0]}
            </span>
            <Span>добавочный {phoneExtra}</Span>
          </div>
          */}
            <div>
              <Title>Режим работы:</Title>
              <span
                itemProp="openingHours"
                content="Mo,Tu,We,Th,Fr,Sa,Su 11:00-21:00"
              >
                ежедневно с 11:00 до 21:00
              </span>
            </div>
            <div>
              <Title>Как добраться:</Title>
              {howGo.map((value, i) =>
                i === 0 ? (
                  <span key={i}>{value}</span>
                ) : (
                  <div key={i}>{value}</div>
                ),
              )}
            </div>
          </Data>

          <ImageWrap
            onClick={showImage}
            data-image={engName + "-map"}
          >
            <Img
              src={`${rootImageUrl}/contacts/${engName}-map.jpg`}
              alt={"Местонахождение " + name}
              title={"Местонахождение " + name}
            />
          </ImageWrap>

          <ImageWrap
            onClick={showImage}
            data-image={engName + "-scheme"}
          >
            <Img
              src={`${rootImageUrl}/contacts/${engName}-scheme.jpg`}
              alt={"Местонахождение " + name}
              title={"Местонахождение " + name}
            />
          </ImageWrap>
        </Item>
      ),
    )}
  </Block>
)

export default Info

const Block = styled.div`
  color: #555;
`

const Header = styled.h2`
  color: #b30202;
`

const ImageWrap = styled.div`
  cursor: pointer;
  @media (min-width: 1024px) {
    width: 33%;
  }

  @media (max-width: 1023px) {
    border: 3px solid #333;
  }
`

const Item = styled.section`
  margin-bottom: 50px;
  @media (max-width: 1023px) {
    & > * {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    padding: 20px;
    border: 1px solid #b30202;
    border-radius: 3px;
  }
`

const Img = styled.img`
  width: 100%;
  height: auto;
`

const Data = styled.div`
  @media (min-width: 1024px) {
    width: 33%;
    padding: 0 30px 0 10px;
  }

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Title = styled.span`
  margin-right: 4px;
  font-weight: 500;
  color: #333;
`

const Span = styled.span`
  margin-left: 4px;
`
