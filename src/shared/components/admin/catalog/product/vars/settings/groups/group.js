import React, { Component } from "react"
import styled from "styled-components"
import Field from "./field"

export default class Group extends Component {
  state = {
    endFieldId: null,
    startFieldId: null,
  }

  render() {
    let hasSelectedId
    const {
      group,
      selectedFieldIds,
      folding,
      selected,
      current,
      dragStart,
      dragEnd,
      dragOver,
    } = this.props
    const { endFieldId, startFieldId } = this.state

    const fieldElems = group.fields.map(field => {
      let status

      if (selectedFieldIds.includes(field._id)) {
        status = 1
        hasSelectedId = true
      }

      if (folding && !status) return null

      return (
        <Field
          field={field}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          dragEnd={this.dragEnd}
          selected={field._id === endFieldId}
          current={startFieldId === field._id}
          setDefaultField={this.setDefaultField}
          status={status}
          key={field._id}
        />
      )
    })

    const hidden = folding
    // если точка выбрана, то чтобы показать троеточие, нужно как минимум 2 элемента, иначе 1
    const limit = hasSelectedId ? 2 : 1

    return (
      <Block
        selected={selected}
        current={current}
      >
        <Title
          draggable="true"
          onDragStart={dragStart}
          onDragOver={dragOver}
          onDragEnd={dragEnd}
          data-id={group._id}
        >
          {group.name}
        </Title>
        <Content>
          {fieldElems}
          {!hidden && (
            <FieldPlaceholder
              selected={"last" === endFieldId}
              draggable="true"
              onDragStart={this.dragStart}
              onDragOver={this.dragOver}
              onDragEnd={this.dragEnd}
              data-field-id="last"
            />
          )}
          {hidden && fieldElems.length >= limit && <Dot3 />}
        </Content>
      </Block>
    )
  }

  setDefaultField = e => {
    const { fieldId } = e.currentTarget.dataset

    if (!fieldId) return

    const { group, selectedFieldIds, actions } = this.props

    let prevFieldId
    for (let k = 0; k < group.fields.length; ++k) {
      const { _id } = group.fields[k]
      if (selectedFieldIds.indexOf(_id) !== -1) {
        prevFieldId = _id
        break
      }
    }

    actions.settings.setDefaultField(fieldId, prevFieldId)
  }

  dragStart = e => {
    const { fieldId } = e.currentTarget.dataset
    if (fieldId && fieldId !== "last" && !this.props.folding)
      this.setState(state => ({ startFieldId: fieldId }))
  }

  dragEnd = e => {
    const { group, actions } = this.props
    const { startFieldId, endFieldId } = this.state

    if (startFieldId && endFieldId && startFieldId !== endFieldId) {
      const startField = group.fields.find(field => field._id === startFieldId)
      const endField =
        group.fields.find(field => field._id === endFieldId) || "last"
      actions.groups.swapField(group, startField, endField)
    }

    this.setState(state => ({
      endFieldId: null,
      startFieldId: null,
    }))
  }

  dragOver = e => {
    const { fieldId } = e.currentTarget.dataset
    const { endFieldId, startFieldId } = this.state

    // dragOver реагирует также если мы перетащили элемент за пределы текущей группы,
    // но у тех групп не установелен startFieldId, т.к. он срабатывает только от dragStart
    // поэтому игнорируем
    if (!startFieldId) return

    if (fieldId && fieldId !== endFieldId)
      this.setState({ endFieldId: fieldId })
  }
}

const selectedF = props => props.selected && "border-color: #5e94c4"
const currentF = props => props.current && "opacity: 0.5"

const Block = styled.div`
  padding: 15px 0 0;
  border-top: 2px solid transparent;
  ${selectedF};
  ${currentF};
`

const Content = styled.span`
  display: inline-block;
`

const GroupPlaceholder = styled.div`
  cursor: pointer;
  border-top: 2px solid transparent;
  height: 40px;
  background: white;
  ${selectedF};
`

const Title = styled.div`
  margin-bottom: 2px;
  font-weight: 500;
`

const Dot3 = styled.div`
  color: #515151;
  padding-left: 20px;
  
  &:before {
    letter-spacing: 5px;
    content: "\00B7\00B7\00B7";
  }
`

const FieldPlaceholder = styled.div`
  cursor: pointer;
  display: block;
  border-top: 2px solid transparent;
  height: 15px;
  background: white;
  ${selectedF};
`
