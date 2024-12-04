import React, { Component } from "react"
import styled from "styled-components"
import NoIndex from "globalComponents/noindex"

export default class Map extends Component {
  state = {}

  componentDidMount() {
    this.handleWindowScroll()
  }

  handleWindowScroll() {
    const elem = document.getElementById("shop-map")

    if (!elem) return

    this.scrollWindow = () => {
      const { top } = elem.getBoundingClientRect()
      // если блок виден на экране,
      // тогда показываем содержимое и удаляем событие скрола
      if (top - window.innerHeight <= 0) {
        this.setState(() => ({
          src: "https://yandex.ru/map-widget/v1/",
        }))

        window.removeEventListener("scroll", this.scrollWindow)
      }
    }

    window.addEventListener("scroll", this.scrollWindow)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollWindow)
  }

  render() {
    return (
      <Block id="shop-map">
        <h2>Пункт самовывоза</h2>
        <NoIndex>
          <Wrap>
            {!this.state.src && <Text>Загрузка карты</Text>}
            <iframe
              {...this.state}
              width="100%"
              height="700"
              frameBorder="0"
              allowFullScreen={true}
            />
          </Wrap>
        </NoIndex>
      </Block>
    )
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.src !== this.state.src
  }
}

const Block = styled.div`
  margin-bottom: 30px;
  h2 {
    font-size: 22px;
    margin: 40px 0;
  }
`
const Wrap = styled.div`
  position: relative;
  height: 700px;
  box-shadow: 0 0 2px 1px #333;
  background-color: #ececec;
`

const Text = styled.span`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  color: #999;
`
