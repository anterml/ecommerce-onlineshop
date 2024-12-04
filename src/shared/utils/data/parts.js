export const PART_PROPERTIES = {
  1: "Полка",
  2: "Ящик",
  3: "Сушилка для посуды",
  4: "Лоток для кухонных принадлежностей",
  5: "Ручки",
  6: "Фасад",
  7: "Столешница",
  8: "Стеновая панель",
  9: "Плинтус угловой",
  10: "Заглушки",
  11: "Цоколь",
  12: "Кромка для плинтуса",
  13: "Профиль кухонный",
  14: "Мойка",
  15: "Подсветка",
  16: "Вытяжка",
  //'Капители',
  //"Балясины",
  //"Рейлинг",
  //"Ведро мусорное",
}

export const PART_PROPERTIES_BY_CATEGORY = {
  "Шкаф навесной": [1, 3, 5, 6, 15],
  "Шкаф навесной открытый": [1, 15],
  "Шкаф навесной под вытяжку": [1, 5, 6, 15, 16],
  "Шкаф навесной для сушки": [1, 3, 5, 6, 15],
  "Шкаф навесной угловой": [1, 3, 5, 6, 15],
  "Шкаф угловой": [1, 5, 6, 7, 9, 10, 11, 12, 13],
  "Шкаф с дверцей": [1, 5, 6, 7, 9, 10, 11, 12, 13, 14],
  "Шкаф под посудомоечную машину": [1, 5, 6, 7, 9, 10, 11, 12, 13],
  "Шкаф под мойку": [1, 5, 6, 7, 9, 10, 11, 12, 13, 14],
  "Шкаф бутылочница": [2, 5, 6, 7, 9, 10, 11, 12],
  "Шкаф с ящиками": [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13],
  "Шкаф с ящиками и дверей": [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13],
  "Угловой элемент": [1, 7, 9, 10, 11, 12, 13],
  "Навесно угловой элемент": [15],
  "Модуль под духовой шкаф": [2, 6, 7, 9, 10, 11, 12, 13],
  "Пенал для встр. бытовой техники": [1, 2, 6, 7, 12, 16],
  "Пенал для холодильника": [1, 2, 6, 7, 12, 25],
  "Пенал открытый": [1, 2, 6, 7, 12],
  "Пенал закрытый с полками": [1, 2, 6, 7, 12], // временно сделал как для открытого (уточнить и доделать)
  "Пенал угловой": [1, 6, 7, 12],
  "Пенал навесной": [15],
}

export const getBaseProperties = kind => {
  const generalProperties = ["Цвет корпуса"]
  return (PART_PROPERTIES_BY_CATEGORY[kind] || [])
    .filter(n => PART_PROPERTIES[n])
    .map(n => PART_PROPERTIES[n])
    .concat(generalProperties)
}

export const getResultProperties = ({ kind, properties }) => {
  const baseProperties = getBaseProperties(kind)
  const includeProperties = baseProperties.concat(
    properties.filter(p => p[0] !== "-"),
  )
  const excludeProperties = properties
    .filter(p => p[0] === "-")
    .map(p => p.substr(1))
  return includeProperties.filter(p => !excludeProperties.includes(p))
}

export const kuhniFieldNames = [3, 7, 8, 9, 10, 13, 14, 15].map(
  number => PART_PROPERTIES[number],
)
