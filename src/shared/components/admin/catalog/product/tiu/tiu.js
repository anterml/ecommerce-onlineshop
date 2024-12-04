import React, { PureComponent, Fragment } from "react"
import styled from "styled-components"
import prepare from "./data"
import Link from "./link"
import ExportBlock from "./export"
const ROOT_URL = "https://www.yoursite.ru/api/v1/yml"

export default class Tiu extends PureComponent {
  state = {
    results: {},
    groupNames: [],
  }

  componentDidMount() {
    const { vars } = this.props
    if (Array.isArray(vars.groups) && vars.groups.length) {
      const results = prepare(vars)
      const keys = Object.keys(results)
      const groupNames = keys.length
        ? results[keys[0]].map(field => field.name)
        : []
      this.setState({ results, groupNames })
    }
  }

  clipBoard = e => {
    e.target.select()
    document.execCommand("copy")
  }

  render() {
    const { collaboration } = this.props.general
    const { urlName } = this.props.base
    const { results, groupNames } = this.state
    const { lastUpdate } = collaboration.find(c => c.name === "tiu") || {}

    if (!groupNames.length)
      return <Block>Еще не создано ниодного поля в вариациях</Block>

    return (
      <Block>
        <Links>
          <Link
            title="Обычная ссылка"
            url={`${ROOT_URL}/single/${urlName}`}
            click={this.clipBoard}
          />
          <Link
            title="Ссылка с разновидностями"
            url={`${ROOT_URL}/multi/${urlName}`}
            click={this.clipBoard}
          />
        </Links>

        <ExportBlock
          date={lastUpdate}
          update={this.updateDate}
        />
        <Content>
          <table>
            <thead>
              <tr>
                {groupNames.map(name => (
                  <th
                    colSpan="2"
                    key={name}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(results).map(confCode => (
                <tr key={confCode}>
                  {results[confCode].map(({ name, value, price }, k) => (
                    <Fragment key={k}>
                      <td>{value}</td>
                      <Price>{price || 0} руб</Price>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Block>
    )
  }

  updateDate = e => {
    let { collaboration } = this.props.general
    const tiu = collaboration.find(c => c.name === "tiu") || { name: "tiu" }
    tiu.lastUpdate = new Date().toISOString()

    collaboration = [...collaboration.filter(c => c.name !== "tiu"), tiu]

    this.props.actions.change("collaboration", collaboration)
  }
}

const Block = styled.div`
  table {
    border-collapse: collapse;
    text-align: left;
  }

  tbody tr {
    border: 1px dotted #ddd;
    border-right: none;
    border-left: none;
  }

  td,
  th {
    padding: 7px 10px;
  }

  th {
    background: #dddddd;
    font-weight: 500;
  }

  td:nth-of-type(2n) {
    border-right: 1px solid #ddd;
  }

  td:first-child {
    border-left: 1px solid #ddd;
  }
`

const Content = styled.div`
  overflow-x: auto;
  max-width: 100%;
  white-space: nowrap;
`

const Price = styled.td`
  font-weight: 300;
  color: green;
`

const Links = styled.div`
  margin-bottom: 50px;
`
