import React from "react"
import { Select } from "globalComponents/admin/elements"

const PartSelect = ({ parts, select, value }) => (
  <Select
    onChange={select}
    value={value}
  >
    {parts.map(({ kind, name, code, _id }) => (
      <option
        value={_id}
        key={_id}
      >
        {code}. {kind} {name}
      </option>
    ))}
  </Select>
)

export default PartSelect
