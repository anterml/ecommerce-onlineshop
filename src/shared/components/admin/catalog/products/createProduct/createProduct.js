import React, { Component, Fragment } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"

import translite from "utils/translite"
import KINDS from "utils/data/kinds"

export default class CreateProduct extends Component {
  state = {
    status: "",
    show: false,
    value: "",
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  render() {
    const { show, value, status } = this.state
    const { category } = this.props

    return (
      <Fragment>
        <Block onClick={this.showPopup}>
          <ShowPopupButton>+</ShowPopupButton>
        </Block>
        <Popup show={show}>
          {category === "all" ? (
            <div>Прежде чем создать продукт перейдите в нужную категорию</div>
          ) : (
            <Input
              placeholder="Название"
              innerRef={this.input}
              value={value}
              onChange={this.change}
              onKeyPress={this.create}
            />
          )}
          <CloseButton onClick={this.closePopup}>Закрыть</CloseButton>
        </Popup>
        <Popup show={status}>
          {status === "pending" && (
            <StatusText pending>Идет создание продукта</StatusText>
          )}
          {status === "error" && (
            <StatusText error>Не получилось создать продукт</StatusText>
          )}
          {status === "success" && (
            <StatusText success>Продукт успешно создан</StatusText>
          )}
          {(status === "error" || status === "success") && (
            <CloseButton onClick={this.closePopup}>Закрыть</CloseButton>
          )}
        </Popup>
      </Fragment>
    )
  }

  showPopup = () => {
    this.setState(
      () => ({ show: true }),
      () => {
        if (this.props.category !== "all") this.input.current.focus()
      },
    )
  }

  closePopup = () => {
    clearInterval(this.successMsgTimeout)
    this.setState(() => ({ show: false, status: "", value: "" }))
  }

  change = e => {
    this.setState({ value: e.target.value })
  }

  create = e => {
    const name = this.state.value.trim()
    if (e.key !== "Enter" || !name) return

    this.finish(name)
  }

  async finish(name) {
    this.setState({ status: "pending", show: false })
    clearInterval(this.successMsgTimeout)

    const { category, changeProductRoute, prependNewProduct } = this.props
    const kind = KINDS[category]

    let urlName = ""
    if (category === "sp_phone") {
      urlName = "sp_phone-" + translite(name)
    } else if (category === "kuhnya") {
      urlName = category + "-" + translite(name)
    } else {
      urlName = translite(kind + "-" + name)
    }

    const product = {
      category,
      base: {
        name,
        urlName,
        imageFolder: urlName,
        kind,
      },
      sattrs: [{ name: "Гарантия", value: 12 }],
    }

    if (category === "kuhnya") {
      product.dynamic = {
        parts: [],
      }
    }

    if (["detskaya_krovat", "krovat_cherdak"].indexOf(category) !== -1) {
      product.attrs = [
        {
          name: "Тип",
          value: kind,
        },
      ]
      product.category = "detskaya_krovat"
    }

    try {
      // получить код продукта
      const { counter } = await asyncRequest({
        url: "admin/catalog/get-unique-productCode",
      })

      // проверка на валидность кода продукта
      if (typeof counter !== "number" || Number.isNaN(counter)) {
        console.log("Не удалось получить уникальный код продукта")
        return this.setState({ status: "error" })
      }

      // дополнительная подготовка данных продукта
      product.base.productCode = counter
      product.base.imageFolder += "-" + counter
      product.base.urlName += "-" + counter

      // создание продукта
      const result = await asyncRequest({
        url: "admin/catalog/product",
        method: "post",
        data: product,
      })

      this.setState({ status: "success" })
      this.successMsgTimeout = setTimeout(() => {
        this.setState({ status: "", value: "" })
      }, 3000)
      changeProductRoute(product.base.urlName)
      // препенд созданого продукта в список каталога
      prependNewProduct(result)
    } catch (error) {
      console.log(error)
      this.setState({ status: "error" })
    }
  }

  componentWillUnmount() {
    clearInterval(this.successMsgTimeout)
  }
}

const Popup = styled.div`
  position: absolute;
  display: ${props => (props.show ? "flex" : "none")};
  left: 0;
  right: 0;
  align-items: center;
  padding: 10px 15px;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.41);
`

const StatusText = styled.div`
  text-align: center;
  flex: 1;
  padding: 8px 0;
  cursor: default;
  color: ${props =>
    props.success ? "green" : props.error ? "#b30202" : "#333"};
`

const Input = styled.input`
  display: block;
  padding: 8px 10px;
  border-radius: 2px;
  border: 1px solid #ccc;
  flex: 1 1 auto;
  width: 0;
`

const CloseButton = styled.span`
  display: inline-block;
  margin-left: 15px;
  color: #007dd0;
  cursor: pointer;
  &:hover {
    color: #115892;
  }
`

const Block = styled.div`
  display: flex;
  align-self: stretch;
  background-color: #007dd0;
  padding: 0 15px;
  margin-right: 2px;
  cursor: pointer;
  &:hover {
    background-color: #115892;
  }
`

const ShowPopupButton = styled.div`
  font-size: 30px;
  font-weight: 600;
  align-self: center;
  color: white;
`
