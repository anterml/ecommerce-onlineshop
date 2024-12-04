import DATA from "./data"
import { getImageGroupName } from "utils/category-dependences"
import CACHE from "server/cache/store"
import removeMarking from "utils/remove-marking"

const ROOT_IMAGE_URL = "https://storage.googleapis.com/yourpath"

const PAGE = {
  MAIN: "/",
  PRODUCT: "/(mebel|electronics)/:category/:urlName",
  PRODUCT_KUHNYA: "/mebel/kuhnya/:urlName",
  CATALOG: "/catalog/:department/:category/*/",
  DEPARTMENT: "/department/**",
}

export default function getMeta(routes, state, req, title) {
  const routePaths = Object.values(PAGE)
  const target = routes.find(({ route }) => routePaths.includes(route.path))
  if (target) {
    switch (target.route.path) {
      case PAGE.DEPARTMENT:
        return handleDepartment(target, title)

      case PAGE.CATALOG:
        return handleCatalog(target, title, req)

      case PAGE.PRODUCT:
      case PAGE.PRODUCT_KUHNYA:
        return handleProduct(target, state)

      case PAGE.MAIN:
        return handleMain(target, title)
    }
  }

  return `<title>${title}</title>`
}

function handleDepartment(target, title) {
  const { 0: department } = target.match.params

  const prefix =
    department === "electronics"
      ? "Наш интернет-магазин предлагает различные виды электроники: защищенные телефоны, защищенные смартфоны."
      : "Широкий выбор мебели: кресла, столы, шкафы, диваны, кровати, стулья, табуреты и пр."

  const description =
    prefix +
    " С доставкой. В кредит или рассрочку. Покупайте товары в интернет-магазине yoursite"

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="yoursite.ru">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://www.yoursite.ru${target.match.url}">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:image" content="${ROOT_IMAGE_URL}/stuff/logo.jpg">
  `
}

function handleMain(target, title) {
  const description =
    "Интернет-магазин yoursite предлагает более 500 000 товаров. У нас есть мебель, бытовая техника, электроника, светотехника, декор, текстиль и предметы интерьера."
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="yoursite.ru">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://www.yoursite.ru${target.match.url}">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:image" content="${ROOT_IMAGE_URL}/textures/logo.jpg">
  `
}

function getMetaDescriptionText(seo, templates, product) {
  switch (seo.metaDescriptionKind) {
    case "#seo-text": {
      if (!seo.descriptionTemplateId) {
        return removeMarking(seo.descriptionText)
      }

      const template = templates.find(
        t => t._id.toString() === seo.descriptionTemplateId,
      )
      if (template) {
        return removeMarking(template.text)
      }
    }

    case "#description": {
      // нужно убрать теги из описания
      // т.к. оно уже было обработано при получении продукта
      return (
        (product.description || "")
          // заменяем каждый тег пробелом (пробелом - потому что есть теги <br />)
          .replace(/<[^>]+>/g, " ")
          // заменяем множественные пробелы на 1 пробел
          .replace(/\s+/g, " ")
      )
    }

    default:
      return removeMarking(seo.metaDescriptionText)
  }
}

