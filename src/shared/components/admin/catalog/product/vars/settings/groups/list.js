import React, { Component } from "react"
import styled from "styled-components"
import Group from "./group"

export default class List extends Component {
  state = {
    folding: false,
  }

  dragStart = e => {
    const { id } = e.currentTarget.dataset
    if (id && id !== "last") this.setState(state => ({ startId: id }))
  }

  dragEnd = e => {
    const { groups, actions } = this.props
    const { startId, endId } = this.state

    if (startId && endId && startId !== endId) {
      const startGroup = groups.find(group => group._id === startId)
      const endGroup = groups.find(group => group._id === endId) || "last"
      actions.groups.swapGroup(startGroup, endGroup)
    }

    this.setState(state => ({
      startId: null,
      endId: null,
    }))
  }

  dragOver = e => {
    const { id } = e.currentTarget.dataset
    const { startId, endId } = this.state

    // dragOver реагирует также если мы перетащили элемент за пределы текущей группы,
    // но у тех групп не установелен startId, т.к. он срабатывает только от dragStart
    // поэтому игнорируем
    if (!startId) return

    if (id && id !== endId) this.setState({ endId: id })
  }

  render() {
    const { groups, selectedFieldIds, actions } = this.props
    const { folding, endId, startId } = this.state
    //console.log('endId', endId, 'startId', startId)
    const elems = groups.map((group, i) => (
      <Group
        folding={folding}
        selected={group._id === endId}
        current={group._id === startId}
        selectedFieldIds={selectedFieldIds}
        dragStart={this.dragStart}
        dragOver={this.dragOver}
        dragEnd={this.dragEnd}
        actions={actions}
        group={group}
        key={group.name}
      />
    ))

    return (
      <Block>
        {!!elems.length && (
          <Folding onClick={this.toggleFolding}>
            {folding ? "Развернуть" : "Свернуть"} группы
          </Folding>
        )}
        {elems}
        <GroupPlaceholder
          draggable="true"
          data-id="last"
          onDragStart={this.dragStart}
          onDragOver={this.dragOver}
          onDragEnd={this.dragEnd}
          data-selected={"last" === endId}
        />
      </Block>
    )
  }

  toggleFolding = () => {
    this.setState(state => ({ folding: !state.folding }))
  }
}

const Block = styled.div`
  margin-bottom: 25px;
  user-select: none;
`

const GroupPlaceholder = styled.div`
  cursor: pointer;
  border-top: 2px solid transparent;
  height: 40px;
  background: white;
  ${props => props.selected && "border-color: #5e94c4"};
`

const Folding = styled.div`
  cursor: pointer;
  color: #aaa;
  text-decoration: underline;
  display: inline-block;

  &:hover {
    color: #777;
  }
`
