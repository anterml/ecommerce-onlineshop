import React, { Component } from "react"
import styled from "styled-components"
import { Select } from "globalComponents/admin/elements"
import { Button } from "globalComponents/admin/buttons"
import { Field, MissingField } from "./field"

export default class Groups extends Component {
  state = {
    groupId: "",
    fieldId: "",
  }

  constructor(props) {
    super(props)
    this.mapFieldsToIds(props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productGroups !== this.props.productGroups)
      this.mapFieldsToIds(this.props)
  }

  mapFieldsToIds = props => {
    this.fieldIds = {}
    for (let group of props.productGroups) {
      for (let field of group.fields) {
        this.fieldIds[field._id] = field
      }
    }
  }

  render() {
    const { part, productGroups } = this.props
    const { groupId, fieldId } = this.state
    const group = productGroups.find(group => group._id === groupId)
    const partField = part.fields.find(field => field._id === fieldId)
    const { create, remove, change, changePrice } = this
    const { code } = part
    return (
      <Block>
        <Controls>
          <Select
            name="groupId"
            onChange={change}
            value={groupId}
          >
            <option value="">Выбор группы</option>
            {productGroups.map(({ _id, name }) => (
              <option
                value={_id}
                key={_id}
              >
                {name}
              </option>
            ))}
          </Select>
          {group && (
            <Select
              name="fieldId"
              onChange={change}
              value={fieldId}
            >
              <option value="">Выбор поля</option>
              {group.fields.map(({ _id, name, value, price }) => (
                <option
                  value={_id}
                  key={_id}
                >
                  {name} {value} {price || 0} руб
                </option>
              ))}
            </Select>
          )}

          {group && fieldId && (
            <Button
              onClick={create}
              disabled={partField}
            >
              Создать поле
            </Button>
          )}
        </Controls>

        <List>
          {part.fields.map(partField => {
            const productField = this.fieldIds[partField._id]
            return productField ? (
              <Field
                {...{ productField, partField, remove, changePrice, code }}
                key={partField._id}
              />
            ) : (
              <MissingField
                field={partField}
                remove={remove}
                key={partField._id}
              />
            )
          })}
        </List>
      </Block>
    )
  }

  change = e => {
    const { name, value } = e.target
    if (name) this.setState({ [name]: value })
  }

  changePrice = e => {
    const { id } = e.target.dataset

    if (id) {
      const { part, actions } = this.props
      const price = Number(e.target.value.trim()) || 0
      const newPart = {
        ...part,
        fields: part.fields.map(field =>
          field._id !== id ? field : { ...field, price },
        ),
      }

      actions.change(part, newPart)
    }
  }

  remove = e => {
    const { id } = e.target.dataset

    if (id) {
      const { part, actions } = this.props
      const newPart = {
        ...part,
        fields: part.fields.filter(field => field._id !== id),
      }

      actions.change(part, newPart)
    }
  }

  create = e => {
    const { part, actions, productGroups } = this.props
    const { groupId, fieldId } = this.state
    const group = productGroups.find(group => group._id === groupId)

    if (!group) return

    const field = group.fields.find(field => field._id === fieldId)
    if (field && !part.fields.find(f => f._id === field._id)) {
      const newPart = {
        ...part,
        fields: [{ _id: field._id }, ...part.fields],
      }

      actions.change(part, newPart)
    }
  }
}

const Block = styled.div`
  select:not(:last-child) {
    margin-right: 10px;
  }
`

const Controls = styled.div`
  display: flex;
`

const List = styled.div`
  margin-top: 30px;
  display: inline-block;
`
