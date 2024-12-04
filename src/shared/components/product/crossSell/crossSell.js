import React, { Component } from "react"
import styled from "styled-components"
import requestWithCancel from "utils/request-with-cancel"
import Link from "react-router-dom/Link"

const rootImageUrl = "shop/category/"

export default class CrossSell extends Component {
  state = {
    status: null,
    products: [],
  }

  componentDidMount() {
    this.requests = []
    this.load()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.category !== prevProps.category &&
      this.state.status !== "pending"
    )
      this.load()
  }

  componentWillUnmount() {
    this.requests.forEach(request => request.cancel())
  }

  load() {
    this.setState(() => ({ status: "pending" }))

    const params = {
      url: `product/cross-sell/${this.props.category}?limit=6`,
    }

    const request = requestWithCancel(params, true)
    request.promise.then(
      products => {
        this.setState(() => ({
          status: "fulfilled",
          products,
        }))
      },
      error => {
        if (!error.isCanceled) {
          this.setState(() => ({
            status: "rejected",
          }))
        } else {
          console.log("request canceled")
        }
      },
    )

    this.requests.push(request)
  }

  render() {
    const { urlName, category } = this.props
    const { status, products } = this.state

    if (!status || status === "pending") return null

    const department = category === "sp_phone" ? "electronics" : "furniture"
    const imagePath = `${rootImageUrl + department}/${category}`
    const linkPath = category === "sp_phone" ? "electronics" : "mebel"

    const elems = products
      .filter(product => product.base.urlName !== urlName)
      .map((product, i) => {
        const { name, kind, price, imageFolder, urlName } = product.base
        const url = `${imagePath}/${imageFolder}/1.jpg`

        return (
          <Item
            key={product._id}
            onClick={this.scrollTop}
          >
            <Link to={`/${linkPath}/${category}/${urlName}`}>
              <Image
                data-image={url}
                style={{ backgroundImage: `url(${url})` }}
              />
              <Info>
                <Price>{price} руб.</Price>
                <Kind>
                  {kind} {name}
                </Kind>
              </Info>
            </Link>
          </Item>
        )
      })

    return (
      <Block>
        <Title>Похожие товары</Title>
        <Products>{elems}</Products>
      </Block>
    )
  }

  scrollTop = e => {
    window.scrollTo(0, 106)
  }
}

const Block = styled.div`
  background: white;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 1023px) {
    overflow-x: auto;
    border-top: 1px solid #ddd;
    padding-top: 20px;
    margin-top: 40px;
  }
`

const Title = styled.div`
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;
  margin: 0 0 20px;
`

const Products = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow-x: hidden;

  @media (max-width: 1281px) {
    overflow-x: auto;
  }
`

const Item = styled.div`
  margin-bottom: 25px;
  padding: 20px;
  width: 20%;
  min-width: 20%;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: center;

  @media (max-width: 1281px) {
    flex: 0 0 256px;
  }

  &:hover {
    border-color: #bbb;
  }
`

const Image = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 200px;
`

const Kind = styled.span`
  font-weight: 300;
  color: #353535;
  line-height: 19px;
  margin-bottom: 10px;
`

const Price = styled.div`
  font-size: 16px;
  color: #333;
  margin-top: 10px;
  margin-bottom: 10px;
`

const Info = styled.div`
  padding: 10px 15px;
`
