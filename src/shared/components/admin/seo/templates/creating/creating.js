import React, { PureComponent, Fragment } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import { Button } from "globalComponents/admin/buttons"

export default class Creating extends PureComponent {
  state = {
    status: false,
    value: "",
  }

  render() {
    const { status, value } = this.state

    return (
      <Block>
        {status === "pending" && <Text>Идет создание шаблона...</Text>}
        {status === "rejected" && (
          <Wrap>
            <Text error>Не получилось создать шаблон!</Text>
            <ClearButton onClick={this.clear}>Закрыть</ClearButton>
          </Wrap>
        )}
        {!status && (
          <Fragment>
            <input
              placeholder="Название"
              name="value"
              value={value}
              onChange={this.change}
              onKeyPress={this.create}
            />
            <Button onClick={this.create}>Создать</Button>
          </Fragment>
        )}
      </Block>
    )
  }

  change = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  clear = e => {
    this.setState(state => ({ status: false }))
  }

  create = e => {
    if (e.key && e.key !== "Enter") return

    const { value } = this.state
    const name = value.trim()

    if (!name) return console.log("no name")

    this.setState(state => ({ status: "pending" }))

    const params = {
      url: "admin/seo/seo-template",
      method: "post",
      data: {
        name,
      },
    }

    asyncRequest(params).then(
      result => {
        this.setState(state => ({ status: false, value: "" }))
        this.props.append(result)
        this.props.changeRoute("id", result._id)
      },
      () => this.setState(state => ({ status: "rejected" })),
    )
  }
}

const Block = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 20px;
  background: #ddd;

  & > *:not(:last-child) {
    margin-right: 5px;
  }

  input {
    padding: 8px 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
`

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const Text = styled.div`
  padding: 8px;
  color: ${props => (props.error ? "#b30202" : "#777")};
`

const ClearButton = styled.span`
  color: blue;
  margin-left: 4px;
  color: #0670eb;
  cursor: pointer;
  align-self: center;
  &:hover {
    color: #0f56a9;
  }
`
