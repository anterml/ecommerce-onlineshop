import React, { Fragment } from "react"
import { Input } from "globalComponents/admin/elements"

const PrintViews = ({ change, fields }) => (
  <Fragment>
    <Input
      placeholder="Кол-во"
      name="count"
      value={fields.count || ""}
      onChange={change}
    />

    <Input
      placeholder="Фабрика"
      name="fabric"
      value={fields.fabric || ""}
      onChange={change}
      list="fabric"
    />
    <datalist id="fabric">
      <option value="Амадей" />
      <option value="Амадей 2505" />
      <option value="БоссаНова" />
      <option value="Е1" />
      <option value="Кавелио" />
      <option value="ТКП" />
      <option value="ТКП-стул-СМ" />
    </datalist>

    <Input
      placeholder="Отображение"
      name="backgroundSize"
      value={fields.backgroundSize || ""}
      onChange={change}
      list="backgroundSize"
    />
    <datalist id="backgroundSize">
      <option value="cover" />
      <option value="contain" />
    </datalist>

    <Input
      placeholder="Категория"
      name="category"
      value={fields.category || ""}
      onChange={change}
    />
    <Input
      placeholder="Подпапка"
      name="imageFolder"
      value={fields.imageFolder || ""}
      onChange={change}
    />
    <Input
      placeholder="Материал"
      name="material"
      value={fields.material || ""}
      onChange={change}
    />
    <Input
      placeholder="Цена"
      name="price"
      value={fields.price || ""}
      onChange={change}
    />

    <select
      name="imageExt"
      value={fields.imageExt || ""}
      onChange={change}
    >
      <option value="jpg">jpg</option>
      <option value="jpeg">jpeg</option>
      <option value="png">png</option>
    </select>
  </Fragment>
)

export default PrintViews
