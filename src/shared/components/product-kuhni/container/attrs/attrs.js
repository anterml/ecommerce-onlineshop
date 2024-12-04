import React from "react"
import styled from "styled-components"
import { STRATEGY_ATTRS } from "utils/data/category-strategy"

const DEFAULT_VALUES = ["Страна производитель", "Бренд", "Габариты"]

const Attrs = ({ category, product, selectedVars }) => {
  if (!product) return <div>Загрузка</div>

  const { groups } = product.vars
  const attrList = STRATEGY_ATTRS[category] || DEFAULT_VALUES

  const obj = {}
  const attrs = product.attrs.concat(product.sattrs)
  for (let i = 0; i < attrList.length; ++i) {
    const attrName = attrList[i]
    const target = attrs.filter(attr => attr.name === attrName)
    //console.log(attrName)
    if (!target.length) continue

    for (let k = 0; k < target.length; ++k) {
      let { value } = target[k]
      let newName = attrName
      if (typeof value === "object") {
        const { length, width, height } = value

        if (length && width && height) {
          value = [length, width, height].join(" x ")
          newName += " (ДхШхВ)"
        } else if (length && width) {
          value = [length, width].join(" x ")
          newName += " (ДхШ)"
        } else if (height && width) {
          value = [width, height].join(" x ")
          newName += " (ШхВ)"
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

    const dimensions = (obj["Габариты (ДхШхВ)"] || [])
      .slice()
      .sort(
        (a, b) =>
          parseInt(a.replace(/\s+x\s+/g, "")) -
          parseInt(b.replace(/\s+x\s+/g, "")),
      )

    if (Array.isArray(obj["Габариты в раскладке (ДхШхВ)"])) {
      const foldingDimensions = obj["Габариты в раскладке (ДхШхВ)"]
        .slice()
        .sort(
          (a, b) =>
            parseInt(a.replace(/\s+x\s+/g, "")) -
            parseInt(b.replace(/\s+x\s+/g, "")),
        )
      obj["Габариты в раскладке (ДхШхВ)"] = foldingDimensions
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

      obj["Габариты (ДхШхВ)"] = dimensions
    }
  }

  return (
    <Block>
      {Object.keys(obj)
        .sort((a, b) => (attrList.indexOf(a) > attrList.indexOf(b) ? 1 : 0))
        .map((name, i) => (
          <Item key={i}>
            <Name>{name}</Name>
            {obj[name].map((value, i) => {
              let accent = 0
              const likeDimensionType =
                name === "Габариты (ДхШхВ)" ||
                name === "Габариты в раскладке (ДхШхВ)"

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
        ))}
    </Block>
  )
}

export default Attrs

const Block = styled.div`
  display: flex;
  padding: 20px 0;
`

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  margin-right: 35px;
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
