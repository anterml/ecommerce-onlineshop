import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { ObjectID } from "bson"
import Groups from "./groups/groups"
import Fields from "./fields/fields"
import Field from "./field/field"
import FastCreating from "./fastCreating/fastCreating"
import { CATEGORY_FIELDS } from "./data"
import COLORS from "utils/data/colors"
import printviewFabricTemplate from "./printviewFabricTemplate"

export default class Container extends Component {
  state = {
    selectedGroup: {},
    selectedField: {},
  }

  render() {
    const { selectedGroup, selectedFieldId } = this.state
    const { category, groups, actions } = this.props
    const categoryFields = CATEGORY_FIELDS[category] || []
    const group =
      groups.find(group => group._id === selectedGroup._id) || groups[0] || {}
    const fields = group.fields || []
    const field = fields.find(f => f._id === selectedFieldId) || fields[0]

    return (
      <Fragment>
        <Groups
          groups={groups}
          select={this.selectGroup}
          add={this.addGroup}
          actions={actions}
          selectedGroup={group}
          groupNames={categoryFields.map(f => f.name)}
        />
        {group._id && (
          <FieldsBlock>
            <LayoutFields>
              {this.isFastCreatingGroup(group) && (
                <FastCreating
                  bulkFieldsChanges={this.bulkFieldsChanges}
                  groupName={group.name}
                  addFields={actions.addFields}
                />
              )}
              <CreateFieldButton
                data-name={group.name}
                onClick={this.addField}
                data-pos="top"
              >
                Создать поле
              </CreateFieldButton>
              <Fields
                fields={fields}
                selectedField={field || {}}
                select={this.selectField}
                remove={this.removeField}
              />
              <CreateFieldButton
                data-name={group.name}
                onClick={this.addField}
                className={fields.length <= 10 && "hidden"}
                data-pos="bottom"
              >
                Создать поле
              </CreateFieldButton>
            </LayoutFields>
            <Field {...{ field, categoryFields, actions, group }} />
          </FieldsBlock>
        )}
      </Fragment>
    )
  }

  isFastCreatingGroup(group) {
    return group.name.indexOf("Цвет") === 0 || group.name === "Вид принта"
  }

  getCurrentGroup() {
    const { selectedGroup } = this.state
    const { groups } = this.props
    return groups.find(group => group.name === selectedGroup.name) || groups[0]
  }

  bulkFieldsChanges = (fields, action) => {
    const group = this.getCurrentGroup()

    if (!group) return

    if (group.name.indexOf("Цвет") === 0) {
      if (action === "create") this.createBodycolors(fields, group.name)
      if (action === "remove") this.removeBodycolors(fields, group)
    }

    if (group.name === "Вид принта") {
      if (action === "create") this.createPrintViewDataset(fields, group.name)
      if (action === "remove") this.removePrintviews(fields, group)
    }
  }

  createPrintviewsByFabric(fields, groupName) {
    const { fabric, category } = fields
    const template = printviewFabricTemplate[fabric]

    if (!template) {
      return alert("Не найден готовый набор картинок для фабрики " + fabric)
    }

    if (Array.isArray(template)) {
      // to do if needs
    } else {
      if (category && !template[category]) {
        return alert(`
          Неверно указана категория для фабрики ${fabric}.
          Доступные значения: ${Object.keys(template).join(", ")}
        `)
      }

      const printviews = []
      let categories = Object.keys(template)

      if (category) categories = categories.filter(name => name === category)

      categories.forEach(category => {
        const price = fields.price || template[category].price
        const backgroundSize =
          fields.backgroundSize || template[category].backgroundSize
        const { images } = template[category]

        if (category === "base") category = ""
        const printview = {
          name: groupName,
          fabric,
        }

        if (price) printview.price = price

        if (category) {
          printview.category = category
          printview.material = category
        }

        if (backgroundSize) printview.backgroundSize = backgroundSize

        for (let i = 0; i < images.length; ++i) {
          printviews.push({
            ...printview,
            _id: new ObjectID().toString(),
            value: (category ? category + "/" : "") + images[i],
          })
        }
      })

      if (printviews.length) {
        this.props.actions.addFields(groupName, printviews)
      }
    }
  }

