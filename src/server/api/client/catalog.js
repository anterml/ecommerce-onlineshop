import express from "express"
import Items from "server/models/items"
import { asyncHandler } from "server/handlers"
import { SECTIONS, ENG_NAMES } from "utils/data/sections"
import { getRuCategoryName } from "utils/data/categories"
import COLORS from "utils/data/colors"
import { getImageGroupName } from "utils/category-dependences"

function getBackgroundColors(value) {
  const backgroundColors = []

  value.split(/\s*\,\s*/).forEach(name => {
    const target = COLORS[name]
    if (target) backgroundColors.push(target.hex)
  })

  return backgroundColors
}

const router = express.Router()

const replacingSections = {
  global: {
    "iz-dereva": "derevyannie|из дерева",
    "na-kolesah": "na-kolesikah|на колесах",
    "klassicheskie": "klassika|классические",
    "reguliruemie": "reguliruemie-po-visote|регулируемые",
    "s-podemnim-mehanizmom": "reguliruemie-po-visote|с подъемным механизмом",
    "metall": "metallicheskie|металл",
    "iz-metalla": "metallicheskie|из металла",
    "kozhanie": "kozha|кожанные",
    "plastik": "plastikovie|пластик",
    "v-gostinuyu": "dlya-gostinoi|в гостиную",
  },
  kresla: {
    "dlya-kompyutera": "kompyuternie|для компьютера",
    "dlya-geimerov": "geimerskie|для геймеров",
  },
  shkafi: {
    "kuhonnie": "dlya-kuhni|кухонные",
    "zerkalnie": "s-zerkalom|зеркальные",
    "so-steklom": "steklyannie|со стеклом",
  },
  stoli: {
    // временно перенаправлять раздвижные на трансформеры пока нет посадочной "раскладные"
    // ключевое слово по раздвижным уже есть в соответ. позициях
    razdvizhnie: "transformeri|Раздвижные",
  },
}

const replacingTitle = {
  Exactly: {
    "стулья для кухни для маленькой кухни": "Стулья для маленькой кухни",
  },

  Roughly: {
    "противоударные защищенные": "Противоударные",
    "водонепроницаемые защищенные": "Водонепроницаемые",
  },
}

const removeTitle = {
  Roughly: {
    столики: "столы",
  },
}

const lowCost = {
  "banketki": 10000,
  "kresla": {
    "kompyuternie": 10000,
    "ofisnie": 10000,
    "dlya-rukovoditelya": 10000,
    "igrovie": 10000,
    "iz-rotanga": 10000,
    "kozhanie": 10000,
  },
  "komodi": 15000,
  "pufiki": 10000,
  "stoli": {
    "kuhonnie": 20000,
    "obedennie": 20000,
    "zhurnalnie": 10000,
    "pismennie": 10000,
    "kompyuternie": 10000,
    "ofisnie": 10000,
    "kofeinie-stoliki": 10000,
    "tualetnie-stoliki": 20000,
    "servirovochnie-stoliki": 10000,
    "stoli-konsoli": 10000,
  },
  "stulya": {
    "dlya-kuhni": 5000,
    "barnie": 10000,
    "derevyannie": 5000,
    "kompyuternie": 10000,
    "obedennie": 5000,
    "s-podlokotnikami": 10000,
    "stulya-kresla": 10000,
    "metallicheskie": 5000,
    "klassicheskie": 7000,
    "ofisnie": 10000,
  },
  "zaschischennie-smartfoni": 20000,
  "zaschischennie-telefoni": 10000,
}

const getReplacingSection = (category, value) =>
  replacingSections[category] && replacingSections[category][value]
    ? replacingSections[category][value]
    : replacingSections.global[value]

const splitSections = sections =>
  (sections || "").split("_").filter(v => v !== "nedorogie")

function getReplacedRuNames(sections) {
  const category = sections[0]
  return sections.reduce((acc, v) => {
    const replacing = getReplacingSection(category, v)
    if (replacing) {
      const [eng, ru] = replacing.split("|")
      const index = ENG_NAMES[eng]
      if (index) acc[index] = ru
      else console.log("replaced value not found:", eng, ru)
    }
    return acc
  }, {})
}

