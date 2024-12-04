import React, { Component, Fragment } from "react"
import qs from "query-string"
import { Button } from "globalComponents/admin/buttons"
import Popup from "./popup"

export default class Clone extends Component {
  state = {
    popup: false,
  }

  render() {
    const { product } = this.props
    return (
      <Fragment>
        <Button onClick={this.showPopup}>Клонировать</Button>
        {this.state.popup && (
          <Popup
            product={product}
            closePopup={this.closePopup}
            changeProductRoute={this.changeProductRoute}
          />
        )}
      </Fragment>
    )
  }

  closePopup = () => {
    this.setState(state => ({ popup: false }))
  }

  showPopup = () => {
    this.setState(state => ({ popup: true }))
  }

  changeProductRoute = urlName => {
    const { history, location, query } = this.props
    const search = qs.stringify(query)

    history.push({
      pathname: location.pathname.replace(/(\/product=)[^\/]+/, `$1${urlName}`),
      search,
    })
  }
}
