import React, { Fragment } from "react"
import styled from "styled-components"
import SingleSelect from "globalComponents/admin/autocomplete/singleSelect"
import MultiSelect from "globalComponents/admin/autocomplete/multiSelect"
import MultiValues from "globalComponents/admin/multiValues"
import { Item, Title, Input } from "globalComponents/admin/elements"

const sizeSeparator = " x "

const Attrs = ({
  attrs,
  targetAttrs,
  change,
  schange,
  add,
  remove,
  productId,
}) =>
  targetAttrs
    .filter(attr => attr.name !== "Цвет")
    .map(
      ({ name, values, type, unit, unitType, tips, structure, multi }, i) => {
        let elem, multiValues

        if (Array.isArray(values) && !multi) {
          const target = attrs.find(attr => attr.name === name)
          elem = (
            <SingleSelect
              key={name}
              values={values}
              value={target ? target.value : ""}
              placeholder="Введите значение"
              onChange={change}
              productId={productId}
              payload={{ target, name }}
            />
          )
        } else if (Array.isArray(values) && multi) {
          const target = attrs.filter(attr => attr.name === name)
          const fieldNames = target.map(t => t.value)
          // исключить из выпадающего списка те значения, которые уже выбраны
          const result = values.filter(value => !fieldNames.includes(value))
          elem = (
            <MultiSelect
              key={name}
              values={result}
              onChange={add}
              payload={name}
              placeholder="Введите значение"
            />
          )
          multiValues = (
            <MultiBlock>
              <MultiValues
                values={target}
                remove={remove}
              />
            </MultiBlock>
          )
        } else if (
          /^(Габариты|Спальное место|Габариты в раскладке)$/i.test(name)
        ) {
          const target = attrs
            .filter(attr => attr.name === name)
            .map(({ name, value }) => ({
              name,
              value: structure
                .split(" ")
                .map(field => value[field])
                .join(sizeSeparator),
            }))

          elem = (
            <MultiSelect
              key={name}
              values={[]}
              onChange={add}
              payload={name}
              placeholder="Введите значение"
            />
          )

          multiValues = (
            <MultiBlock>
              <MultiValues
                values={target}
                remove={remove}
              />
            </MultiBlock>
          )
        } else {
          const target = attrs.find(attr => attr.name === name)
          const value = target ? target.value : ""
          elem = (
            <Input
              defaultValue={value}
              onBlur={schange}
              name={name}
              key={name}
            />
          )
        }

        return (
          <Fragment key={i}>
            <Item>
              <Title>
                {name} {!!unitType && unitType}
              </Title>
              <Wrap>{elem}</Wrap>
              {unit && <Unit>{unit}</Unit>}
            </Item>
            {multiValues}
          </Fragment>
        )
      },
    )

export default Attrs

const Wrap = styled.div`
  width: 300px;
  display: flex;
`

const MultiBlock = styled.div`
  margin-left: 209px;
  margin-bottom: 15px;
  margin-top: -5px;
`

const Unit = styled.span`
  margin-left: 4px;
  color: #999;
`
