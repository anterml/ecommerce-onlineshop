import React, { Component, Fragment } from "react"
import styled from "styled-components"

import ColorFields from "./fieldType/color"
import VPFields from "./fieldType/vp"
import ColorPopup from "./popup/colors"
import PrintviewPopup from "./popup/printviews"
import { TextFields, NoChoiceField } from "./fieldType/text"
import { kuhniFieldNames } from "utils/data/parts"

const NO_CHOICE = "-"

const getBackgrounds = styles =>
  styles.map((style, i) => (
    <MultiItem
      style={style}
      key={i}
    ></MultiItem>
  ))

function getWordEnding(n) {
  let result = Math.abs(n % 100)
  if (result > 5 && result < 21) return "модулей"

  result = Math.abs(n % 10)
  if (result === 1) return "модуль"
  if (result > 1 && result < 5) return "модуля"
  return "модулей"
}

export default class Vars extends Component {
  constructor(props) {
    super(props)
    this.rightmostFields = {}
    this.fieldsCache = {}
    this.state = { currentPopup: "" }
    this.rowCount = 8
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
    const { selectedVars, totalPrice, category } = this.props
    const { handlePopupChoice, changeField } = this
    const result = groups.map(group => {
      const groupName = group.name
      const selectedId = selectedVars[group.name]
      const selectedField = group.fields.find(f => f._id === selectedId)

      if (!selectedField) {
        return console.log("Не найдено поле", group.name, selectedField)
      }

      let partCount
      if (!kuhniFieldNames.includes(groupName)) {
        partCount = this.props.parts.reduce((sum, { priceFields, inset }) => {
          if (!inset) return sum
          return sum + (priceFields.find(f => f._id === selectedId) ? 1 : 0)
        }, 0)
      }

      const wordEnding = category === "kuhnya" ? getWordEnding(partCount) : null

      // `Данная опция действует на ${partCount} ${wordEnding} в комплекте`
      // `В комплекте находятся ${partCount} ${wordEnding} с данной опцией`
      const groupNameElem = (
        <GroupTitleName>
          <GroupName>{groupName}</GroupName>
          {typeof partCount === "number" && (
            <Fragment>
              <PartCountInfo data-count={partCount}>
                {partCount} {wordEnding}
              </PartCountInfo>
              <PartTipMark data-count={partCount}>
                ?
                <PartTipText>
                  {partCount
                    ? `В вашем комплекте ${partCount} ${wordEnding} с данной опцией`
                    : "В комплекте нет ниодного модуля для данной опции"}
                </PartTipText>
              </PartTipMark>
            </Fragment>
          )}
        </GroupTitleName>
      )

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
            {groupNameElem}
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
            {groupNameElem}
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
          {groupNameElem}
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
        list.indexOf(id) > this.rowCount - 2 &&
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
  background-position: 50%;
  background-repeat: no-repeat;
`

const Group = styled.div`
  &:not(:last-child) {
    margin-bottom: 30px;
  }

  @media (max-width: 580px) {
    padding: 5px 0;
  }
`

const GroupTitleName = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const GroupName = styled.h4`
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  font-weight: 500;
`

const PartCountInfo = styled.span`
  margin-left: 5px;
  color: #777;
  text-transform: lowercase;

  &[data-count="0"] {
    color: #be4900;
  }
`

const PartTipText = styled.span`
  position: absolute;
  display: none;
  top: -33px;
  border-radius: 2px;
  white-space: nowrap;
  padding: 5px 8px;
  background-color: #333;
  color: white;
  right: 0;
  transform: translateX(50%);
  z-index: 500;
`

const PartTipMark = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  border-radius: 2px;
  border: 1px solid #bbb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #777;
  user-select: none;

  &[data-count="0"] {
    color: #be4900;
    border-color: #be4900;
  }

  &:hover ${PartTipText} {
    display: block;
  }
`

const ShowAllButton = styled.div`
  color: #0670eb;
  margin-top: 5px;
  width: 100%;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: #0f56a9;
  }
`
