import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"
import request from "utils/request-with-cancel"

import Creating from "./creating/creating"
import List from "./list/list"
import Template from "./template/template"
import Spinner from "globalComponents/spinners/circle"

export default class DescriptionTemplates extends Component {
  state = {
    status: "pending",
    values: [],
  }

  componentDidMount() {
    this.requests = []
    this.load()
  }

  componentWillUnmount() {
    this.requests.map(request => request.cancel())
  }

  load() {
    this.setState(_ => ({ status: "pending" }))
    this.asyncRequest(
      { url: "admin/seo/seo-template/list" },
      values => {
        this.setState(_ => ({ values, status: "fulfilled" }))
      },
      () => this.setState(_ => ({ status: "rejected" })),
    )
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    const req = request(params, true)

    req.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(error),
    )

    this.requests.push(req)
  }

  render() {
    const { values, status } = this.state

    if (status === "pending") {
      return (
        <Block>
          <Spinner borderWidth="6" />
        </Block>
      )
    }

    if (status === "rejected") {
      return (
        <Block>
          <ErrorText>Не получилось загрузить страницу</ErrorText>
        </Block>
      )
    }

    const selectedId = qs.parse(this.props.location.search).id
    const value = values.find(value => value._id === selectedId)
    const { append, select, changeRoute, save, remove } = this

    return (
      <Block>
        <Creating {...{ changeRoute, append }} />
        <Layout>
          <List {...{ values, select, selectedId }} />
          <Template {...{ value, selectedId, save, remove }} />
        </Layout>
      </Block>
    )
  }

  remove = e => {
    const { id } = e.target.dataset
    const target = this.state.values.find(value => value._id === id)

    if (target && confirm("Удалить шаблон?")) {
      this.changeRoute("empty", id)
      this.setState(state => ({
        values: state.values.filter(value => value !== target),
      }))

      this.asyncRequest(
        {
          url: `admin/seo/seo-template/${id}`,
          method: "del",
        },
        () => {},
        () => {},
      )
    }
  }

  save = (id, name, value) => {
    this.setState(state => ({
      values: state.values.map(v =>
        v._id !== id ? v : { ...v, [name]: value },
      ),
    }))

    this.asyncRequest(
      {
        url: `admin/seo/seo-template/${id}`,
        method: "put",
        data: {
          "data.text": value,
        },
      },
      () => {},
      () => {},
    )
  }

  append = result => {
    this.setState(state => ({
      values: [result, ...state.values],
    }))
  }

  select = e => {
    const { id } = e.target.dataset
    if (id) this.changeRoute("id", id)
  }

  changeRoute = (name, value, method) => {
    const { location, history } = this.props
    let search

    if (name === "removedId" && value) search = { [name]: value }

    if (name === "id" && value) search = { id: value }

    // удаление продукта:
    // removeId => empty
    if (name === "empty") search = {}

    if (search) {
      history[method !== "replace" ? "push" : method]({
        pathname: location.pathname,
        search: qs.stringify(search),
      })
    }
  }
}

const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  overflow: hidden;
`

const Layout = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
  border: 2px solid #ddd;
  border-top: none;
  border-bottom: none;
`

const ErrorText = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 100px;
  font-weight: 300;
  color: #b30202;
`
