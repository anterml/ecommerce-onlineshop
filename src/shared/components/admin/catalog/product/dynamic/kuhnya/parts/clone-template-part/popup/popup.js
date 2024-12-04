import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Spinner from "globalComponents/spinners/circle"
import Filter from "./filter"
import { Button } from "globalComponents/admin/buttons"

export default class Popup extends Component {
  state = {
    selectedParts: [],
    filter: "all",
  }

  componentDidUpdate(prevProps) {
    if (this.props.templates !== prevProps.templates) {
      this.setState(state => ({ selectedParts: [], filter: "all" }))
    }
  }

  render() {
    const { selectedParts, filter } = this.state
    const { closePopup, products, templates, selectedPartId } = this.props
    const values = this.getTemplates()

    const parts = {
      all: values,
      inset: values.filter(v => v.inset),
      nonset: values.filter(v => !v.inset),
      included: values.filter(v => selectedParts.includes(v._id)),
    }

    return (
      <Fragment>
        <OverlayBackground onClick={closePopup} />
        <Block>
          <Content>
            {products.status === "pending" ? (
              <Overlay>
                <Spinner />
              </Overlay>
            ) : (
              <Fragment>
                <Layout>
                  <Title>Кухни</Title>
                  <Column onClick={this.selectPart}>
                    {products.values.map(({ _id, name }) => (
                      <div
                        value={_id}
                        data-id={_id}
                        data-selected={selectedPartId === _id}
                        key={_id}
                      >
                        {name}
                      </div>
                    ))}
                  </Column>
                </Layout>
                {!selectedPartId ? (
                  <Empty>Выберите кухню слева</Empty>
                ) : (
                  <Layout>
                    <Title>Модули</Title>
                    {templates.status === "pending" && (
                      <Overlay>
                        <Spinner />
                      </Overlay>
                    )}
                    {!!values.length && (
                      <Filter
                        select={this.filterParts}
                        selected={filter}
                        parts={parts}
                      />
                    )}
                    <Column onClick={this.includePart}>
                      {parts[filter || "all"].map(({ _id, name, inset }) => (
                        <label
                          data-id={_id}
                          key={_id}
                          data-selected={selectedParts.includes(_id)}
                        >
                          <span>{name}</span>
                          <span>
                            {!!inset ? "В комплекте" : "Не в комлекте"}
                          </span>
                        </label>
                      ))}
                    </Column>
                    <Controls>
                      <Button onClick={closePopup}>Отмена</Button>
                      <Button
                        onClick={this.clone}
                        disabled={!selectedParts.length}
                      >
                        Клонировать модули
                      </Button>
                    </Controls>
                  </Layout>
                )}
              </Fragment>
            )}
          </Content>
        </Block>
      </Fragment>
    )
  }

  getTemplates = e => {
    const { templates, parts } = this.props

    const partsIds = parts.reduce((acc, { _id, clone }) => {
      acc.push(_id)
      if (clone && clone.id) acc.push(clone.id)
      return acc
    }, [])

    return templates.values.filter(
      ({ _id, clone }) =>
        !(partsIds.includes(_id) || (clone && partsIds.includes(clone.id))),
    )
  }

  clone = e => {
    const { templates, clone, closePopup } = this.props
    const { selectedParts } = this.state
    const { values, urlName, imageFolder } = templates
    const parts = values.filter(v => selectedParts.includes(v._id))
    if (parts.length) clone(parts, { urlName, imageFolder })
    closePopup()
  }

  selectPart = e => {
    const { id } = e.target.dataset

    if (id) {
      this.props.loadTemplates(id)
    }
  }

  filterParts = e => {
    const { filter } = e.currentTarget.dataset
    this.setState(state => ({ filter }))
  }

  includePart = e => {
    const { id } = e.target.dataset
    if (id) {
      this.setState(state => ({
        selectedParts: state.selectedParts.includes(id)
          ? state.selectedParts.filter(part => part !== id)
          : [...state.selectedParts, id],
      }))
    }
  }
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 50;
  overflow: auto;
`

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(233, 233, 233, 0.95);
  z-index: 50;
  overflow: auto;
`

const Block = styled.div`
  position: fixed;
  top: 50px;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  z-index: 500;
  white-space: nowrap;
  box-shadow: 0 0 2px 2px #aaa;
  border-radius: 2px;
`

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  position: relative;

  & > * {
    padding-left: 15px;
    padding-right: 15px;
  }

  &:first-child {
    width: 300px;
    border-right: 1px solid #999;
  }

  &:last-child {
    min-width: 400px;
    flex: 1 1 auto;
  }
`

const Controls = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border-top: 1px solid #ddd;
  padding: 10px;
`

const Content = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  background-color: #fff;
  min-width: 700px;
`

const Column = styled.div`
  height: 100%;
  overflow-y: auto;

  & > * {
    display: flex;
    cursor: pointer;
    padding: 5px 0;
    border-bottom: 1px dashed #bbb;

    &:hover {
      background-color: #efefef;
    }

    &[data-selected="true"] {
      color: green;
      font-weight: 500;
    }
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    max-width: 500px;

    span:first-child {
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 10px;
    }
  }

  label[data-selected="true"] > span:first-child:before {
    display: inline-block;
    content: "+";
    margin-right: 4px;
  }
`

const Title = styled.div`
  flex: 0 0 auto;
  background-color: #ddd;
  padding: 10px 15px;
  font-weight: 500;
`

const Empty = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 40px;
  font-weight: 300;
  color: #b5b5b5;
  flex: 1 1 auto;
`
