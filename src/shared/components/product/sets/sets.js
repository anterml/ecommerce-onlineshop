import React, { Component } from "react"
import styled from "styled-components"
import requestWithCancel from "utils/request-with-cancel"
import LoadProducts from "./load-products"
import Slider from "./slider"

const INITIAL_STATE = {
  status: null,
  sets: null,
  index: null,
}

export default class SetItem extends Component {
  state = INITIAL_STATE

  componentDidMount() {
    this.requests = []
    this.load()
  }

  componentDidUpdate(prevProps) {
    if (this.props.urlName !== prevProps.urlName) {
      this.load()
    }
  }

  componentWillUnmount() {
    this.requests.forEach(request => request.cancel())
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    // Отмена предыдущего запроса
    if (this.request) {
      this.requests = this.requests.filter(request => request !== this.request)
      this.request.cancel()
    }

    this.request = requestWithCancel(params, true)

    this.request.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(),
    )

    this.requests.push(this.request)
  }

  load() {
    this.setState(state => ({
      ...INITIAL_STATE,
      status: "pending",
    }))

    this.asyncRequest(
      { url: `product/sets/${this.props.urlName}` },

      sets => {
        if (Array.isArray(sets) && sets.length) {
          const set = sets.find(set => set.products)
          this.setState(() => ({
            status: "fulfilled",
            sets,
            set,
          }))
        } else {
          this.setState(_ => ({ status: "fulfilled" }))
        }
      },

      () => {
        this.setState(() => ({
          status: "rejected",
        }))
      },
    )
  }

  upload = () => {
    const { index, sets } = this.state
    // игнорируем если уже подгружали данные
    const set = sets.find(set => set.kind === index)

    if (!set) return

    const { uploaded, productIds, products } = set

    if (uploaded) return

    const ids = productIds.filter(id => !products.find(p => p._id === id))

    const params = {
      url: `product/products/${ids.join(",")}`,
    }

    this.asyncRequest(params, result => {
      const newSet = {
        ...set,
        uploaded: true,
        products: s.products.concat(result || []),
      }
      this.setState(state => ({
        sets: state.sets.map(s => (s !== set ? s : newSet)),
        set: newSet,
      }))
    })
  }

  render() {
    const { status, sets, set } = this.state
    const kinds = ["Коллекция", "Комплект"]

    if (!sets || !set) return null

    const { products, productIds } = set

    return (
      <Block onClick={this.scrollTop}>
        {status === "pending" && <Overlay />}
        <Slider
          name="Набор"
          values={products}
          totalCount={productIds.length}
          upload={this.upload}
          urlName={this.props.urlName}
        ></Slider>
      </Block>
    )
  }

  scrollTop = e => {
    if (e.target.nodeName.toLowerCase() === "a") window.scrollTo(0, 106)
  }

  selectSet = e => {
    const kind = Number(e.target.dataset.kind)
    if (typeof kind === "number" && !Number.isNaN(kind)) {
      const set = this.state.sets.find(set => set.kind === kind)
      if (!set) return
      if (set.products) this.setState(_ => ({ set }))
      else {
        this.loadSet(set)
      }
    }
  }

  loadSet = set => {
    this.setState(_ => ({ status: "pending" }))
    const ids = set.productIds.slice(0, 6)
    const params = {
      url: `product/products/${ids.join(",")}`,
    }

    this.asyncRequest(
      params,
      products => {
        const newSet = { ...set, products }
        this.setState(state => ({
          status: "fulfilled",
          sets: state.sets.map(s => (s !== set ? s : newSet)),
          set: newSet,
        }))
      },
      () => this.setState(_ => ({ status: "rejected" })),
    )
  }
}

const Block = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 50px;
`

const Tabs = styled.div`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;

  @media (max-width: 767px) {
    text-align: center;
    margin: 20px 0 0;
  }

  span {
    margin-right: 15px;
    font-weight: 500;
    display: inline-block;

    &[data-active="false"] {
      cursor: pointer;
      text-decoration: underline;
      color: #337ab7;
      &:hover {
        color: #2c5571;
      }
    }
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(255, 255, 255, 0.79);
`
