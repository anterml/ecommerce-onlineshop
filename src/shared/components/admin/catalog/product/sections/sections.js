import React, { Component, Fragment } from "react"
import styled from "styled-components"
import MultiSelect from "globalComponents/admin/autocomplete/multiSelect"
import { Item, Title } from "globalComponents/admin/elements"
import { SECTIONS } from "utils/data/sections"
import DATA from "./data"

export default class Sections extends Component {
  render() {
    const { sections, productId, category } = this.props
    const allDynamicSections = DATA[category] || []
    const restDynamicSections = allDynamicSections
      .filter(index => !sections.includes(index))
      .map(index => SECTIONS[index])

    return (
      <Fragment>
        {!!sections.length && (
          <Item>
            <Title>Ключевые слова</Title>
            <div>
              <Keywords onClick={this.remove}>
                {sections.map(index => (
                  <Keyword
                    key={index}
                    data-dynamic={allDynamicSections.includes(index)}
                    data-index={index}
                  >
                    <CloseButton>x</CloseButton>
                    {SECTIONS[index]}
                  </Keyword>
                ))}
              </Keywords>
              {!!restDynamicSections.length && (
                <MultiSelect
                  key={productId}
                  values={restDynamicSections}
                  onChange={this.add}
                  payload={productId}
                  placeholder="Добавить значение"
                />
              )}
            </div>
          </Item>
        )}
      </Fragment>
    )
  }

  add = value => {
    const { actions, sections } = this.props
    let index

    for (let i in SECTIONS) {
      if (SECTIONS[i] === value) {
        index = Number(i)
        break
      }
    }

    if (index && !sections.includes(index)) {
      actions.change("sections", [...sections, index])
    }
  }

  remove = e => {
    const index = Number(e.target.dataset.index)
    if (index && e.target.dataset.dynamic === "true") {
      const value = SECTIONS[index]
      if (
        value &&
        confirm("Вы действительно хотите удалить ключевое слово: \n" + value)
      )
        this.props.actions.change(
          "sections",
          this.props.sections.filter(i => i !== index),
        )
    }
  }
}

const Keywords = styled.div`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
`

const CloseButton = styled.span`
  display: none;
  margin-right: 5px;
  color: #888;
  transform: scaleY(0.85);
`

const Keyword = styled.div`
  padding: 3px 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0 5px 5px 0;
  white-space: nowrap;

  &[data-dynamic="true"] {
    cursor: pointer;
    &:hover {
      border-color: #aaa;
    }

    ${CloseButton} {
      display: inline-block;
    }
  }

  & > * {
    pointer-events: none;
  }
`
