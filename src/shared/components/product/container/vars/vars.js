import React, { Component } from "react"
import styled from "styled-components"

import ColorFields from "./fieldType/color"
import VPFields from "./fieldType/vp"
import ColorPopup from "./popup/colors"
import PrintviewPopup from "./popup/printviews"
import { TextFields, NoChoiceField } from "./fieldType/text"

const NO_CHOICE = "-"

const getBackgrounds = styles =>
  styles.map((style, i) => (
    <MultiItem
      style={style}
      key={i}
    ></MultiItem>
  ))

export default class Vars extends Component {
  constructor(props) {
    super(props)
    this.rightmostFields = {}
    this.fieldsCache = {}
    this.state = { currentPopup: "" }
    this.rowCount = 4
  }

  componentDidUpdate(prevProps) {
    if (prevProps.urlName !== this.props.urlName) {
      this.rightmostFields = {}
      this.fieldsCache = {}
      this.setState({ currentPopup: "" })
    }
  }

  render() {
    const elems = this.getElems()
    return elems
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.selectedVars !== this.props.selectedVars ||
      nextState.currentPopup !== this.state.currentPopup
    )
  }

  getElems() {
    const groups = this.props.varFields
    const { selectedVars, totalPrice } = this.props
    const { handlePopupChoice, changeField } = this
    const result = groups.map(group => {
      const groupName = group.name
      const selectedId = selectedVars[group.name]
      //console.log(group, selectedId)
      const selectedField = group.fields.find(f => f._id === selectedId)

      if (!selectedField) {
        return console.log("Не найдено поле", group.name, selectedField)
      }

      if (
        group.view === "Цвет" ||
        (!group.view && groupName.indexOf("Цвет") === 0)
      ) {
        const only = group.fields.length <= 1

        // обработать столешницу в цвет каркаса
        let adaptingField
        if (groupName === "Цвет столешницы" && selectedVars["Цвет каркаса"]) {
          adaptingField = group.fields.find(f => f.value === "В цвет каркаса")
          if (adaptingField) {
            const bodyColorFields = groups.find(
              group => group.name === "Цвет каркаса",
            ) || { fields: [] }
            const selectedBodyColor = bodyColorFields.fields.find(
              f => f._id === selectedVars["Цвет каркаса"],
            )
            if (selectedBodyColor)
              adaptingField.adaptValue = selectedBodyColor.value
          }
        }

        const target = group.fields
        const resultFields = this.calculateVisibleLineFields(
          group.fields,
          groupName,
          selectedField,
        )
        this.fieldsCache[groupName] = resultFields

        return (
          <Group key={group._id}>
            <GroupName>{groupName}</GroupName>
            <ColorFields
              fields={resultFields}
              change={this.changeField}
              selectedId={selectedId}
              getBackgrounds={getBackgrounds}
              only={only}
            />
            {group.fields.length > this.rowCount && (
              <ShowAllButton
                onClick={this.showPopup}
                data-name={groupName}
              >
                посмотреть всё {group.fields.length} шт.
              </ShowAllButton>
            )}
            {this.state.currentPopup === groupName && (
              <div>
                <Overlay
                  onClick={this.handlePopupChoice}
                  data-action="cancel"
                />
                <ColorPopup
                  {...{
                    groupName,
                    target,
                    selectedField,
                    selectedVars,
                    getBackgrounds,
                    handlePopupChoice,
                    changeField,
                    totalPrice,
                  }}
                />
              </div>
            )}
          </Group>
        )
      }

      if (group.name === "Вид принта") {
        let noChoice
        const target = group.fields.filter(f => {
          if (f.value === NO_CHOICE) noChoice = f._id

          return f.value !== NO_CHOICE && f.value !== "*"
        })

        const only = target.length <= 1

        const resultFields = this.calculateVisibleLineFields(
          target,
          groupName,
          selectedField,
        )
        this.fieldsCache[group.name] = resultFields
        const categoryPrintviews = {}

        target.forEach(value => {
          const categoryName = value.category || "Базовая"
          if (!categoryPrintviews[categoryName])
            categoryPrintviews[categoryName] = []
          categoryPrintviews[categoryName].push(value)
        })

        return (
          <Group key={group._id}>
            <GroupName>{groupName}</GroupName>
            {noChoice && (
              <NoChoiceField
                id={noChoice}
                name={group.name}
                value="Без принта"
                selected={selectedId === noChoice}
                change={this.changeField}
              />
            )}
            <VPFields
              fields={resultFields}
              change={this.changeField}
              selectedId={selectedId}
              getBackgrounds={getBackgrounds}
              only={only}
            />
            {target.length > this.rowCount && (
              <ShowAllButton
                onClick={this.showPopup}
                data-name={groupName}
              >
                посмотреть всё {target.length} шт.
              </ShowAllButton>
            )}

            {this.state.currentPopup === groupName && (
              <div>
                <Overlay
                  onClick={this.handlePopupChoice}
                  data-action="cancel"
                />
                <PrintviewPopup
                  {...{
                    groupName,
                    target,
                    selectedField,
                    selectedVars,
                    handlePopupChoice,
                    changeField,
                    categoryPrintviews,
                    totalPrice,
                    getBackgrounds,
                  }}
                />
              </div>
            )}
          </Group>
        )
      }

      let target = group.fields
      if (groupName === "Спальные места" || groupName === "Размеры") {
        target = group.fields.sort(sortByDimension)
      }

      return (
        <Group key={group._id}>
          <GroupName>{groupName}</GroupName>
          <TextFields
            fields={target}
            only={target.length <= 1}
            selectedId={selectedId}
            change={this.changeField}
          />
        </Group>
      )
    })

    return result
  }

  changeField = e => {
    let { id, name } = e.target.dataset
    const { varFields, selectedVars, changeSelectedVars } = this.props

    if (!id || !name || selectedVars[name] === id) return

    if (name === "Вид принта" || name.indexOf("Цвет") !== -1) {
      const group = varFields.filter(group => group.name === name)[0]

      if (!group) return

      const target = group.fields.find(f => f._id === id)
      const list = group.fields.map(({ _id }) => _id)
      // если выбранный элемент - отдельный, и не равен предыдущему отдельному элементу
      if (
        target.value !== NO_CHOICE &&
        list.indexOf(id) > 2 &&
        this.rightmostFields[name] !== id
      ) {
        this.rightmostFields[name] = id
      }
    }

    changeSelectedVars(name, id)
  }

  calculateVisibleLineFields(target, groupName, currentField) {
    // исключить вариант "Без выбора"
    target = target.filter(field => field.value !== NO_CHOICE)

    // если выбрано "Без выбора"
    if (currentField.value === NO_CHOICE) {
      if (this.fieldsCache[groupName]) return this.fieldsCache[groupName]
      return target.slice(0, this.rowCount)
    }

    // если кол-во помещается в одну строку (т.е. нет ссылки "показать всё")
    if (target.length <= this.rowCount) return target

    const lineIds = target.slice(0, this.rowCount).map(tar => tar._id)

    // если это самый правый элемент
    if (lineIds[this.rowCount - 1] === currentField._id) {
      this.rightmostFields[groupName] = currentField._id
      return target.slice(0, this.rowCount)
    }

    // если элемент дальше самого правого элемента
    if (lineIds.indexOf(currentField._id) === -1) {
      this.rightmostFields[groupName] = currentField._id
      const leftFields = target.slice(0, this.rowCount - 1)
      return [...leftFields, currentField]
    }

    // значит выбор был сделан до самого правого элемента,
    // проверяем, выбирался ли самый правый элемент раньше
    if (this.rightmostFields[groupName]) {
      // и если он доступен в текущем наборе полей
      // тогда оставляем самым правым элементом
      const rightField = target.find(
        ({ _id }) => _id === this.rightmostFields[groupName],
      )
      if (rightField) {
        const leftFields = target.slice(0, this.rowCount - 1)
        return [...leftFields, rightField]
      }
    }

    return target.slice(0, this.rowCount)
  }

  showPopup = e => {
    const { name } = e.currentTarget.dataset
    const id = this.props.selectedVars[name]
    this.previousSelectedVar = { name, id }
    this.previousRightmostFields = this.rightmostFields[name]
    this.setState({ currentPopup: name })
  }

  handlePopupChoice = e => {
    const { action, field } = e.target.dataset

    if (!action) return

    const { name, id } = this.previousSelectedVar

    if (action === "cancel") {
      this.setState({ currentPopup: "" })
      this.props.changeSelectedVars(name, id)
      this.rightmostFields[name] = this.previousRightmostFields
    } else if (action === "apply") {
      this.setState({ currentPopup: "" })
    }
  }
}

function sortByDimension(a, b) {
  return (
    parseInt(a.value.replace(/\s+x\s+/g, "")) -
    parseInt(b.value.replace(/\s+x\s+/g, ""))
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const MultiItem = styled.div`
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
`

const Group = styled.div`
  padding: 5px 20px;
  @media (max-width: 580px) {
    padding: 5px 0;
  }
`

const GroupName = styled.div`
  position: relative;
  font-weight: 500;
  display: inline-block;
`

const ShowAllButton = styled.div`
  color: #7e8990;
  width: 100%;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: #337ab7;
  }
`