  // быстрое создание принтов
  createPrintViewDataset = (fields, groupName) => {
    let { count, imageFolder, price, imageExt } = fields

    imageFolder = imageFolder ? imageFolder + "/" : ""

    const printview = { name: groupName }
    if (price) printview.price = price

    const trimFields = ["category", "material", "fabric", "backgroundSize"]

    trimFields.forEach(name => {
      const value = (fields[name] || "").trim()
      if (value) printview[name] = value
    })
    if (!count || count < 1) {
      this.createPrintviewsByFabric(printview, groupName)
    } else {
      const printviews = []
      for (let i = 1; i <= count; ++i) {
        printviews.push({
          ...printview,
          _id: new ObjectID().toString(),
          value: `${imageFolder + i}.${imageExt || "jpg"}`,
        })
      }

      this.props.actions.addFields(groupName, printviews)
    }
  }

  // быстрое удаление принтов
  removePrintviews = (fields, group) => {
    const fieldNames = [
      "fabric",
      "backgroundSize",
      "category",
      "imageFolder",
      "material",
      "price",
    ]

    const items = group.fields.filter(field => {
      for (let i = 0; i < fieldNames.length; ++i) {
        const name = fieldNames[i]
        if (fields[name] && field[name] !== fields[name]) return false
      }
      return true
    })

    this.props.actions.removeFields(group.name, items)
  }

  // быстрое создание цветов каркаса/корпуса
  createBodycolors = (fields, groupName) => {
    let { count, fabricPrefix, material, price, imageAutoindex } = fields
    fabricPrefix = (fabricPrefix || "").trim().toLowerCase()

    if ((!count || count < 1) && !fabricPrefix) return

    const items = []

    if (!fabricPrefix) {
      for (let i = 0; i < count; ++i) {
        const field = { name: groupName, _id: new ObjectID().toString() }
        if (material) field.material = material
        if (price) field.price = price
        if (imageAutoindex) field.imageUrl = i + 1 + ".jpg"
        items.push(field)
      }
    }
    // Создать по префиксу названия цвета
    // Вместо названия переменной что-то типа colorNamePrefix
    // используется менее интуитивное fabricPrefix,
    // потому что цель - создавать цвета с префиксом фабрик: Кавелио, Амадей и пр.,
    // а не все цвета начинающиеся, например, на "бе": белый, бежевый, береза и пр.
    else {
      const fabrics = Object.keys(COLORS).filter(
        color => color.toLowerCase().indexOf(fabricPrefix) === 0,
      )

      for (let i = 0; i < fabrics.length; ++i) {
        const field = {
          name: groupName,
          value: fabrics[i],
          _id: new ObjectID().toString(),
        }
        if (material) field.material = material
        if (price) field.price = price
        if (imageAutoindex) field.imageUrl = i + 1 + ".jpg"
        items.push(field)
      }
    }

    this.props.actions.addFields(groupName, items)
  }

  // быстрое удаление цветов каркаса
  removeBodycolors = (fields, group) => {
    const { fabricPrefix, material, price } = fields

    const items = group.fields.filter(field => {
      if (
        (material && field.material !== material) ||
        (fabricPrefix && field.value.indexOf(fabricPrefix) !== 0) ||
        (price && field.price !== price)
      )
        return false

      return true
    })

    this.props.actions.removeFields(group.name, items)
  }

  addGroup = value => {
    const name =
      value.trim().substr(0, 1).toUpperCase() +
      value.trim().substr(1).toLowerCase()
    if (!name || this.props.groups.find(group => group.name === name)) return

    const group = { name, _id: new ObjectID().toString(), fields: [] }
    this.props.actions.addGroup(group)
    this.setState(state => ({
      selectedGroup: group,
    }))
  }

  addField = e => {
    const { name } = e.target.dataset
    const field = { name, _id: new ObjectID().toString(), value: "" }
    this.props.actions.addField(name, field)
    this.setState(state => ({ selectedFieldId: field._id }))
  }

  selectGroup = e => {
    const { id } = e.target.dataset
    const group = this.props.groups.find(group => group._id === id)
    if (group && group !== this.state.selectedGroup)
      this.setState(state => ({ selectedGroup: group }))
  }

  selectField = e => {
    const { id } = e.currentTarget.dataset
    this.setState(state => ({ selectedFieldId: id }))
  }

  removeField = e => {
    const { id } = e.currentTarget.dataset
    if (id) this.props.actions.removeField(id)
  }
}

const FieldsBlock = styled.div`
  display: flex;
  position: relative;
`

const CreateFieldButton = styled.button`
  padding: 7px 10px;
  width: 100%;

  &[data-pos="top"] {
    margin-bottom: 20px;
  }
  &[data-pos="bottom"] {
    margin-top: 10px;
  }
`

const LayoutFields = styled.div`
  flex: 1 0 350px;
  margin-right: 15px;
  padding-right: 15px;
  border-right: 1px solid #ddd;
`
