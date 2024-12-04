import React from "react"
import styled from "styled-components"
import FILTER_COLORS from "utils/data/filter-colors"

const MAX_COUNT_WHEN_NOT_EXPANDED = 8

const PURE_COLOR_LIST = {
  Прозрачный: null,
  Белый: null,
  Серый: ["Светло-серый", "Серебристый", "Серый-металлик", "Темно-серый"],
  Черный: null,
  Бежевый: ["Слоновая кость", "Светло-бежевый", "Темно-бежевый"],
  Коричневый: ["Медь", "Темно-коричневый", "Светло-коричневый", "Шоколадный"],
  Желтый: ["Бронза", "Золото"],
  Оранжевый: ["Кораловый"],
  Фиолетовый: [
    "Светло-розовый",
    "Розовый",
    "Светло-фиолетовый (Фуксмя)",
    "Сиреневый",
  ],
  Красный: ["Бордовый", "Коричнево-красный"],
  Синий: ["Голубой", "Бирюзовый", "Темно-синий"],
  Зеленый: ["Оливковый", "Светло-зеленый", "Темно-зеленый"],
}

const COLORS = Object.keys(FILTER_COLORS).reduce((acc, name) => {
  acc[name] = { backgroundColor: FILTER_COLORS[name] }
  return acc
}, {})

const getPureColors = (values, isExpand) => {
  const colors = values.reduce((acc, { name, count }) => {
    // добавить только "чистые" цвета (Зеленый, синий, красный...)
    if (PURE_COLOR_LIST[name]) {
      acc[name] = acc[name] ? acc[name] + count : count
    }
    // добавить остальные цвета (Светло-бежевый, Темно-коричневый...) если не нажата кнопка "Показать всё"
    else if (!isExpand) {
      for (let n in PURE_COLOR_LIST) {
        if (
          Array.isArray(PURE_COLOR_LIST[n]) &&
          PURE_COLOR_LIST[n].includes(name)
        ) {
          acc[n] = acc[n] ? acc[n] + count : count
          return acc
        }
      }
    }

    return acc
  }, {})

  return Object.keys(colors).map(name => ({ name, count: colors[name] }))
}

const Colors = ({ attrName, values, selectedAttrs, toggleAttr, isExpand }) => {
  const pureColors = getPureColors(values, isExpand)
  const notPureColors = values
    .filter(color => !PURE_COLOR_LIST[color.name] && color.name)
    .sort((a, b) => b.count - a.count)

  let colors = [...pureColors, ...notPureColors]

  if (!isExpand) colors = colors.slice(0, MAX_COUNT_WHEN_NOT_EXPANDED)

  return (
    <Block
      data-name={attrName}
      onClick={toggleAttr}
      data-has-overflow-y
    >
      {colors.map(({ name }) => (
        <div
          key={name}
          data-value={name}
        >
          <Radio data-checked={selectedAttrs.includes(attrName + "=" + name)} />
          <Color style={COLORS[name]} />
          {name === "Светло-фиолетовый (Фуксмя)"
            ? "Светло-фиолетовый (Фуксия)"
            : name}
        </div>
      ))}
    </Block>
  )
}

export default Colors

const Block = styled.div`
  max-height: 490px;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: #b5b5b5;
  }

  &::-webkit-scrollbar-thumb {
    border: 0px solid rgb(255, 255, 255);
    min-height: 30px;
    background-color: #777;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    cursor: pointer;

    &:hover {
      color: #000;
    }

    & * {
      pointer-events: none;
    }
  }
`

const Color = styled.span`
  display: inline-block;
  margin-right: 8px;
  flex: 0 0 16px;
  height: 16px;
  margin-right: 8px;
  margin-top: 0;
  border: 1px solid #333;
  cursor: pointer;
`

const Radio = styled.span`
  position: relative;
  display: inline-block;
  border: 1px solid #ddd;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  margin-right: 9px;

  &[data-checked="true"] {
    border-color: #be0001;
    &:after {
      background-color: #be0001;
    }
  }

  &:after {
    content: "";
    display: block;
    background-color: transparent;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
  }
`
