import React, { Component } from "react"
const title = "Пользовательское соглашение об использовании персональных данных"

export default class PolzovatelskoeSoglashenie extends Component {
  static title = title

  componentDidMount() {
    document.title = title
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <main
        style={{ paddingBottom: "50px", fontSize: "14px", paddingTop: "20px" }}
      >
        <h1>{title}</h1>
        <p>
          В рамках настоящего Пользовательского соглашения описаны правила
          (далее – Правила), являющиеся официальным документом Индивидуального
          предпринимателя Ермаленка Андрея Антоновича, которые определяют
          порядок обработки и защиты информации о физических лицах, пользующихся
          услугами интернет-магазина https://www.yoursite.ru и его поддоменов
          (далее – Сайт).
        </p>

        <p>
          В соответствие с п. 1 Статьи 1 главы 1 Федерального закона Российской
          Федерации от 27 июля 2006 г. № 152-ФЗ «О персональных данных» в рамках
          настоящего Соглашения под персональными данными понимается следующее
          понятие: «Персональные данные – любая информация, относящаяся к
          определенному или определяемому на основании такой информации
          физическому лицу (субъекту персональных данных), в том числе его
          фамилия, имя, отчество, год, месяц, дата и место рождения, адрес,
          семейное, социальное, имущественное положение, образование, профессия,
          доходы, другая информация».
        </p>

        <p>
          Целью настоящих Правил является обеспечение надлежащей защиты
          информации физических лиц, субъектов персональных данных (Далее –
          Пользователь), в том числе их персональных данных, от
          несанкционированного доступа и разглашения.
        </p>

        <p>
          Отношения, связанные со сбором, хранением, распространением и защитой
          информации о Пользователях Сайта, регулируются настоящими Правилами,
          иными официальными документами Администрации Сайта и действующим
          законодательством Российской Федерации.
        </p>

        <p>
          Настоящие Правила являются публичным документом, доступным на Сайте
          любому Пользователю сети Интернет. Администрация Сайта вправе вносить
          изменения в настоящие Правила. При внесении изменений в Правила
          Администрация Сайта уведомляет об этом пользователей путем размещения
          новой редакции Правил на Сайте.
        </p>

        <p>
          Используя Сайт, Пользователь выражает свое согласие с условиями
          настоящих Правил.
        </p>

        <p>
          При использовании Сайта Пользователь предоставляет Администрации Сайта
          необходимую достоверную и актуальную информации, а также необходимые
          для обработки путем заполнения полей форм онлайн-заявок персональные
          данные Пользователя в соответствие с формой, заполняемой на Сайте.
        </p>

        <p>
          В случае несогласия Пользователя с настоящими Правилами или их
          обновлениями, Пользователь обязан отказаться от его использования,
          проинформировав об этом Администрацию Сайта в установленном порядке.
        </p>

        <p>
          Принимая настоящее Соглашение Пользователь подтверждает свое согласие
          на обработку Администрацией его персональных данных, предоставленных
          при использовании сайта. Обработка персональных данных Пользователя
          осуществляется в соответствии с законодательством Российской
          Федерации. В соответствии с п.3) Статьи 1 Главы 1 Федерального закона
          Российской Федерации от 27 июля 2006 г. № 152-ФЗ «О персональных
          данных»: «Обработка персональных данных — действия (операции) с
          персональными данными, включая сбор, систематизацию, накопление,
          хранение, уточнение (обновление, изменение), использование,
          распространение (в том числе передачу), обезличивание, блокирование,
          уничтожение персональных данных.
        </p>

        <p>Права и обязанности Администрации Сайта:</p>

        <p>
          Администрация Сайта принимает все необходимые меры для защиты от
          неправомерного доступа, изменения, раскрытия или уничтожения
          персональных данных Пользователя;
        </p>
        <p>
          Администрация Сайта предоставляет доступ к персональным данным
          Пользователя только тем третьим лицам, которым эта информация
          необходима для обеспечения функционирования Сайта, а также разрешает
          использовать предоставленные Пользователем персональные данные в целях
          обеспечения соблюдения требований действующего законодательства
          Российской Федерации (в том числе в целях предупреждения и/или
          пресечения незаконных и/или противоправных действий Пользователей);
        </p>
        <p>
          Администрация Сайта вправе обрабатывать персональные данные
          посредством внесения их в электронные базы данных, включения в списки
          (реестры) и внутренние отчетные формы. Обработка персональных данных
          может быть, как автоматизированная, так и без использования средств
          автоматизации.
        </p>
        <p>
          Соглашение действует бессрочно с момента предоставления Пользователем
          своих данных и может быть отозвано Пользователем в любой момент путем
          направления Пользователем соответствующего распоряжения или заявления
          в простой письменной форме на адрес электронной почты email:
          info@yoursite.ru
        </p>
      </main>
    )
  }

  shouldComponentUpdate() {
    return false
  }
}
