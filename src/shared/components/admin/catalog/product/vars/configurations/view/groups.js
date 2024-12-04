import React from "react"
import styled from "styled-components"

import Group from "./group"
import Field from "./field"

const Groups = ({ groups, configuration }) =>
  groups.map(({ fields, hideFields, _id, name }) => {
    const skip = (configuration.skipGroupIds || []).includes(_id)
    const fieldElems = skip
      ? null
      : fields.map((field, i) => {
          const status = getStatus(field._id, hideFields, configuration)
          if (!status || status === 4) return null

          return (
            <Field
              value={field.value}
              status={status}
              price={field.price}
              key={field._id}
            />
          )
        })

    const notEmpty = fieldElems && fieldElems.filter(v => v).length > 0
    return (
      <Block key={_id}>
        {(skip || notEmpty) && (
          <Group
            name={name}
            status={skip ? 2 : ""}
          />
        )}
        {fieldElems}
      </Block>
    )
  })

export default Groups

function getStatus(
  fieldID,
  hideFields,
  { fieldIds, skipFieldIds, includeFieldIds },
) {
  if (fieldIds.includes(fieldID)) return 1
  if (skipFieldIds.includes(fieldID)) return 2
  if (hideFields && includeFieldIds.includes(fieldID)) return 3
  if (hideFields && !includeFieldIds.includes(fieldID)) return 4
}

const Block = styled.div`
  margin-bottom: 12px;
`
