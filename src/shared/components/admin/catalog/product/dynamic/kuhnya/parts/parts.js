import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"
import { ObjectID } from "bson"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as Actions from "./actions"

import Part from "./part/part"
import InsetTabs from "./controls/inset-tabs"
import PartSelect from "./controls/part-select"
import Creating from "./creating/creating"
import CloneTemplatePart from "./clone-template-part/clone-template-part"

import { Button } from "globalComponents/admin/buttons"
const NONSET = "Не в комплекте"
const INSET = "В комплекте"
const ALL = "Все"

const INSET_VALUES = [ALL, INSET, NONSET]

class Parts extends Component {
  state = {
    tab: ALL,
  }

  componentDidMount() {
    this.changeQueryPartIdIfNeed()
  }

  componentDidUpdate() {
    this.changeQueryPartIdIfNeed()
  }

  render() {
    const { tab } = this.state
    const { partId } = this.props.query
    const parts = this.getParts(tab)
    const part = parts.find(part => part._id === partId)
    const hasClonedPart = this.props.parts.find(part => part.clone)
    const noParts = !this.props.parts.length

    return (
      <Block>
        <Item>
          <InsetTabs
            values={INSET_VALUES}
            tab={tab}
            parts={this.props.parts}
            change={this.change}
          />
          <TopControls>
            {(hasClonedPart || noParts) && (
              <CloneTemplatePart
                clone={this.addClonedParts}
                parts={this.props.parts}
              />
            )}
            {(!hasClonedPart || noParts) && (
              <Creating
                create={this.createPart}
                parts={this.props.parts}
              />
            )}
          </TopControls>
        </Item>

        {!!parts.length && (
          <Controls>
            <PartSelect
              select={this.selectPart}
              value={partId}
              parts={parts}
            />
            {part && <Button onClick={this.removePart}>Удалить</Button>}
          </Controls>
        )}

        {!!parts.length && part && (
          <Part
            {...this.props}
            parts={parts}
            part={part}
          />
        )}
      </Block>
    )
  }

  getParts = value => {
    const { parts } = this.props
    switch (value) {
      case NONSET:
        return parts.filter(part => !part.inset)
      case INSET:
        return parts.filter(part => part.inset)
      default:
        return parts
    }
  }

  addClonedParts = (cloneParts, data) => {
    const parts = cloneParts.map((part, i) => ({
      ...part,
      _id: new ObjectID().toString(),
      clone: part.clone || {
        id: part._id,
        ...data,
      },
    }))

    this.props.actions.bulkCreate(parts)
  }

  changeQueryPartIdIfNeed() {
    const parts = this.getParts(this.state.tab)
    const { partId } = this.props.query

    const part = parts.find(part => part._id === partId)
    if (!part) {
      if (parts.length) this.changePartQuery(parts[0]._id)
      if (partId) this.changePartQuery("")
    }
  }

  selectPart = e => {
    const { value } = e.target
    if (value) {
      this.changePartQuery(value)
    }
  }

  createPart = part => {
    this.props.actions.create(part)
    // если выбран фильтр "В комплекте", тогда переключить на "Все"
    // т.к. модуль создается по умолчанию "Не в комплекте"
    if (this.state.tab === INSET) {
      this.setState({ tab: ALL })
    }
    this.changePartQuery(part._id)
  }

  change = e => {
    const { tab } = e.target.dataset
    if (tab) {
      this.setState({ tab })
    }
  }

  removePart = () => {
    const { parts, actions, query } = this.props
    const part = parts.find(part => part._id === query.partId)
    if (
      part &&
      confirm(
        `Вы действительно хотите удалить\n${part.code}. ${part.kind} ${part.name}`,
      )
    )
      actions.removePart(part)
  }

  changePartQuery = partId => {
    const { history, location, query } = this.props
    history.replace({
      pathname: location.pathname,
      search: qs.stringify({ ...query, partId }),
    })
  }
}

export default connect(
  state => {
    const { dynamic, base, vars } = state.admin.catalog.product.value
    return {
      parts: dynamic.parts,
      productGroups: vars.groups,
      productImageFolder: base.imageFolder,
    }
  },
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch),
  }),
)(Parts)

const Block = styled.div`
  margin-bottom: 30px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const TopControls = styled.div`
  button {
    margin-left: 5px;
  }
`

const Controls = styled.div`
  display: flex;
  margin-bottom: 15px;

  & > *:not(:last-child) {
    margin-right: 5px;
  }
`
