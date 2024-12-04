import React, { Component } from "react"
import styled from "styled-components"

import Group from "./group"
import Field from "./field"

export default class Groups extends Component {
  render() {
    const { groups, configuration } = this.props
    const { skipGroupIds } = configuration

    return groups.map(group => {
      const { fields, hideFields } = group

      let hideGroup = true

      const skip = (skipGroupIds || []).includes(group._id)

      const fieldElems = skip
        ? null
        : fields.map((field, i) => {
            const { name, value, price, _id } = field
            const status = this.getStatus(_id, hideFields)

            if (status && status !== 4) hideGroup = false

            return (
              <Field
                id={_id}
                value={value}
                status={status}
                price={price}
                toggle={this.toggleFieldStatus}
                key={_id}
              />
            )
          })

      return (
        <Block key={group._id}>
          <Group
            skip={skip}
            name={group.name}
            id={group._id}
            toggle={this.toggleGroupStatus}
          />
          {fieldElems}
        </Block>
      )
    })
  }

  getStatus(id, hideFields) {
    const { fieldIds, skipFieldIds, includeFieldIds } = this.props.configuration
    if (fieldIds.includes(id)) return 1
    if (skipFieldIds.includes(id)) return 2
    if (hideFields && includeFieldIds.includes(id)) return 3
    if (hideFields && !includeFieldIds.includes(id)) return 4
  }

  toggleGroupStatus = e => {
    const { id } = e.currentTarget.dataset
    if (id) {
      this.props.actions.toggleGroupStatus(this.props.configuration, id)
    }
  }

  toggleFieldStatus = e => {
    const { id } = e.currentTarget.dataset
    const { groups, configuration, actions } = this.props
    const { hideFields } =
      groups.find(g => g.fields.find(f => f._id === id)) || {}

    if (id) actions.toggleFieldStatus(configuration, id, hideFields)
  }
}

const Block = styled.div`
  margin-bottom: 12px;
`
