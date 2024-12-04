import React, { Component, Fragment } from "react"
import Instock from "./instock"
import Input from "./input"

export default class Secondary extends Component {
  render() {
    const { imageUrl, instock, article } = this.props.configuration
    return (
      <Fragment>
        <Instock
          instock={instock}
          change={this.change}
        />
        <Input
          name="imageUrl"
          placeholder="Картинка"
          value={imageUrl}
          change={this.change}
        />
        <Input
          name="article"
          placeholder="Артикул"
          value={article}
          change={this.change}
        />
      </Fragment>
    )
  }

  change = e => {
    const { name } = e.target.dataset

    if (name !== "instock" && (!e.key || e.key !== "Enter")) return

    let value =
      name === "instock" ? parseInt(e.target.value) : e.target.value.trim()

    if (value && name === "imageUrl") {
      let [v, ext] = value.split(".")

      if (!v.trim()) value = ""
      else if (!/^(jpg|jpeg|png)$/i.test(ext)) value += ".jpg"
    }

    e.target.value = ""
    this.props.actions.changeSecondaryField(
      this.props.configuration,
      name,
      value,
    )
  }
}
