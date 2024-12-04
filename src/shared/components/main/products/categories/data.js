const IMAGE_URL = "shop/stuff/pages/main/webp/"
const getUrl = name => `url("${IMAGE_URL + name}.webp")`

export default [
  [
    {
      name: "Диваны",
      category: "divan",
      links: {
        Прямые: "",
        Угловые: "?Форма=Угловой",
      },

      style: {
        width: "330px",
        right: "30px",
        bottom: "0",
        backgroundImage: getUrl("Диван_прямой"),
      },
    },

    {
      name: "Кресла",
      category: "kresla",
      links: {
        Классические: "klassicheskie/",
        Компьютерные: "kompyuternie/",
        Геймерские: "igrovie_dlya-geimerov/",
      },
      style: {
        right: "20px",
        width: "320px",
        bottom: "-23px",
        backgroundImage: getUrl("2_кресла"),
      },
    },
  ],
  [
    {
      name: "Шкафы",
      category: "shkaf",
      links: {
        "Книжные": "?Тип=Книжный",
        "Шкафы-витрины": "?Тип=Шкаф-витрина",
        "Многофункциональные": "?Тип=Многофункциональный",
      },
      style: {
        right: "20px",
        bottom: "-38px",
        width: "225px",
        backgroundImage: getUrl("Шкаф"),
      },
    },
    {
      alight: "right",
      name: "Комоды",
      category: "komod",
      links: {
        Классик: "?Стиль=Классика",
        Модерн: "?Стиль=Модерн",
      },
      style: {
        right: "30px",
        bottom: "-50px",
        backgroundImage: getUrl("Комод"),
      },
    },

    {
      name: "Банкетки",
      category: "banketki",
      links: {
        "Классические": "klassicheskie/",
        "В прихожую": "v-prihozhuyu/",
        "Прикроватные": "prikrovatnie/",
      },

      style: {
        right: "30px",
        bottom: "-30px",
        width: "210px",
        height: "184px",
        backgroundImage: getUrl("Банкетка3"),
      },
    },
  ],
  [
    {
      name: "Кровати",
      category: "krovat",
      links: {
        Односпальные: "?Тип=Односпальная",
        Полуторные: "?Тип=Полуторная",
        Двухспальные: "?Тип=Двухспальная",
      },
      style: {
        right: "20px",
        bottom: "-32px",
        width: "390px",
        backgroundImage: getUrl("Кровать"),
      },
    },

    {
      name: "Столы",
      category: "stoli",
      links: {
        Обеденные: "obedennie/",
        Журнальные: "zhurnalnie/",
        Компьютерные: "kompyuternie/",
      },
      style: {
        right: "10px",
        width: "345px",
        bottom: "-10px",
        backgroundImage: getUrl("Стол_в_раскладке"),
      },
    },
  ],
]
