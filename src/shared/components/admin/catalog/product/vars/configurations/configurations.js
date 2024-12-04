import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { ObjectID } from "bson"

import List from "./list/list"
import View from "./view/view"
import Edit from "./edit/edit"

export default class Configurations extends Component {
  state = {
    selectedId: null,
  }

  render() {
    const { configurations, actions, groups } = this.props
    const configuration =
      configurations.find(c => c._id === this.state.selectedId) ||
      configurations[0]

    return (
      <Fragment>
        <List
          configurations={configurations}
          select={this.select}
          create={this.create}
          selected={configuration}
        />
        {configuration && (
          <Block>
            <LayoutConf>
              <View
                {...{ configuration, groups }}
                remove={this.remove}
              />
            </LayoutConf>
            <LayoutConf>
              <Edit {...{ configuration, groups, actions }} />
            </LayoutConf>
          </Block>
        )}
      </Fragment>
    )
  }

  select = e => {
    const { id } = e.currentTarget.dataset
    if (id) this.setState(state => ({ selectedId: id }))
  }

  remove = e => {
    const { id } = e.currentTarget.dataset
    const configuration = this.props.configurations.find(c => c._id === id)
    if (configuration && confirm("Удалить конфигурацию?"))
      this.props.actions.remove(configuration)
  }

  create = e => {
    const _id = new ObjectID().toString()

    this.props.actions.create({
      _id,
      fieldIds: [],
      instock: -2,
      skipFieldIds: [],
      includeFieldIds: [],
      skipGroupIds: [],
    })

    this.setState(state => ({ selectedId: _id }))
  }
}

const Block = styled.div`
  display: flex;
`

const LayoutConf = styled.div`
  flex: 1 250px;
  margin-bottom: 25px;
  &:first-child {
    border-right: 1px solid #ddd;
    margin-right: 20px;
    padding-right: 20px;
  }
`
