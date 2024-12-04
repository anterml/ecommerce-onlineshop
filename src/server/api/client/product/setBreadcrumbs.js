import { SECTIONS } from "utils/data/sections"
import translite from "utils/translite"

const BREADCRUMBS = {}

export default product => {
  const { sections, category } = product

  if (!Array.isArray(sections) || !BREADCRUMBS[category]) return

  const breadcrumbs = []
  for (let indexes of BREADCRUMBS[category]) {
    if (!Array.isArray(indexes)) indexes = [indexes]

    for (let index of indexes) {
      const value = SECTIONS[index]
      if (value && sections.includes(index)) {
        breadcrumbs.push({
          ru: value,
          eng: translite(value),
        })
        break
      }
    }
  }

  if (breadcrumbs.length) {
    const [head, ...tail] = breadcrumbs
    product.breadcrumbs = [
      head,
      ...tail.map(({ ru, eng }, i) => ({
        ru,
        eng:
          head.eng +
          "/" +
          tail
            .slice(0, i)
            .map(b => b.eng)
            .concat(eng)
            .join("-"),
      })),
    ]
  }
}
