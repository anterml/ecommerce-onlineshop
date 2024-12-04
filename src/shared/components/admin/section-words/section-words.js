import React, { Component, Fragment } from "react"
import styled from "styled-components"
import request from "utils/request-with-cancel"
import translite from "utils/translite"
import Creating from "./creating"
import { Button } from "globalComponents/admin/buttons"
const url = "admin/section-words"

export default class SectionWords extends Component {
  static title = "Ключевые слова для посадочных страниц"

  state = {
    status: null,
    maxIndex: 1,
    values: [],
  }

  componentDidMount() {
    document.title = this.constructor.title
    this.requests = []
    this.load()
  }

  componentWillUnmount() {
    this.requests.map(request => request.cancel())
  }

  load = e => {
    this.setState(_ => ({ status: "pending" }))
    this.asyncRequest(
      { url },
      values => {
        this.setState(state => ({ values, status: null }))
      },
      () => {
        this.setState(state => ({ status: "rejected" }))
      },
    )
  }

  asyncRequest(params, success, failure, cancel = () => {}) {
    this.request = request(params, true)

    this.request.promise.then(success, error =>
      error.isCanceled ? cancel() : failure(error),
    )

    this.requests.push(this.request)
  }

  render() {
    const { values, creating, maxIndex } = this.state
    return (
      <Block>
        <Controls>
          {creating ? (
            <Creating
              cancel={this.cancelCreating}
              create={this.create}
              maxIndex={maxIndex}
            />
          ) : (
            <Button onClick={this.startCreating}>+</Button>
          )}
        </Controls>
        <List>
          {Object.keys(values).map(index => (
            <Fragment key={index}>
              <span>{index}</span>
              <span>{values[index]}</span>
              <span>{translite(values[index])}</span>
            </Fragment>
          ))}
        </List>
      </Block>
    )
  }

  create = value => {
    const { maxIndex } = this.state

    this.setState(state => ({
      values: {
        ...state.values,
        [maxIndex]: value,
      },
      creating: null,
    }))

    this.asyncRequest(
      {
        url,
        method: "put",
        data: {
          index: maxIndex,
          value,
        },
      },
      () => {},
      () => {
        this.setState(state => {
          const values = { ...state.values }
          delete values[index]
        })
      },
    )
  }

  startCreating = e => {
    const maxIndex =
      Math.max.apply(
        null,
        Object.keys(this.state.values).map(v => Number(v)),
      ) || 0
    this.setState(_ => ({
      creating: true,
      maxIndex: maxIndex > 0 ? maxIndex + 1 : 1,
    }))
  }

  cancelCreating = e => {
    this.setState(_ => ({ creating: false }))
  }
}

const Block = styled.div`
  overflow-y: auto;
`

const List = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;

  & > span {
    padding: 6px 10px 6px 0;
    border-top: 1px solid #ddd;
  }
`

const Controls = styled.div`
  width: 500px;
  margin: 10px 0;
`
