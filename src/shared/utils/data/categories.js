export const MEBEL = {
  banketka: "Банкетки",
  bufet: "Буфеты",

  veshalka: "Вешалки",
  winniy_shkaf: "Винные шкафы",
  vitrina: "Витрины",

  detskaya_krovat: "Детские кровати",
  divan: "Диваны",
  divan_krovat: "Диваны-кровати",

  zerkalo: "Зеркала",

  komod: "Комоды",
  kreslo: "Кресла",
  kreslo_meshok: "Кресла-мешки",
  kreslo_kachalka: "Кресла-качалки",
  krovat: "Кровати",
  krovat_cherdak: "Кровати-чердаки",
  kushetka: "Кушетки",
  kuhnya: "Кухни",

  podstavka: "Подставки",
  polka: "Полки",
  prihojaya: "Прихожие",
  puf: "Пуфы",

  raskladushka: "Раскладушки",

  sofa: "Софы",
  stelaj: "Стеллажи",
  stenka: "Стенки",
  stol: "Столы",
  stul: "Стулья",

  taburet: "Табуреты",
  tahta: "Тахты",
  tualetniy_stolik: "Туалетные столики",
  tumba: "Тумбы",

  shkaf: "Шкафы",

  etajerka: "Этажерки",
}

export const ELECTRONIC_CATEGORIES = {
  sp_phone: "Защищенные телефоны",
}

export const CATEGORIES_BY_DEPARTMENTS = {
  mebel: {
    name: "Мебель",
    categories: MEBEL,
  },

  electronics: {
    name: "Электроника",
    categories: ELECTRONIC_CATEGORIES,
  },
}

export default MEBEL

export const getRuCategoryName = category =>
  MEBEL[category] || ELECTRONIC_CATEGORIES[category] || ""

export const getAllCategories = () => ({
  ...MEBEL,
  ...ELECTRONIC_CATEGORIES,
})
