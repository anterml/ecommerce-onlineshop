import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { FABRICS } from "../../../printviewFabricTemplate"
import Categories from "./categories"
import Controls from "../controls"
import { ObjectID } from "bson"

export default class Auto extends Component {
  state = {
    fabricName: "",
    categories: [],
  }

  componentDidMount() {
    this.autocompleteChange(FABRICS[0].name)
  }

  render() {
    const { fabricName, categories } = this.state
    const { change, changePrice, toggleCategory, create } = this

    return (
      <Fragment>
        <Item>
          <Title>Фабрика</Title>
          <select
            name="fabric"
            value={fabricName}
            onChange={change}
          >
            {FABRICS.map(({ name }) => (
              <option
                value={name}
                key={name}
              >
                {name}
              </option>
            ))}
          </select>
        </Item>
        {!!categories.length && (
          <Item>
            <Title>Категории</Title>
            <Categories
              values={categories}
              toggle={toggleCategory}
              changePrice={changePrice}
            />
          </Item>
        )}
        <Controls
          create={create}
          remove={this.props.remove}
        />
      </Fragment>
    )
  }

  toggleCategory = e => {
    const index = Number(e.currentTarget.dataset.i)

    if (!Number.isNaN(index))
      this.setState(state => ({
        categories: state.categories.map((c, i) =>
          i !== index ? c : { ...c, disabled: !c.disabled },
        ),
      }))
  }

  fillImages = c => {
    const buff = []

    if (!c.count) return buff

    for (let i = 1; i <= c.count; ++i) {
      if (c.skip && c.skip.includes(i)) continue
      buff.push(i + ".jpg")
    }

    return buff
  }

  autocompleteChange = fabricName => {
    const targetFabric = FABRICS.find(f => f.name === fabricName)

    const state = {
      fabricName,
      categories: !targetFabric
        ? []
        : targetFabric.categories.map(c => ({
            ...c,
            images: Array.isArray(c.images) ? c.images : this.fillImages(c),
          })),
    }

    this.setState(() => state)
  }

  change = e => {
    const { name, value } = e.target
    if (name === "fabric") return this.autocompleteChange(value)
  }

  changePrice = e => {
    const i = parseInt(e.target.dataset.index)
    const newPrice = parseInt(e.target.value)
    if (!Number.isNaN(i) && !Number.isNaN(newPrice)) {
      const categories = this.state.categories.slice()
      categories[i] = { ...categories[i], newPrice }
      this.setState({ categories })
    }
  }

  create = e => {
    const { fabricName, categories } = this.state

    const fabric = FABRICS.find(f => f.name === fabricName)

    if (!fabric) return alert("Не указана фабрика")

    const fields = []
    categories.forEach(
      ({
        name,
        price,
        backgroundSize,
        images,
        count,
        skip,
        disabled,
        newPrice,
        material,
      }) => {
        if (disabled) return

        const _field = {
          name: "Вид принта",
          fabric: fabricName,
        }

        if (name === "base") name = ""

        if (backgroundSize) _field.backgroundSize = backgroundSize

        if (name) _field.category = name

        if (material) _field.material = material

        // может быть 0
        if (typeof newPrice === "number") _field.price = newPrice
        else if (price) _field.price = price

        if (count) {
          for (let i = 1; i <= count; ++i) {
            if (skip && skip.includes(i)) continue

            const field = {
              ..._field,
              _id: new ObjectID().toString(),
              value: (name ? name + "/" : "") + i + ".jpg",
            }

            fields.push(field)
          }
        } else {
          images.forEach(image => {
            const field = {
              ..._field,
              _id: new ObjectID().toString(),
              value: (name ? name + "/" : "") + image,
            }
            fields.push(field)
          })
        }
      },
    )

    this.props.addFields(fields, !e.target.dataset.continue)
  }
}

const Item = styled.div`
  margin-bottom: 20px;

  & select[name="fabric"] {
    width: 100%;
  }
`

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 5px;
`
