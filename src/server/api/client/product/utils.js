import COLORS from "utils/data/colors"

export const setColors = ({ vars }) => {
  vars.groups.forEach(({ name, fields }) => {
    if (name.indexOf("Цвет") === 0) {
      fields.forEach(f => {
        const c = (f.value || "").split(/\s*\,\s*/g)

        f.styles = []
        c.forEach(value => {
          const color = COLORS[value]
          if (color) f.styles.push(color)
        })
      })
    }
  })
}
