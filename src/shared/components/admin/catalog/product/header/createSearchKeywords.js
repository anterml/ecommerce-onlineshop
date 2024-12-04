export default ({ attrs, general: { category }, base }) => {
  const c = {
    banketka: {
      fieldNames: ["Особенности", "Тип"],
    },
    bufet: {
      fieldNames: [],
    },
    detskaya_krovat: {
      fieldNames: ["Тип"],
      appendKeywords: ["кровать", "детская"],
      replacingValues: {
        "Подъёмная кровать": "подъемная",
        "Детская кровать": "детская",
      },
    },

    divan: {
      fieldNames: ["Форма", "Тип раскладывания"],
    },

    divan_krovat: {
      fieldNames: ["Форма", "Тип раскладывания"],
    },

    etajerka: {
      fieldNames: ["Форма", "Установка", "Особенности"],
    },

    komod: {
      fieldNames: ["Особенности", "Тип", "Форма", "Размерность"],
    },

    kreslo: {
      fieldNames: ["Тип", "Конструктивные особенности", "Форма", "Размерность"],
    },
    kreslo_kachalka: {
      fieldNames: ["Тип", "Особенности"],
    },
    kreslo_meshok: {
      fieldNames: ["Тип"],
    },
    krovat: {
      fieldNames: [
        "Тип",
        "Внешний вид",
        "Решетка",
        "Установка",
        "Тип раскладывания",
      ],
      replacingValues: {
        "Подъёмная кровать": "подъемная",
      },
      ending: ["ой", "ый"],
      replacing: "ая",
    },
    kushetka: {
      fieldNames: [],
    },
    podstavka: {
      fieldNames: ["Форма", "Тип"],
      replacingValues: {
        Полукруг: "полукруглая",
      },
      ending: ["ой", "ый"],
      replacing: "ая",
    },
    polka: {
      fieldNames: ["Форма", "Установка", "Тип"],
      ending: ["ой", "ый"],
      replacing: "ая",
    },
    prihojaya: {
      fieldNames: ["Особенности", "Тип"],
    },
    puf: {
      fieldNames: ["Особенности", "Тип", "Форма", "Размерность"],
    },
    raskladushka: {
      fieldNames: [],
    },
    shkaf: {
      fieldNames: ["Тип", "Особенности", "Установка", "Размерность"],
      ending: ["ая"],
      replacing: "ый",
    },
    sofa: {
      fieldNames: ["Тип раскладывания", "Форма"],
      ending: ["ой", "ый"],
      replacing: "ая",
    },
    stelaj: {
      fieldNames: ["Форма"],
    },
    stenka: {
      fieldNames: ["Тип", "Тип раскладывания", "Установка", "Форма"],
      ending: ["ой", "ый"],
      replacing: "ая",
    },
    stol: {
      fieldNames: [
        "Тип",
        "Тип раскладывания",
        "Трансформация",
        "Форма",
        "Размерность",
        "Особенности",
      ],
    },
    // форма, тип
    stul: {
      fieldNames: ["Тип", "Трансформация", "Форма", "Особенности"],
    },

    // форма, тип
    taburet: {
      fieldNames: ["Тип", "Форма"],
    },
    tahta: {
      fieldNames: ["Внешний вид", "Форма"],
    },
    tualetniy_stolik: {
      fieldNames: ["Тип", "Форма", "Размерность", "Особенности", "Тип фасада"],
      appendKeywords: ["столик"],
    },
    tumba: {
      fieldNames: ["Тип", "Особенности"],
      replacingValues: {
        "ТВ тумба": "тв",
      },
    },
    veshalka: {
      fieldNames: ["Тип"],
    },
    vitrina: {
      fieldNames: [],
    },
    winniy_shkaf: {
      fieldNames: [],
      appendKeywords: ["шкаф"],
    },
    zerkalo: {
      fieldNames: ["Установка", "Форма"],
      ending: ["ая"],
      replacing: "ое",
    },
    sp_phone: {
      fieldNames: ["Особенности", "Защита", "Степерь защиты"],
    },
  }

  const { kind, imageFolder, urlName, productCode, price } = base
  if (!c[category]) return console.log("category not found", category)

  const { fieldNames, ending, replacing, replacingValues, appendKeywords } =
    c[category]
  const rvalues = replacingValues
    ? Object.keys(c[category].replacingValues)
    : ""

  const name = base.name.trim().replace(/"/g, "")

  const _keywords = [name.toLowerCase()]

  if (category === "sp_phone") _keywords.push(kind.trim().toLowerCase())
  else {
    _keywords.push(kind.toLowerCase().split(/\s+/)[0] || "")
  }

  if (appendKeywords) {
    _keywords.push.apply(_keywords, appendKeywords)
  }

  let brand
  for (let i = 0; i < attrs.length; ++i) {
    let { name, value } = attrs[i]

    if (fieldNames.indexOf(name) !== -1) {
      if (ending && ending.indexOf(value.substr(value.length - 2)) !== -1) {
        value = value.substr(0, value.length - 2) + replacing
      }
      if (replacingValues && rvalues.indexOf(value) !== -1) {
        value = replacingValues[value]
      }
      _keywords.push(value.toLowerCase())
    } else if (name === "Бренд") {
      brand = value
      _keywords.push(value.toLowerCase())
    }
  }

  // убрать дубликаты и пустые значения
  const keywords = []
  for (let i = 0; i < _keywords.length; ++i) {
    const keyword = _keywords[i]
    if (keyword && keywords.indexOf(keyword) === -1) keywords.push(keyword)
  }

  return {
    engCategory: category,
    name,
    urlName,
    imageUrl: imageFolder + "/ct/1.jpg",
    productCode: String(productCode),
    brand,
    keywords,
    type: kind,
    price,
  }
}
