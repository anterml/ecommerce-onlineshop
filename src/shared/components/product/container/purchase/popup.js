import React, { Component } from "react"
import styled from "styled-components"
const rootImageUrl = "shop/category/"

export default class Popup extends Component {
  state = {
    count: 1,
    orderStatus: "",
  }

  render() {
    const { image, totalPrice, cart, product, close } = this.props
    const { kind, name, imageFolder } = product.base
    const department =
      product.category === "sp_phone" ? "electronics" : "furniture"
    const imageUrl = `${rootImageUrl + department}/${
      product.category
    }/${imageFolder}/${image || "1.jpg"}`

    const { count, orderStatus } = this.state
    const orderStatusText = this.getOrderStatus()
    const _price = prettyPrice(totalPrice)
    const _totalPrice = prettyPrice(totalPrice * count)

    return (
      <Block>
        <Overlay onClick={this.addToCart} />
        <Content>
          <Image>
            <img src={imageUrl} />
          </Image>

          <Details>
            <Title>
              Товар добавлен в корзину
              <CancelButton onClick={close}>отмена</CancelButton>
            </Title>
            <Name>
              {kind} {name}
            </Name>
            <PriceBlock>
              <Price>{_price} &#8381;</Price>
              <CountBlock>
                <CountButton onClick={this.decCount}>&minus;</CountButton>
                <Count>{count}</Count>
                <CountButton onClick={this.incCount}>+</CountButton>
              </CountBlock>
              <Price total>
                <strong>{_totalPrice}</strong> &#8381;
              </Price>
            </PriceBlock>
            <MakeOfferButton onClick={this.finishPurchase}>
              Оформить заказ
            </MakeOfferButton>
            <ContinueButton onClick={this.addToCart}>
              Продолжить покупки
            </ContinueButton>
          </Details>
        </Content>
      </Block>
    )
  }

  addToCart = e => {
    const { actions, product, image, configurationCode } = this.props
    actions.add(product, {
      image,
      configurationCode,
      count: this.state.count || 1,
    })
    this.props.close()
  }

  decCount = e => {
    if (this.state.count > 1)
      this.setState(state => ({ count: state.count - 1 }))
  }

  incCount = e => {
    this.setState(state => ({ count: state.count + 1 }))
  }

  finishPurchase = () => {
    this.addToCart()
    this.props.history.push("/cart")
  }

  getOrderStatus() {
    const { orderStatus } = this.state

    if (orderStatus === "pending") return "Отправка данных..."

    if (orderStatus === "ok") return "Заказ успешно отправлен. Спасибо."

    if (orderStatus === "rejected")
      return "Произошла ошибка при отправке заказа!"

    return ""
  }
}

function prettyPrice(price = 0) {
  return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
}

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(201, 208, 212, 0.88);
  z-index: 100000;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Content = styled.div`
  padding: 30px;
  background-color: white;
  box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.41);
  border-radius: 5px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  @media (min-width: 768px) {
    position: absolute;
    justify-content: space-between;
    flex-flow: row nowrap;
    margin-right: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Image = styled.div`
  @media (min-width: 768px) {
    margin-right: 20px;
  }

  & img {
    max-height: 300px;
    max-width: 300px;
  }
`

const Details = styled.div`
  width: 270px;
  align-self: flex-start;
  @media (max-width: 767px) {
    text-align: center;
    width: 100%;
  }
`

const Title = styled.div`
  font-size: 13px;
  margin-bottom: 30px;
  color: #999;
`

const CancelButton = styled.span`
  font-size: 12px;
  margin-left: 4px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #337ab7;
  }
`

const Name = styled.div`
  font-size: 19px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    margin-bottom: 10px;
  }
`

const PriceBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
`

const Price = styled.span`
  font-size: 16px;
  white-space: nowrap;
  color: ${props => (props.total ? "#333" : "#555")};
`

const CountBlock = styled.span`
  margin: 0 5px;
`

const CountButton = styled.span`
  color: #337ab7;
  cursor: pointer;
  display: inline-block;
  font-size: 25px;

  &:hover {
    color: #008ee3;
  }
`

const Count = styled.span`
  color: #777;
  margin: 0 15px;
`

const MakeOfferButton = styled.button`
  cursor: pointer;
  padding: 14px 20px;
  border-radius: 2px;
  width: 100%;
  border: 1px solid #135076;
  background-color: #00a0ff;
  background-image: url(shop/textures/1.png);
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 15px;
  color: white;

  &:hover {
    background-color: #008ee3;
  }
`

const ContinueButton = styled.div`
  color: #8a8a8a;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: underline;
  text-align: center;

  &:hover {
    color: #337ab7;
  }
`
