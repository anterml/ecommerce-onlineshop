import React, { Fragment } from "react"
import styled from "styled-components"

const Popup = ({ children, closePopup, title }) => (
  <Fragment>
    <Overlay onClick={closePopup} />
    <Block>
      <Header>
        <Title>{title}</Title>
        <CloseButton onClick={closePopup}>Закрыть</CloseButton>
      </Header>
      {children}
    </Block>
  </Fragment>
)

export default Popup

const CloseButton = styled.div`
  cursor: pointer;
  color: #0670eb;

  &:hover {
    color: red;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(233, 233, 233, 0.95);
  z-index: 50;
  overflow: auto;
`

const Block = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  z-index: 100;
  white-space: nowrap;
  padding: 0 30px 20px;
  box-shadow: 0 0 2px 2px #aaa;
  border-radius: 2px;

  & button,
  & select {
    padding: 5px 10px;
    color: #222;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  margin: 0 -30px;
  border-bottom: 1px solid #aaa;
`

const Title = styled.div`
  font-weight: 500;
  margin-right: 15px;
`
