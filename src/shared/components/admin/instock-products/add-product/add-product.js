import React, { PureComponent } from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import qs from "query-string"

export default class AddProduct extends PureComponent {
  state = {
    value: "",
  }

  render() {
    return (
      <Block>
        <Input
          onChange={this.addProduct}
          onKeyPress={this.addProduct}
          placeholder="Укажите код продукта или ссылку на продукт"
          value={this.state.value}
        />
      </Block>
    )
  }

  addProduct = ({ target, key }) => {
    if (key === "Enter") {
      let value = target.value.trim()
      if (value) {
        let [productCode, confCode] =
          value.indexOf("/") !== -1 ? parseUrl(value) : value.split("?pc=")

        this.props.add(productCode, confCode)
        this.setState({ value: "" })
      }
    } else {
      this.setState({ value: target.value })
    }
  }
}

function parseUrl(value) {
  const { url, query } = qs.parseUrl(value)
  const split = url.split("/")
  const urlName = split[split.length - 1]
  const confCode = query.pc
  const productCode = urlName.match(/[\d]+$/)[0]
  return [productCode, confCode]
}

const Block = styled.div`
  flex: 0;
  margin: 30px 0;
  input {
    width: 400px;
    margin: 0 auto;
  }
`