function checkIfLowCost(sectionUrl, split) {
  if (sectionUrl.indexOf("nedorogie") !== -1) {
    const lowCostCategory = lowCost[split[0]]
    if (lowCostCategory) {
      return typeof lowCostCategory === "number"
        ? lowCostCategory
        : lowCostCategory[split[1]]
    }
  }
}

function getSectionIndexes(sections) {
  let error
  const category = sections[0]
  const result = sections.reduce((acc, name) => {
    const replacing = getReplacingSection(category, name)
    const section = replacing ? replacing.split("|")[0] : name

    const index = ENG_NAMES[section]

    if (index) {
      acc.push({ index, eng: section, ru: SECTIONS[index] })
    } else {
      error = true
    }

    return acc
  }, [])

  return result.length && !error ? { $all: result } : null
}

router.get(
  "/filter/:sections",
  asyncHandler(async (req, res) => {
    const match = {}
    if (
      getRuCategoryName(req.params.sections) ||
      req.params.sections === "phone"
    ) {
      match.category = req.params.sections
    } else {
      const split = splitSections(req.params.sections)
      const sections = getSectionIndexes(split)

      if (!sections) {
        return res.status(404).json([])
      }

      match.sections = { $all: sections.$all.map(s => s.index) }
      const price = checkIfLowCost(req.params.sections, split)

      if (price) match["base.price"] = { $lte: price }
    }

    if (!req.user || !req.user.admin) match.doneStatus = 3

    const aggregate = [
      { $match: match },
      { $unwind: "$attrs" },

      {
        $project: {
          name: "$attrs.name",
          value: "$attrs.value",
        },
      },

      {
        $redact: {
          $cond: [
            {
              $or: [
                { $eq: ["Габариты", "$name"] },
                { $eq: ["Глубина", "$name"] },
                { $eq: ["Высота", "$name"] },
                { $eq: ["Ширина", "$name"] },
                { $eq: ["Вес", "$name"] },
                { $eq: ["Длина", "$name"] },
              ],
            },
            "$$PRUNE",
            "$$DESCEND",
          ],
        },
      },

      {
        $group: {
          _id: { name: "$name", value: "$value" },
          value_sum: { $sum: 1 },
        },
      },

      {
        $group: {
          _id: "$_id.name",
          value: { $addToSet: { name: "$_id.value", count: "$value_sum" } },
        },
      },
    ]

    const result = await Items.aggregate(aggregate)
    //const remove = sections.$all.map(index => SECTIONS[index] || "")
    //result.push({ _id: "remove", sections: remove, value: [] })
    res.json(result)
  }),
)

