import React from "react"
import styled from "styled-components"

const DescriptionTips = () => (
  <Block>
    <ButtonHelp>?</ButtonHelp>
    <Content>
      <div>** - Жирный</div>
      <div>// - Курсив</div>
      <Title>Пример</Title>
      <Example>
        Кухонный стол **Боровичи**. Ножки в цвете //вишня// выполены из
        **//массива дерева//**.
      </Example>
      <Title>Результат</Title>
      <Example>
        Кухонный стол <strong>Боровичи</strong>. Ножки в цвете <em>вишня</em>{" "}
        выполены из{" "}
        <strong>
          <em>массива дерева</em>
        </strong>
        .
      </Example>
    </Content>
  </Block>
)

export default DescriptionTips

const Block = styled.div`
  position: relative;
  width: 100%;
`

const Content = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  color: rgba(0, 0, 0, 0.83);
  padding: 10px 15px;
  border-radius: 3px;
  left: 0;
  font-size: 13px;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 0 6px 2px #716b6b;
`

const ButtonHelp = styled.div`
  display: inline-block;
  border-radius: 50%;
  color: white;
  background: #7fb9e4;
  width: 18px;
  line-height: 18px;
  font-size: 13px;
  height: 18px;
  text-align: center;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;

  &:hover + ${Content} {
    display: block;
  }
`

const Title = styled.div`
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.43);
  margin-top: 18px;
`

const Example = styled.div`
  padding: 0px 15px;
  margin-top: 5px;
  border-left: 5px solid #b7d6ed;
`
