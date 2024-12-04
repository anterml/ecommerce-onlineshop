import React, { Component, Fragment } from "react"
import Link from "react-router-dom/Link"
import Spinner from "globalComponents/spinners/inline"
import styled from "styled-components"

export default class PopupOrder extends Component {
  render() {
    const { code, close, status } = this.props

    return (
      <Block>
        <Overlay onClick={close} />
        <Content>
          {status !== "pending" && <CloseButton onClick={close}>x</CloseButton>}
          {status === "pending" && (
            <Pending>
              <SpinnerWrap>
                <Spinner borderWidth={3} />
              </SpinnerWrap>
              <Text>Оформление заказа</Text>
            </Pending>
          )}
          {status === "success" && (
            <Fragment>
              <Text>Ваш заказ оформлен и ожидает подтверждения.</Text>
              <Text>
                В ближайшее время с Вами свяжется менеджер, для уточнения
                деталей по заказу.
              </Text>

              <Number>
                Номер заказа: <span>{code}</span>
              </Number>
              <Text>Заказы обрабатываются с 11.00 до 21:00</Text>
              <Text>Спасибо за покупку</Text>
              <OrderLink to="/orders">
                Вы всегда можете отслеживать состояние вашего заказа
              </OrderLink>
            </Fragment>
          )}
          {status === "failure" && (
            <Failure>
              При оформлении заказа произошла ошибка.
              <br />
              <br />
              Пожалуйста, попробуйте ещё раз.
            </Failure>
          )}
        </Content>
      </Block>
    )
  }
}

const Block = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(201, 208, 212, 0.88);
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  background-color: white;
  text-align: center;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.41);
  padding: 30px 50px;
`

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 17px;
  font-size: 31px;
  color: #aaa;
  transform: scaleY(0.7);
  cursor: pointer;

  &:hover {
    color: #777;
  }
`

const Pending = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 26px;
`

const SpinnerWrap = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
`

const Text = styled.div`
  font-size: 15px;
  margin-left: 20px;
  margin-bottom: 2px;
`

const Number = styled.div`
  padding: 10px 20px;
  margin: 20px 0;
  color: #888;
  display: inline-block;
  font-size: 20px;

  & span {
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    margin-left: 10px;
    line-height: 41px;
  }
`

const OrderLink = styled(Link)`
  user-select: none;
  cursor: pointer;
  color: #0670eb;
  display: block;
  display: none;
`

const Failure = styled.div`
  font-size: 20px;
  line-height: 26px;
  max-width: 350px;
  color: #b30202;
  font-weight: 300;
`