function handleProduct(target, state) {
  const { category } = target.match.params
  const product = state.product.product.value

  if (state.product.product.status !== "fulfilled") return ""

  const { kind, name, imageFolder, price } = product.base || {}
  const descriptionTemplates = CACHE("seo-templates") || []
  const metaDescription = getMetaDescriptionText(
    product.seo || {},
    descriptionTemplates,
    product,
  )
  const capitalizeKind = kind || ""
  const lowercaseKind = capitalizeKind.toLowerCase()

  let prefix
  const feminineCategories = [
    "banketka",
    "veshalka",
    "vitrina",
    "detskaya_krovat",
    "podstavka",
    "kushetka",
    "kuhnya",
    "polka",
    "prihojaya",
    "raskladushka",
    "sofa",
    "stenka",
    "tahta",
    "tumba",
    "etajerka",
  ]
  if (feminineCategories.includes(category || product.category))
    prefix = `${capitalizeKind} ${name}. Купить`
  else {
    prefix = `Купить ${lowercaseKind} ${name}`
  }

  let categoryText = "Более 30 000 моделей мебели"
  if (category === "sp_phone") {
    // Замена телефонов\смартфонов
    // Защищенный телефон ->  Защищенных телефонов
    categoryText = `Большой выбор ${lowercaseKind.replace(/ый/, "ых")}ов`
  }

  const title =
    category === "sp_phone"
      ? `${prefix} с быстрой доставкой по России - yoursite.ru`
      : `${prefix} в интернет-магазине yoursite.ru с бесплатной доставкой по Санкт-Петербургу.`

  const { groups, settings } = product.vars
  const imageUrl =
    findImageUrl(groups, settings.selectedFieldIds, category) || "1.jpg"
  const keywords = getProductMetaKeywords(product)

  let description
  if (category === "sp_phone") {
    description = `${prefix} в рассрочку или кредит. Большой выбор противоударных смартфонов на yoursite.ru с быстрой доставкой по России.`
  } else if (metaDescription) {
    description = metaDescription
  } else if (category === "banketka") {
    description =
      "Купить банкетки в Санкт-Петербурге (Спб) Вы можете в одном из наших магазинов. Если вы привыкли к покупкам онлайн, Вы можете купить банкетку в нашем интернет-магазине, с доставкой. Для более удобного поиска, мы создали отдельные категории товаров. Вы можете сразу выбрать банкетку в прихожую или для спальни, со спинкой, с ящиком или сиденьем. Есть так же подборка недорогих моделей. Все подборки вы можете посмотреть, перейдя в категорию банкетки."
  } else if (category === "puf") {
    description =
      "Купить пуфики в Санкт-Петербурге (Спб) Вы можете в одном из наших магазинов. Если вы привыкли к покупкам онлайн, Вы можете купить пуфики в нашем интернет-магазине, с доставкой. Для более удобного поиска, мы создали отдельные категории товаров. Вы можете сразу выбрать детские пуфики, в прихожую, в спальню или пуфики с ящиками. Есть так же подборка недорогих моделей. Все подборки вы можете посмотреть, перейдя в категорию пуфики."
  } else {
    description = `${prefix} в Санкт-Петербурге. ${categoryText} в сети магазинов с доставкой по России. В рассрочку или кредит`
  }

  delete product.seo

  const image = `${ROOT_IMAGE_URL}/category/furniture/${category}/${imageFolder}/${imageUrl}`
  const brand = product.attrs.find(attr => attr.name === "Бренд")

  const jsonLD = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "name": `${capitalizeKind} ${name}`,
    image,
    description,
  }

  if (brand) {
    jsonLD.brand = {
      "@type": "Brand",
      "name": brand.value,
    }
  }

  const groupName = getImageGroupName(category)
  const { fields } =
    product.vars.groups.find(group => group.name === groupName) || {}

  if (Array.isArray(fields) && fields.length > 1) {
    const colorNames = []
    const aggregateOffer = {
      "@type": "AggregateOffer",
      "priceCurrency": "RUB",
      "lowPrice": String(Number(price) || 0),
      "offers": [],
    }

    for (let i = 0; i < fields.length; ++i) {
      if (aggregateOffer.offers.length === 5) break

      const field = fields[i]
      if (!colorNames.includes(field.value)) {
        colorNames.push(field.value)
        aggregateOffer.offers.push({
          "@type": "Offer",
          "name": field.value,
          "priceCurrency": "RUB",
          "price": String(price + (Number(field.price) || 0)),
        })
      }
    }

    jsonLD.offers = aggregateOffer
  } else {
    jsonLD.offers = {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "price": String(price),
    }
  }

  if (product.vars.settings.instock === 1)
    jsonLD.offers.availability = "http://schema.org/InStock"

  return `
    <title>${title}</title>
    <meta name="keywords" content="${keywords}" />
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="yoursite.ru">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://www.yoursite.ru${
      target.match.url
    }">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:image" content="${image}">
    <script type="application/ld+json">${JSON.stringify(
      jsonLD,
      null,
      2,
    )}</script>
  `
}

function handleCatalog(target, title) {
  const { category, department } = target.match.params
  const ruDepartment = department === "electronics" ? "электронику" : "мебель"
  const prefix = "Купить " + title.toLowerCase()

  const description =
    department === "electronics"
      ? "Купить защищенные телефоны и смартфоны с доставкой по России. Огромный выбор недорогих моделей на yoursite. Телефоны по ценам производителя в рассрочку или кредит."
      : `${prefix} с доставкой по Санкт-Петербургу и России. Огромный выбор недорогих моделей в сети магазинов. Заказывайте ${ruDepartment} по ценам производителя. В рассрочку или кредит`

  const resultTitle =
    department === "electronics"
      ? "Купить защищенные телефоны и смартфоны с быстрой доставкой по России - yoursite.ru"
      : `${prefix} в Санкт-Петербурге с бесплатной доставкой - интернет-магазин yoursite.ru`

  return `
    <title>${resultTitle}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="yoursite.ru">
    <meta property="og:title" content="${resultTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://www.yoursite.ru${target.match.url}">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:image" content="${ROOT_IMAGE_URL}/departments/${category}.jpg">
  `
}

function getProductMetaKeywords({ category, base, attrs, vars }) {
  const { name, kind } = base
  // pka - product_keywords_attrs
  // pkv - product_keywords_vars
  let { pka, pkv } = DATA[category] || {}

  if (!Array.isArray(pka)) pka = []
  if (!Array.isArray(pkv)) pkv = []

  const keywords = [kind, name]

  attrs.forEach(({ name, value }) => {
    if (pka.indexOf(name) !== -1) {
      keywords.push(value)
    } else if (name === "Бренд") {
      keywords.push(value)
    }
  })

  vars.groups.forEach(group => {
    if (pkv.indexOf(group.name) !== -1) {
      const fields = []

      group.fields.forEach(field => {
        // не учитываем одинаковые значения с разными ценами
        if (fields.length < 2 && fields.indexOf(field.value) === -1)
          fields.push(field.value)
      })

      keywords.push(fields.join(" "))
    }
  })

  return keywords.join(", ") + ", купить, доставка, в кредит, в рассрочку"
}

function findImageUrl(groups, selectedFieldIds, category) {
  const groupName = getImageGroupName(category)

  const { fields } = groups.find(group => group.name === groupName) || {}

  if (Array.isArray(fields)) {
    // пробуем найти картинку в настройках по умолчанию
    if (Array.isArray(selectedFieldIds) && selectedFieldIds.length) {
      for (let i = 0; i < fields.length; ++i) {
        if (selectedFieldIds.indexOf(fields[i]._id) !== -1) {
          return fields[i].imageUrl
        }
      }
    }

    // пробуем найти картинку в главном поле категории (Цвет каркаса/Цвет обивки/Цвет багета/...)
    for (let i = 0; i < fields.length; ++i) {
      if (fields[i].imageUrl) {
        return fields[i].imageUrl
      }
    }
  }
}
