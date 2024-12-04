import React, { Component, Fragment } from "react"
import styled from "styled-components"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as Actions from "./status/actions"
import * as BaseActions from "./base/actions"
import * as SettingsActions from "./settings/actions"
import * as GeneralActions from "./general/actions"
import * as SeoActions from "./seo/actions"
import * as ImageActions from "./images/actions"
import { AttrActions, SAttrActions } from "./attrs/actions"

import request from "utils/request-with-cancel"

import * as VarGroupActions from "./vars/groups/actions"
import * as VarConfigurationActions from "./vars/configurations/actions"
import * as VarSettingActions from "./vars/settings/actions"

import Header from "./header/header"
import Nav from "./nav/nav"
import Base from "./base/base"
import Settings from "./settings/settings"
import Seo from "./seo/seo"
import General from "./general/general"
import Authors from "./authors/authors"
import Section from "./sections/sections"
import Attrs from "./attrs/container"
import Vars from "./vars/vars"
import Images from "./images/images"
import KuhnyaTemplateControl from "./dynamic/kuhnya/controls/template"
import Parts from "./dynamic/kuhnya/parts/parts"
import Tiu from "./tiu/tiu"
import Spinner from "globalComponents/spinners/circle"

class Product extends Component {
  state = {
    internalData: null,
  }

  componentDidMount() {
    this.requests = []
    const { urlName } = this.props.match.params
    if (urlName !== "empty") this.loadProduct(urlName)

    this.getInternalData()
  }

  componentDidUpdate(prevProps) {
    const { urlName } = this.props.match.params
    if (urlName !== "empty" && prevProps.match.params.urlName !== urlName) {
      this.loadProduct(urlName)
    }
  }

  componentWillUnmount() {
    this.requests.map(req => req.cancel())
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    const req = request(params, true)

    req.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(error),
    )

    this.requests.push(req)
  }

  getInternalData() {
    this.asyncRequest(
      { url: "admin/catalog/product-internal-data" },
      internalData => {
        this.setState(_ => ({ internalData }))
      },
      () => console.log("Failed to load internalData"),
    )
  }

  async loadProduct(urlName) {
    const { actions } = this.props
    try {
      await actions.product.fetch(urlName)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { history, location, query, product, status, actions, auth } =
      this.props
    const { internalData } = this.state

    if (!product) return <div>Выберите продукт</div>

    if (status.value === "pending") return <Spinner />

    if (status.value === "404") return <Empty>Продукт не найден</Empty>

    if (status.value !== "fulfilled")
      return <Empty>Выберите продукт слева в списке</Empty>

    const { base, vars, general, images, settings, seo } = product
    const { category, sections } = general
    const productId = general._id
    const tab = query.pt || "base"

    return (
      <Block>
        <Header
          {...{ product, auth, status, query, history, location, actions }}
        />
        <Nav {...{ history, location, query, tab, auth, category }} />
        <Content>
          {tab === "base" && (
            <Fragment>
              <Authors general={general} />
              <Section
                {...{ sections, productId, category }}
                actions={actions.general}
              />
              <Base
                {...{ base, productId, category }}
                actions={actions.base}
              />
              <Settings
                settings={settings}
                actions={actions.settings}
                internalData={internalData}
              />
              {category === "kuhnya" && <KuhnyaTemplateControl />}
              <General
                general={general}
                actions={actions.general}
              />
            </Fragment>
          )}

          {(tab === "attrs" || tab === "sattrs") && (
            <Attrs {...{ category, product, productId, actions, tab }} />
          )}

          {tab === "vars" && (
            <Vars
              {...{ query, location, history, productId, vars, category, auth }}
              actions={actions.vars}
            />
          )}

          {tab === "seo" && (
            <Seo
              {...{ seo, internalData, general }}
              actions={actions.seo}
            />
          )}

          {tab === "images" && (
            <Images
              images={images}
              category={category}
              actions={actions.images}
              imageFolder={base.imageFolder}
            />
          )}

          {tab === "parts" && (
            <Parts
              {...{ query, location, history, productId, vars, category }}
            />
          )}

          {tab === "tiu" && auth && auth.accessList.includes("tiu") && (
            <Tiu
              {...{ vars, base, general }}
              actions={actions.general}
            />
          )}
        </Content>
      </Block>
    )
  }
}

export default connect(
  state => ({
    product: state.admin.catalog.product.value,
    status: state.admin.catalog.product.status,
    auth: state.auth,
  }),
  dispatch => ({
    actions: {
      product: bindActionCreators(Actions, dispatch),
      base: bindActionCreators(BaseActions, dispatch),
      settings: bindActionCreators(SettingsActions, dispatch),
      general: bindActionCreators(GeneralActions, dispatch),
      seo: bindActionCreators(SeoActions, dispatch),
      images: bindActionCreators(ImageActions, dispatch),
      attrs: bindActionCreators(AttrActions, dispatch),
      sattrs: bindActionCreators(SAttrActions, dispatch),
      vars: {
        groups: bindActionCreators(VarGroupActions, dispatch),
        configurations: bindActionCreators(VarConfigurationActions, dispatch),
        settings: bindActionCreators(VarSettingActions, dispatch),
      },
    },
  }),
)(Product)

const Block = styled.div`
  flex: 1 1 auto;
  margin-bottom: 500px;
  padding: 0 15px;
`

const Content = styled.div`
  margin-top: 20px;
`

const Empty = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 100px;
  font-weight: 300;
  color: #b5b5b5;
`
