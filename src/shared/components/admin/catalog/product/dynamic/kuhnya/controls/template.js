import React, { Component } from "react"
import { connect } from "react-redux"
import { Title, Item } from "globalComponents/admin/elements"

class KuhnyaTemplateControl extends Component {
  render() {
    const { isTemplate, access } = this.props
    return (
      <Item>
        <Title>Шаблон</Title>
        <input
          type="checkbox"
          checked={isTemplate}
          disabled={!access}
          onChange={this.toggle}
        />
      </Item>
    )
  }

  toggle = e => {
    const { checked } = e.target
    this.props.dispatch({
      type: "admin/catalog/product/dynamic/toggle_template",
      value: checked,
    })
  }
}

export default connect(state => {
  const { isTemplate } = state.admin.catalog.product.value.dynamic
  return {
    isTemplate,
    access: state.auth.accessList.includes("#a-kuhnya-is-template"),
  }
})(KuhnyaTemplateControl)
