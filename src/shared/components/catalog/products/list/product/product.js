import React, { Component, Fragment } from "react"
import Link from "react-router-dom/Link"
import styled from "styled-components"

import Details from "./details"
import Price from "./price"
import Colors from "./colors"
import Images from "./images"

const rootImageUrl = "shop/category/"

export default class Product extends Component {
  state = {
    miniImage: "",
    miniImagePage: 0,
  }

  getDetails() {
    const { attrs } = this.props.product

    if (attrs === this.attrs) return this.details

    const details = {}

    attrs.forEach(attr => {
      if (!details[attr.name]) details[attr.name] = []

      details[attr.name].push(attr.value)
    })

    this.attrs = attrs
    this.details = details
    return this.details
  }

  toggleMiniImages = e => {
    const { image } = e.target.dataset

    if (!image) return

    if (this.state.miniImage !== image) this.setState({ miniImage: image })
  }

  leaveMiniImages = e => {
    this.setState({ miniImage: this.bimage })
  }

  leftMiniImages = e => {
    const miniImagePage = this.state.miniImagePage - 1
    if (miniImagePage >= 0) {
      this.setState({ miniImagePage })
    }
  }

  rightMiniImages = e => {
    const MAX_MINI_IMAGE_PAGE = Math.ceil(this.props.product.images.length / 4)
    const miniImagePage = this.state.miniImagePage + 1
    if (miniImagePage < MAX_MINI_IMAGE_PAGE) {
      this.miniImagePage += 1
      this.setState({ miniImagePage })
    }
  }

  render() {
    const { department, product, auth } = this.props
    const {
      _id,
      prettyPrice,
      vars,
      doneStatus,
      prettyOldPrice,
      base,
      category,
      colors,
      restColorCount,
    } = product
    const { name, urlName, kind, imageFolder, price } = base
    const departmentUrl = department === "mebel" ? "furniture" : "electronics"

    const productUrl = `/${department}/${category}/${urlName}`
    const adminProductUrl = `/admin/catalog=${category}/product=${urlName}?type=base`

    const imageUrlPrefix = `${
      rootImageUrl + departmentUrl
    }/${category}/${imageFolder}/ct/`
    const image =
      findImageUrl(vars.groups, vars.settings || {}, category, product) ||
      "1.jpg"
    const imageUrl = imageUrlPrefix + image
    if (!this.bimage) this.bimage = imageUrl

    const { miniImage, miniImagePage, hover } = this.state
    const mainImage = miniImage || imageUrl

    const fullName = kind + " " + name
    const details = this.getDetails()

    const linkProps = {
      to: auth.admin ? adminProductUrl : productUrl,
      title: fullName,
    }

    if (auth.admin) {
      linkProps.target = "_blank"
    }

    return (
      <Item
        onMouseEnter={this.hover}
        onMouseLeave={this.leave}
      >
        <ImageLink
          to={productUrl}
          title={fullName}
        >
          <img
            src={mainImage}
            alt={fullName}
          />
        </ImageLink>

        <Price
          price={price}
          actual={prettyPrice}
          old={prettyOldPrice}
        />

        <PriceInMonth>
          <span>От</span> {Math.floor(price / 24)} <span>руб/мес</span>
        </PriceInMonth>

        <NameLink {...linkProps}>{fullName}</NameLink>

        {Array.isArray(colors) && colors.length > 1 && (
          <Colors
            colors={colors}
            restColorCount={restColorCount}
          />
        )}

        {hover && (
          <Fragment>
            <Details
              values={details}
              hover={hover}
            />
            {product.images.length > 1 && (
              <Extra>
                <ExtraWrap>
                  {product.images.length > 1 && (
                    <Images
                      images={product.images}
                      imageUrl={imageUrlPrefix}
                      page={miniImagePage}
                      left={this.leftMiniImages}
                      right={this.rightMiniImages}
                      toggle={this.toggleMiniImages}
                      reset={this.leaveMiniImages}
                    />
                  )}
                </ExtraWrap>
              </Extra>
            )}
          </Fragment>
        )}

        {auth.admin && doneStatus !== 3 && (
          <DoneStatus data-status={doneStatus} />
        )}
      </Item>
    )
  }

  hover = e => {
    this.setState(state => ({ hover: true }))
  }

  leave = e => {
    this.setState(state => ({ hover: false }))
  }

  shouldComponentUpdate(nextProps, nextState) {
    const update =
      nextProps.product !== this.props.product ||
      nextState !== this.state ||
      nextProps.auth !== this.props.auth

    return update
  }
}

function findImageUrl(groups, { selectedFieldIds }, category) {
  let field = "Цвет каркаса"
  if (category === "zerkalo") field = "Цвет багета"

  let bodyColorVars = groups.filter(group => group.name === field)
  bodyColorVars =
    bodyColorVars && bodyColorVars.fields ? bodyColorVars.fields : []

  if (!bodyColorVars.length) return ""

  if (Array.isArray(selectedFieldIds) && selectedFieldIds.length) {
    for (let i = 0; i < bodyColorVars.length; ++i) {
      if (selectedFieldIds.indexOf(bodyColorVars[i]._id) !== -1)
        return bodyColorVars[i].imageUrl
    }
  } else {
    return bodyColorVars[0].imageUrl
  }
}

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 230px;
  @media (min-width: 768px) {
    width: 210px;
  }

  @media (min-width: 1024px) {
    width: 230px;
  }

  @media (min-width: 1340px) {
    width: 25%;
  }

  margin-bottom: 30px;
  border-radius: 2px;
  position: relative;
  padding: 0 20px 15px;
  border: 1px solid transparent;
  position: relative;
  text-align: left;
  cursor: pointer;
  &:hover {
    border: 1px solid #777;
  }
`

const ImageLink = styled(Link)`
  height: 250px;
  text-align: center;
  display: flex;
  align-items: center;

  & img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }
`

const NameLink = styled(Link)`
  margin: 10px 0 15px;
  color: #333;
  font-size: 13px;
  line-height: 17px;
  cursor: pointer;
  text-decoration: none;
`

const DoneStatus = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;

  &[data-status="0"] {
    background-color: #afb1b3;
  }

  &[data-status="4"] {
    background-color: #d200ff;
  }

  &[data-status="2"] {
    background-color: #e0a333;
  }

  &[data-status="5"] {
    background-color: #20f5e7;
  }

  &[data-status="1"] {
    background-color: rgba(190, 0, 0, 0.7);
  }

  &[data-status="6"] {
    background-color: #000;
  }

  &[data-status="7"] {
    background-color: #b5b47e;
  }
`

const PriceInMonth = styled.div`
  color: #888;
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  span {
    font-size: 11px;
  }
`

const Extra = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  z-index: 1;
`

const ExtraWrap = styled.div`
  position: absolute;
  top: 0;
  left: -21px;
  right: -21px;
  padding: 0 20px 20px;
  background-color: white;
  border: 1px solid #777;
  border-top: none;
  border-radius: 0 0 2px 2px;
`
