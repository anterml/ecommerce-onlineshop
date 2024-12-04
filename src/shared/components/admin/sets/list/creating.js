import React, { PureComponent } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import { Select } from "globalComponents/admin/elements"
import { Button } from "globalComponents/admin/buttons"
import setkinds from "utils/admin/data/set-kinds"

export default class Creating extends PureComponent {
  state = {
    status: false,
    kind: 0,
    value: "",
  }

  render() {
    const { status, kind } = this.state

    return (
      <Block>
        {status === "pending" && <Text>Идет создание набора...</Text>}
        {status === "rejected" && (
          <Wrap>
            <Text error>Не получилось создать набор!</Text>
            <ClearButton onClick={this.clear}>Закрыть</ClearButton>
          </Wrap>
        )}
        {!status && (
          <Wrap>
            <input
              placeholder="Название"
              onChange={this.change}
              onKeyPress={this.create}
            />
            <Select
              value={kind}
              onChange={this.changeKind}
            >
              <option value="0">{setkinds[0]}</option>
              <option value="1">{setkinds[1]}</option>
            </Select>
            <Button onClick={this.create}>Создать</Button>
          </Wrap>
        )}
      </Block>
    )
  }

  change = e => {
    this.setState({ value: e.target.value })
  }

  changeKind = e => {
    this.setState({ kind: Number(e.target.value) })
  }

  clear = e => {
    this.setState(state => ({ status: false }))
  }

  create = e => {
    if (e.key && e.key !== "Enter") return

    const name = this.state.value.trim()

    if (!name) return

    this.setState(state => ({ status: "pending" }))

    const params = {
      url: "admin/sets/set",
      method: "post",
      data: {
        name,
        kind: this.state.kind || 0,
      },
    }

    asyncRequest(params).then(
      set => {
        this.setState(state => ({ status: false, value: "" }))
        this.props.append(set)
        this.props.changeRoute("id", set._id)
      },
      () => this.setState(state => ({ status: "rejected" })),
    )
  }
}

const Block = styled.div`
  position: relative;
  padding: 8px 15px;
  background: #ddd;

  input {
    padding: 8px 8px;
    border: 1px solid #ccc;
    width: 100%;
  }

  select {
    margin: 0 5px;
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