router.get(
  "/products/:sections",
  asyncHandler(async (req, res) => {
    const match = {}
    const ruCategory =
      getRuCategoryName(req.params.sections) ||
      (req.params.sections === "phone" && "Защищенные телефоны")
    let price, title, breadcrumbs
    if (ruCategory) {
      title = req.params.sections ? ruCategory : ""

      match.category = req.params.sections
      breadcrumbs = [{ ru: ruCategory, eng: match.category }]
    } else {
      const split = splitSections(req.params.sections)
      const sections = getSectionIndexes(split)

      if (!sections) {
        return res.status(404).json([])
      }

      match.sections = { $all: sections.$all.map(s => s.index) }
      breadcrumbs = sections.$all.map(({ ru, eng }) => ({ ru, eng }))
      const replacedRuNames = getReplacedRuNames(split)
      title = prettyTitle(
        sections.$all.map(v => replacedRuNames[v.index] || SECTIONS[v.index]),
      )
      price = checkIfLowCost(req.params.sections, split)
    }

    const $and = []
    const skipQueryList = [
      "skip",
      "limit",
      "minPrice",
      "maxPrice",
      "calcCategoryCount",
      "order",
      "sort",
      "yclid",
    ]
    for (let name in req.query) {
      if (skipQueryList.indexOf(name) !== -1) continue

      let $or = []

      if (name.indexOf("ss-") === 0) {
        req.query[name].split(",").forEach(v => {
          let value = v.split(/\s*x\s*/)
          if (name === "ss-lwh" && value.length === 3) {
            value = {
              "value.length": parseInt(value[0]),
              "value.width": parseInt(value[1]),
              "value.height": parseInt(value[2]),
            }
          } else if (name === "ss-wh" && value.length === 2) {
            value = {
              "value.width": parseInt(value[0]),
              "value.height": parseInt(value[1]),
            }
          } else if (name === "ss-lw" && value.length === 2) {
            value = {
              "value.length": parseInt(value[0]),
              "value.width": parseInt(value[1]),
            }
          } else {
            return
          }

          $or.push({
            attrs: {
              $elemMatch: { ...value, name: "Спальное место" },
            },
          })
        })
      } else {
        $or = req.query[name].split(",").map(value => {
          // check if integer
          if (!Number.isNaN(Number(value))) value = Number(value)

          return {
            attrs: {
              $elemMatch: { name, value },
            },
          }
        })
      }

      if (name === "Назначение" || name === "Размещение") {
        //$or.push({ attrs: { $not: { $elemMatch: { name } } } })
        $or.push({ attrs: { $elemMatch: { name, value: "*" } } })
      }

      $and.push({ $or })
    }

    if ($and.length) match.$and = $and

    // проверка статуса
    if (!req.user || !req.user.admin) match.doneStatus = 3

    // проверка цены
    const minPrice = parseInt(req.query.minPrice)
    const maxPrice = parseInt(req.query.maxPrice)

    if (price) {
      match["base.price"] = { $lte: price }
    } else if (minPrice || maxPrice) {
      match["base.price"] = {}

      if (req.query.minPrice) match["base.price"].$gte = minPrice
      if (req.query.maxPrice) match["base.price"].$lt = maxPrice
    }

    let { skip, limit, calcCategoryCount, sort } = req.query
    let order

    if (sort === "priceUp") {
      sort = "base.price"
      order = 1
    } else if (sort === "priceDown") {
      sort = "base.price"
      order = -1
    } else if (sort === "alphabeticUp") {
      sort = "base.name"
      order = 1
    } else if (sort === "alphabeticDown") {
      sort = "base.name"
      order = -1
    } else if (sort === "popular") {
      sort = "settings.sortPriority"
      order = -1
    } else {
      if (!sort) {
        sort = "settings.sortPriority"
        order = -1
      } else {
        sort = "creating.date"
        order = -1
      }
    }

    const getItems = Items.find(match)
      .sort({ [sort]: order })
      .limit(parseInt(limit) + 1 || 21)
      .skip(parseInt(skip) || 0)
      .select("category base images vars.groups doneStatus attrs sections")

    const methods = [getItems]

    if (calcCategoryCount) methods.push(Items.countDocuments(match))

    const [items, count] = await Promise.all(methods)

    const DETAILS_LIST = [
      "Бренд",
      "Страна производитель",
      "Габариты",
      "Тип раскладывания",
      "Спальные места",
      "Спальное место",
      "Размеры",
      "Материал каркаса",
      "Материал столешницы",
    ]

    const VISIBLE_COLOR_COUNT = 5

    const products = items.map(
      (
        { _id, category, base, attrs, sections, vars, images, doneStatus },
        i,
      ) => {
        const product = {
          _id,
          category,
          base,
          sections,
          vars,
          images,
          doneStatus,
        }

        const colorGroupName = getImageGroupName(category)
        const colorGroup = vars.groups.find(
          group => group.name === colorGroupName,
        )

        const colors =
          colorGroup && colorGroup.fields
            ? colorGroup.fields.filter(color => typeof color.value === "string")
            : []

        const restColorCount = colors.length - VISIBLE_COLOR_COUNT
        if (restColorCount > 0) product.restColorCount = restColorCount

        product.colors = colors
          .slice(0, VISIBLE_COLOR_COUNT)
          .map(({ value }) => ({
            backgroundColors: getBackgroundColors(value),
            name: value,
          }))

        product.attrs = attrs.filter(a => DETAILS_LIST.includes(a.name))

        return product
      },
    )

    return res.json({ count, products, title, breadcrumbs })
  }),
)

