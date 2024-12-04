import React from "react"
import styled from "styled-components"
import { STRATEGY_ATTRS } from "utils/data/category-strategy"

const DIMENSION = {
  LWH: " (ДхШхВ)",
  LW: " (ДхШ)",
  WH: " (ШхВ)",
}

const DEFAULT_VALUES = ["Страна производитель", "Бренд", "Габариты"]

const DIMENSION_SEPARATOR = " x "

const Attrs = ({ category, product, selectedVars }) => {
  if (!product) return <div>Загрузка</div>

  const { groups } = product.vars
  const attrList = STRATEGY_ATTRS[category] || DEFAULT_VALUES

  const obj = {}
  const attrs = product.attrs.concat(product.sattrs)
  let dimensionUnit = DIMENSION.LWH

  for (let i = 0; i < attrList.length; ++i) {
    const attrName = attrList[i]
    const target = attrs.filter(attr => attr.name === attrName)
    if (!target.length) continue

    for (let k = 0; k < target.length; ++k) {
      let { value } = target[k]
      let newName = attrName
      if (typeof value === "object") {
        const { length, width, height } = value

        if (length && width && height) {
          value = [length, width, height].join(DIMENSION_SEPARATOR)
          newName += dimensionUnit = DIMENSION.LWH
        } else if (length && width) {
          value = [length, width].join(DIMENSION_SEPARATOR)
          newName += dimensionUnit = DIMENSION.LW
        } else if (height && width) {
          value = [width, height].join(DIMENSION_SEPARATOR)
          newName += dimensionUnit = DIMENSION.WH
        }
      }

      if (!obj[newName]) obj[newName] = []
      obj[newName].push(value)
    }
  }

  let dimensionFieldName

  if (selectedVars["Спальные места"]) {
    dimensionFieldName = "Спальные места"
  } else if (selectedVars["Размеры"]) {
    dimensionFieldName = "Размеры"
  }

  const dimensionText = "Габариты" + dimensionUnit
  const dimensionUnfoldText = "Габариты в раскладке" + dimensionUnit

  let sleepSpotPos = -1
  if (dimensionFieldName) {
    let sleepSpots = groups.find(({ name }) => name === dimensionFieldName)

    sleepSpots = sleepSpots
      ? sleepSpots.fields.sort(
          (a, b) =>
            parseInt(a.value.replace(/\s+x\s+/g, "")) -
            parseInt(b.value.replace(/\s+x\s+/g, "")),
        )
      : []

    const dimensions = (obj[dimensionText] || [])
      .slice()
      .sort(
        (a, b) =>
          parseInt(a.replace(/\s+x\s+/g, "")) -
          parseInt(b.replace(/\s+x\s+/g, "")),
      )

    if (Array.isArray(obj[dimensionUnfoldText])) {
      const foldingDimensions = obj[dimensionUnfoldText]
        .slice()
        .sort(
          (a, b) =>
            parseInt(a.replace(/\s+x\s+/g, "")) -
            parseInt(b.replace(/\s+x\s+/g, "")),
        )
      obj[dimensionUnfoldText] = foldingDimensions
    }

    if (sleepSpots.length && dimensions.length) {
      const currentSleepSpot =
        sleepSpots.filter(
          ({ _id }) => _id === selectedVars[dimensionFieldName],
        )[0] || {}

      const sleepSpotValues = []
      sleepSpots.forEach(({ name, value }) => {
        if (sleepSpotValues.indexOf(value) === -1) sleepSpotValues.push(value)
      })

      sleepSpotPos = sleepSpotValues.indexOf(currentSleepSpot.value)

      obj[dimensionText] = dimensions
    }
  }

  return sort(obj, attrList).map((name, i) => (
    <Item key={i}>
      <Name>{name}</Name>
      {obj[name].map((value, i) => {
        let accent = 0
        const likeDimensionType =
          name === dimensionText || name === dimensionUnfoldText

        if (likeDimensionType) accent = i === sleepSpotPos ? 2 : 1

        if (sleepSpotPos === -1) accent = 0

        return (
          <Value
            accent={accent}
            key={i}
          >
            {value}
          </Value>
        )
      })}
    </Item>
  ))
}

export default Attrs

function sort(obj, attrList) {
  return Object.keys(obj).sort((a, b) => {
    const posA = attrList.indexOf(a) + 1 || 100
    const posB = attrList.indexOf(b) + 1 || 100

    return posA - posB
  })
}

const Item = styled.div`
  padding: 5px 20px;
  @media (max-width: 580px) {
    padding: 5px 0;
  }
`

const Name = styled.div`
  font-weight: 500;
`

const Value = styled.div`
  ${props =>
    props.accent === 1 &&
    `
    display: none;
    .isAdmin & {
      display: block;
    }
  `};
  ${props =>
    props.accent === 2 &&
    `
    .isAdmin & {
      color: #be0001;
    }
  `};
`
