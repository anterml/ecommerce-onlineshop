import React, { Component, Fragment } from "react"
import Popup from "./popup"
import { Button } from "globalComponents/admin/buttons"

export default class Creating extends Component {
  state = {
    popup: false,
  }

  render() {
    return (
      <Fragment>
        <Button onClick={this.show}>Создать модуль</Button>
        {this.state.popup && (
          <Popup
            {...this.props}
            hidePopup={this.hide}
          />
        )}
      </Fragment>
    )
  }

  show = e => {
    this.setState({ popup: true })
  }

  hide = e => {
    this.setState({ popup: false })
  }
}
