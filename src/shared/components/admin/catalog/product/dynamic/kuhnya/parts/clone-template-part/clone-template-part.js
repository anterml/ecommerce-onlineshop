import React, { Fragment, Component } from "react"
import request from "utils/request-with-cancel"
import Popup from "./popup/popup"
import { Button } from "globalComponents/admin/buttons"
const url = "admin/catalog/kuhni-templates"

export default class CloneTemplatePart extends Component {
  state = {
    popup: false,
    products: {
      values: [],
      status: null,
    },
    templates: {
      values: [],
      status: null,
    },
    selectedPartId: null,
  }

  render() {
    const { popup, products, templates, selectedPartId } = this.state
    const { showPopup, closePopup, loadTemplates } = this
    const { clone, parts } = this.props
    return (
      <Fragment>
        <Button onClick={showPopup}>Добавить модули-шаблоны</Button>
        {popup && (
          <Popup
            {...{
              products,
              parts,
              templates,
              closePopup,
              loadTemplates,
              clone,
              selectedPartId,
            }}
          />
        )}
      </Fragment>
    )
  }

  componentWillUnmount() {
    if (typeof this.request === "function") {
      this.request.cancel()
    }
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    if (this.request) this.request.cancel()

    this.request = request(params, true)

    this.request.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(),
    )
  }

  loadProducts = () => {
    this.setState(state => ({
      products: {
        ...state.products,
        status: "pending",
      },
    }))

    return this.asyncRequest(
      { url },
      values => {
        this.setState(state => ({
          products: {
            status: "fulfilled",
            values,
          },
        }))
      },
      error => {
        this.setState(state => ({
          products: {
            ...state.products,
            status: "rejected",
            error: "Не получилось получить список кухонь-шаблонов",
          },
        }))
      },
    )
  }

  loadTemplates = id => {
    this.setState(state => ({
      templates: {
        ...state.templates,
        status: "pending",
      },
      selectedPartId: id,
    }))

    return this.asyncRequest(
      { url: `${url}/parts/${id}` },
      values => {
        this.setState(state => ({
          templates: {
            status: "fulfilled",
            ...values,
          },
        }))
      },
      error => {
        this.setState(state => ({
          templates: {
            ...state.templates,
            status: "rejected",
            error: "Не получилось загрузить шаблоны модулей",
          },
        }))
      },
    )
  }

  showPopup = e => {
    if (this.state.products.status !== "fulfilled") this.loadProducts()

    this.setState(state => ({ popup: true }))
  }

  closePopup = e => {
    this.setState(state => ({ popup: false }))
  }
}
