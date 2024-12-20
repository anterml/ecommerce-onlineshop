import translite from "utils/translite"

export const SECTIONS = {
  1: "Мебель",
  2: "Электроника",
  3: "Кресла",
  4: "Офисные",
  5: "Компьютерные",
  6: "Геймерские",
  7: "Интерьерные",
  8: "Детские",
  9: "Кресла-мешки",
  10: "Кресла-качалки",
  11: "Столы",
  12: "Кухонные",
  13: "Деревянные",
  14: "Стеклянные",
  15: "Раздвижные",
  16: "Белые",
  17: "Круглые",
  18: "Овальные",
  19: "Журнальные",
  20: "Обеденные",
  21: "Письменные",
  22: "Кофейные",
  23: "Столы-консоли",
  24: "Классика",
  25: "Для руководителя",
  26: "Для школьника",
  27: "Угловые",
  28: "С ящиками",
  29: "С полками",
  30: "Недорогие",
  31: "С тумбой",
  32: "С надстройкой",
  33: "Из массива",
  34: "С деревянной спинкой",
  35: "Трансформеры",
  36: "Лофт",
  37: "Руководителя",
  38: "С подъемным механизмом",
  39: "Маленькие",
  40: "Большие",
  41: "Кофейные столики",
  42: "Столы СК",
  43: "Столы КСТ",
  44: "Столы КС",
  45: "Столы Сокол",
  46: "Столы-шкафы",
  47: "Столы-консоли",
  48: "Игровые",
  49: "Приставные",
  50: "Металлические",
  51: "Дизайнерские",
  52: "На колесиках",
  53: "Банкетки",
  54: "Складные",
  55: "С зеркалом",
  56: "Без зеркала",
  57: "С подсветкой",
  58: "Откидные",
  59: "Трельяж",
  60: "Узкие",
  61: "Рабочие",
  62: "С приставкой",
  63: "С брифингом",
  64: "Туалетные столики",
  65: "Для кухни",
  66: "Барные",
  67: "Венские",
  68: "С подлокотниками",
  69: "Стулья-кресла",
  70: "Пластиковые",
  71: "Табуреты",
  72: "Мягкие",
  73: "Со спинкой",
  74: "Современные",
  75: "Высокие",
  76: "Для маленькой кухни",
  77: "Регулируемые",
  78: "Черные",
  79: "Красные",
  80: "Для кормления",
  81: "Для детского сада",
  82: "Для школьников",
  83: "Растущие",
  84: "Ортопедические",
  85: "С деревянным сиденьем",
  86: "Жесткие",
  87: "Для гостиной",
  88: "Крутящиеся",
  89: "Кожа",
  90: "Экокожа",
  91: "Хром",
  92: "Для дачи",
  93: "Садовые",
  94: "Прозрачные",
  95: "Стремянка",
  96: "В ванную",
  97: "Лестница",
  98: "Винтовые",
  99: "Квадратные",
  100: "Стулья",
  101: "Сервировочные столики",
  102: "В прихожую",
  103: "С сиденьем",
  104: "С ящиком",
  105: "Со спинкой",
  106: "Без спинки",
  107: "С полкой",
  108: "Прикроватные",
  109: "Для спальни",
  110: "Для обуви",
  111: "С каретной стяжкой",
  112: "Кресла-банкетки",
  113: "В спальню",
  114: "В коридор",
  115: "Пуфики",
  116: "Пуфики-мешки",
  117: "Пуфики-диваны",
  118: "Пуфики-столики",
  119: "Пуфики-кресла",
  120: "Регулируемые по высоте",
  121: "Кнопочные",
  122: "Противоударные",
  123: "Водонепроницаемые",
  124: "С мощным аккумулятором",
  125: "IP69",
  126: "IP68",
  127: "IP67",
  128: "IP54",
  129: "С рацией",
  130: "Защищенные телефоны",
  131: "Защищенные смартфоны",
  132: "Столы-шкафы",
  133: "С подсведкой",
  134: "Гамаки",
  135: "Качели",
  136: "Папасаны",
  137: "Престиж",
  138: "Кокон",
  139: "С реклайнером",
  140: "Ткань",
  141: "Сетка",
  142: "Серые",
  143: "Бежевые",
  144: "Коричневые",
  145: "Плетеные",
  146: "С подушкой",
  147: "Эргономичные",
  148: "Из ротанга",
  149: "Подвесные",
  150: "Раскладные",
  151: "Для дома",
  152: "С подножкой",
  153: "Маятниковые",
  154: "Массажные",
  155: "Для новорожденных",
  156: "Глайдер",
  157: "Груша",
  158: "Мяч",
  159: "Комоды",
  160: "С гладильной доской",
  161: "Под телевизор",
  162: "Пеленальные",
  163: "Широкие",
  164: "ЛДСП",
  165: "МДФ",
  166: "Глянцевые",
  167: "На ножках",
  168: "С гладильной доской",
  169: "Шкафы-купе",
  170: "Распашные",
  171: "В комнату",
  //"172": "На кухню",
  173: "Открытые",
  174: "Книжные",
  175: "Винные",
  176: "Одностворчатые",
  177: "Двухстворчатые",
  178: "Трехстворчатые",
  179: "2-дверные",
  180: "3-дверные",
  181: "4-дверные",
  182: "Со стеклом",
  183: "С фотопечатью",
  184: "Радиусные",
  185: "Встроенные",
  186: "Створчатые",
  187: "Для одежды",
  188: "Для белья",
  189: "Встраеваемые",
  190: "Шкафы-пеналы",
  191: "Шкафы-стенки",
  192: "Навесные",
  193: "Зеркальные",
  194: "Шкафы",
  195: "Шкафы-витрины",
  196: "Для посуды",
  197: "Напольные",
  198: "Для ванной",
}

export const ENG_NAMES = (function () {
  const buff = {}
  for (let index in SECTIONS) {
    if (SECTIONS.hasOwnProperty(index))
      buff[translite(SECTIONS[index], "-")] = Number(index)
  }
  return buff
})()