function prettyTitle(words) {
  const [category, ...kinds] = words
  const nameOverlap = kinds.find(
    kind => kind.toLowerCase().indexOf(category.toLowerCase()) !== -1,
  )
  let begin = []
  let end = []

  for (let w of kinds) {
    // ставим прилагательные в перед
    if (/(ые|ие)$/.test(w)) begin.push(w)
    else end.push(w)
  }

  if (!nameOverlap) begin.push(category)

  let result = begin.concat(end).join(" ").toLowerCase()

  // Заменить одну последовательность слов на другую.
  // Точное совпадение.
  // Пример заголовка: "Стулья для кухни для маленькой кухни" -> "Стулья для маленькой кухни"
  if (replacingTitle.Exactly[result]) result = replacingTitle.Exactly[result]

  // Заменить одну последовательность слов на другую.
  // Частичное совпадение.
  // Пример значения: "Противоударные защищенные" заменить на "Противоударные"
  // Пример заголовка: "Противоударные защищенные телефоны" заменить на "Противоударные телефоны"
  for (let name in replacingTitle.Roughly) {
    if (result.indexOf(name) !== -1)
      result = result.replace(name, replacingTitle.Roughly[name])
  }

  // Удаляет некоторые слова, если есть другие слова.
  // Частичное совпадение.
  // Пример значения: если есть слово "столики", то удалить слово "стол".
  // Пример заголовка: "Столы туалетные столики с зеркалом" -> "Туалетные столики с зеркалом"
  for (let name in removeTitle.Roughly) {
    if (result.indexOf(name) !== -1)
      result = result.replace(removeTitle.Roughly[name], "")
  }

  result = result.trim()
  return result[0].toUpperCase() + result.substr(1)
}

router.get(
  "/products/:category",
  asyncHandler(async (req, res) => {
    const { category } = req.params

    if (!category) throw new Error(`Category ${category} is not found`)

    const match = { category }

    const $and = []
    const skipQueryList = [
      "skip",
      "limit",
      "minPrice",
      "maxPrice",
      "calcCategoryCount",
      "order",
      "sort",
      "yclid",
    ]

    for (let name in req.query) {
      if (skipQueryList.indexOf(name) !== -1) continue

      let $or = []

      if (name.indexOf("ss-") === 0) {
        req.query[name].split(",").forEach(v => {
          let value = v.split(/\s*x\s*/)
          if (name === "ss-lwh" && value.length === 3) {
            value = {
              "value.length": parseInt(value[0]),
              "value.width": parseInt(value[1]),
              "value.height": parseInt(value[2]),
            }
          } else if (name === "ss-wh" && value.length === 2) {
            value = {
              "value.width": parseInt(value[0]),
              "value.height": parseInt(value[1]),
            }
          } else if (name === "ss-lw" && value.length === 2) {
            value = {
              "value.length": parseInt(value[0]),
              "value.width": parseInt(value[1]),
            }
          } else {
            return
          }

          $or.push({
            attrs: {
              $elemMatch: { ...value, name: "Спальное место" },
            },
          })
        })
      } else {
        $or = req.query[name].split(",").map(value => ({
          attrs: {
            $elemMatch: { name, value },
          },
        }))
      }

      if (name === "Назначение" || name === "Размещение") {
        //$or.push({ attrs: { $not: { $elemMatch: { name } } } })
        $or.push({ attrs: { $elemMatch: { name, value: "*" } } })
      }

      $and.push({ $or })
    }

    if ($and.length) match.$and = $and

    // проверка статуса
    if (!req.user || !req.user.admin) match.doneStatus = 3

    // проверка цены
    const minPrice = parseInt(req.query.minPrice)
    const maxPrice = parseInt(req.query.maxPrice)

    if (minPrice || maxPrice) {
      match["base.price"] = {}

      if (req.query.minPrice) match["base.price"].$gte = minPrice
      if (req.query.maxPrice) match["base.price"].$lt = maxPrice
    }

    let { skip, limit, calcCategoryCount, sort } = req.query
    let order

    if (sort === "priceUp") {
      sort = "base.price"
      order = 1
    } else if (sort === "priceDown") {
      sort = "base.price"
      order = -1
    } else if (sort === "alphabeticUp") {
      sort = "base.name"
      order = 1
    } else if (sort === "alphabeticDown") {
      sort = "base.name"
      order = -1
    } else if (sort === "popular") {
      sort = "settings.sortPriority"
      order = -1
    } else {
      sort = "creating.date"
      order = -1
    }

    const getItems = Items.find(match)
      .sort({ [sort]: order })
      .limit(parseInt(limit) + 1 || 21)
      .skip(parseInt(skip) || 0)
      .select("base images vars.groups doneStatus attrs")
      .exec()

    const methods = [getItems]

    if (calcCategoryCount) methods.push(Items.countDocuments(match))

    const [products, count] = await Promise.all(methods)
    return res.json({ count, products })
  }),
)

export default router
