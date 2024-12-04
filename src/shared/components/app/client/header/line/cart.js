import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Cart = () => (
  <Block
    to="/cart"
    rel="nofollow noopener"
  >
    <Icon />
    <Text>Корзина</Text>
  </Block>
)

export default Cart

const Block = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`

const Text = styled.span`
  cursor: pointer;
  color: rgba(255, 255, 255, 0.87);
  font-size: 14px;

  @media (max-width: 1023px) {
    display: none;
  }
`

const Icon = styled.span`
  display: inline-block;
  width: 23px;
  height: 19px;
  margin-right: 4px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMyAxOSI+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik00LjE5NiAySDBWMGg1LjU4OGwxLjY3NyA0LjUyNi0xLjg3Ni42OTV6Ii8+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNy40NCA1bDIuMjI4IDUuOTY5IDguNjg3LS44NjRMMjAuNDA5IDVINy40NHpNNiAzaDE1Ljg5YTEgMSAwIDAgMSAuOTI4IDEuMzczbC0yLjgzNCA3LjA0YTEgMSAwIDAgMS0uODI5LjYyMmwtMTAuMDU2IDFhMSAxIDAgMCAxLTEuMDM2LS42NDVsLTMtOC4wNEExIDEgMCAwIDEgNiAzeiIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUgMTUpIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMiIgcj0iMiIvPjwvZz48L2c+PC9zdmc+);
`
