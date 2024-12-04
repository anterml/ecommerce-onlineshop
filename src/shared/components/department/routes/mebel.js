import React from "react"
import Links from "../links"

import CATEGORIES from "utils/data/categories"

const skipCategories = [
  "banketka",
  "komod",
  "kreslo",
  "kreslo_kachalka",
  "kreslo_meshok",
  "krovat_cherdak",
  "kuhnya",
  "puf",
  "stol",
  "stul",
]

const values = Object.keys(CATEGORIES)
  .filter(name => !skipCategories.includes(name))
  .map(name => ({ eng: name, ru: CATEGORIES[name] }))
  .concat([
    { eng: "banketka", query: "banketki/", ru: CATEGORIES.banketka },
    { eng: "komod", query: "komodi/", ru: CATEGORIES.komod },
    { eng: "kreslo", query: "kresla/", ru: CATEGORIES.kreslo },
    {
      eng: "kreslo_kachalka",
      query: "kresla-kachalki/",
      ru: CATEGORIES.kreslo_kachalka,
    },
    {
      eng: "kreslo_meshok",
      query: "kresla-meshki/",
      ru: CATEGORIES.kreslo_meshok,
    },
    {
      eng: "kreslo_computernoe",
      query: "kresla/kompyuternie/",
      ru: "Компьютерные кресла",
    },
    {
      eng: "krovat_cherdak",
      query: "detskaya_krovat/?Тип=Кровать-чердак",
      ru: "Кровати-чердаки",
    },
    { eng: "puf", query: "pufiki/", ru: CATEGORIES.puf },
    { eng: "stol", query: "stoli/", ru: CATEGORIES.stol },
    { eng: "stul", query: "stulya/", ru: CATEGORIES.stul },
  ])
  .sort((a, b) => (a.ru > b.ru ? 1 : -1))

export default props => (
  <Links
    department="mebel"
    values={values}
    {...props}
  />
)
