import React, { Component } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import { getFullDate } from "utils/date"

import Spinner from "globalComponents/spinners/inline"
import Values from "./values"
import Creating from "./creating"

const PAGE_LIMIT = 10

export default class List extends Component {
  state = {
    status: null,
    list: [],
    more: false,
  }

  componentDidMount() {
    if (!this.state.status) this.fetch()
  }

  componentDidUpdate() {
    const { removedId, changeRoute } = this.props

    if (removedId) {
      this.setState({
        list: this.state.list.filter(coll => coll._id !== removedId),
      })

      changeRoute("empty", null, "replace")
    }
  }

  async fetch(needAppend) {
    this.setState(state => ({ status: "pending" }))
    const skip = this.state.list.length

    try {
      let list = await asyncRequest({
        url: `admin/sets/list?limit=${PAGE_LIMIT}&skip=${skip}`,
      })

      const more = list.length > PAGE_LIMIT
      list = list.slice(0, PAGE_LIMIT).map(prepare)

      if (needAppend) list = this.state.list.concat(list)

      this.setState(state => ({
        status: "fulfilled",
        list,
        more,
      }))
    } catch (e) {
      this.setState(state => ({
        status: "rejected",
      }))
    }
  }

  render() {
    let { list, more, status } = this.state
    const { selectedId } = this.props
    const { select, append } = this

    return (
      <Block>
        <Creating
          append={append}
          changeRoute={this.props.changeRoute}
        />
        <Items>
          <ItemsWrap onClick={select}>
            <Values {...{ list, selectedId }} />
            <LoadingBlock>
              {more && status === "pending" && (
                <SpinnerWrap>
                  <Spinner borderWidth="6" />
                </SpinnerWrap>
              )}
              {more && status !== "pending" && (
                <LoadMoreButton onClick={this.loadMore}>
                  Подгрузить ещё
                </LoadMoreButton>
              )}
            </LoadingBlock>
          </ItemsWrap>
        </Items>
      </Block>
    )
  }

  loadMore = e => {
    this.fetch(true)
  }

  append = set => {
    this.setState(state => ({
      list: [prepare(set), ...state.list],
    }))
  }

  select = e => {
    const { id } = e.target.dataset
    if (id) this.props.changeRoute("id", id)
  }
}

function prepare(set) {
  set.created.date = getFullDate(set.created.date)
  return set
}

const ItemsWrap = styled.div`
  flex: 1 1 auto;
  overflow-y: scroll;
  padding-bottom: 150px;
`

const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 430px;
  border-left: 1px solid #ddd;
  overflow: hidden;
  border-right: 1px solid #555;
`

const Items = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 430px;
  min-height: 100%;
  border-left: 1px solid #ddd;
`

const LoadingBlock = styled.div`
  margin: 20px 0 150px;
  text-align: center;
`

const LoadMoreButton = styled.button`
  padding: 6px 15px;
`

const SpinnerWrap = styled.div`
  width: 48px;
  height: 48px;
  display: inline-block;
`
