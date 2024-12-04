import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"
import prettyPrice from "utils/prettyPrice"

import Spinner from "../spinner"
import Header from "./header"

import Image from "./image/image"
import Description from "./description"
import SeoText from "./seo-text"

import Vars from "./vars/vars"
import Attrs from "./attrs/attrs"
import AttrDetails from "./attr-details/attr-details"

import Details from "./details/details"
import Purchase from "./purchase/purchase"
import Breadcrumbs from "./breadcrumbs"

function getSeoDescription(product) {
  const { seoDescription, category } = product
  if (seoDescription) return seoDescription
  else if (category === "banketka")
    return `Купить банкетки в Санкт-Петербурге (Спб) Вы можете в одном из <a href="/kontakty">наших магазинов</a>.<br>Если вы привыкли к покупкам онлайн, Вы можете купить банкетку в нашем интернет-магазине, с доставкой.<br>Для более удобного поиска, мы создали отдельные категории товаров.<br>Вы можете сразу выбрать банкетку <a href="/catalog/mebel/banketki/v-prihozhuyu/" title="Купить банкетки в прихожую">в прихожую</a> или <a href="/catalog/mebel/banketki/dlya-spalni/" title="Купить банкетки в спальню">для спальни</a>, <a href="/catalog/mebel/banketki/so-spinkoi/" title="Купить банкетки со спинкой">со спинкой</a>, <a href="/catalog/mebel/banketki/s-yaschikom/" title="Купить банкетки с ящиком">с ящиком</a> или <a href="/catalog/mebel/banketki/s-sidenem/" title="Купить банкетки с сиденьем">сиденьем</a>.<br>Есть так же подборка <a href="/catalog/mebel/banketki/nedorogie/" title="Купить банкетки недорого">недорогих</a> моделей.<br>Все подборки вы можете посмотреть, перейдя в категорию <a href="/catalog/mebel/banketki/" title="Купить банкетки">банкетки</a>.`
  else if (category === "puf")
    return `Купить пуфики в Санкт-Петербурге (Спб) Вы можете в одном из <a href="/kontakty">наших магазинов</a>.<br>Если вы привыкли к покупкам онлайн, Вы можете купить пуфики в нашем интернет-магазине, с доставкой.<br>Для более удобного поиска, мы создали отдельные категории товаров.<br>Вы можете сразу выбрать <a href="/catalog/mebel/pufiki/detskie/" title="Купить  детские пуфики">детские</a> пуфики, <a href="/catalog/mebel/pufiki/v-prihozhuyu/" title="Купить пуфики в прихожую">в прихожую</a>, <a href="/catalog/mebel/pufiki/v-spalnyu/" title="Купить пуфики в спальню">в спальню</a> или пуфики <a href="/catalog/mebel/pufiki/s-yaschikami/" title="Купить пуфики с ящиками">с ящиками</a>.<br>Есть так же подборка <a href="/catalog/mebel/pufiki/nedorogie/" title="Купить пуфики недорого">недорогих</a> моделей.<br>Все подборки вы можете посмотреть, перейдя в категорию <a href="/catalog/mebel/pufiki/" title="Купить пуфики">пуфики</a>.`
}

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.prepare(props)
  }

  prepare(props) {
    const { category, base, vars } = props.product

    // вычислить адрес картинки для модулей
    if (category === "kuhni") {
      const rootImageUrl = "shop/category/furniture"
      this.partImageUrl = `${rootImageUrl}/${category}/${base.imageFolder}/m`
    }

    const { groups, configurations, settings } = vars
    this.vars = vars
    // делаем быстрый доступ полей по айди
    this.varFields = []
    this.varFieldsById = {}
    groups.forEach(group => {
      group.fields.forEach(field => (this.varFieldsById[field._id] = field))
    })

    // в каком поле изначально искать картинку
    if (category === "zerkalo") this.imageField = "Цвет багета"
    else if (category === "sp_phone") this.imageField = "Цвет"
    else this.imageField = "Цвет каркаса"

    let selectedVars = {}
    let topFieldId, topGroupName

    // настройки по умолчанию
    if (settings) {
      let { instock, selectedFieldIds } = settings

      // наличие
      this.defaultInstock =
        typeof instock === "number" && instock !== -2 ? instock : -1

      // если указан частичный код продукта,
      // тогда показываем поля по умолчанию по нему.
      if (props.query.pc) {
        const pc = props.query.pc.split("-").map(pos => parseInt(pos) - 1)

        if (pc.length === groups.length) {
          let wrong
          const buff = []

          groups.forEach((group, i) => {
            const field = group.fields[pc[i]]
            if (field) {
              buff.push(field._id)
            } else {
              console.warn("Не найден частичный код продукта в индексе", i)
              wrong = true
            }
          })

          if (!wrong) {
            selectedFieldIds = buff
          }
        }
      }

      // установка состояния с полями по умолчанию или по частичному коду продукта
      if (selectedFieldIds) {
        groups.forEach((group, k) => {
          let defaultField = group.fields[0]

          for (let i = 0; i < group.fields.length; ++i) {
            if (selectedFieldIds.indexOf(group.fields[i]._id) !== -1) {
              defaultField = group.fields[i]
              break
            }
          }

          if (!defaultField) {
            console.warn(
              "Для группы",
              group.name,
              "не удалось определить поле по умолчанию",
            )
          } else if (k === 0) {
            topGroupName = group.name
            topFieldId = defaultField._id
          }

          selectedVars[group.name] = defaultField._id
        })
      }
    }

    this.state = { selectedVars }

    if (topGroupName && topFieldId) {
      const newSelectedVars = this.getSelectedVars(0, topGroupName, topFieldId)

      let defaultFieldMatch = true
      const beforeSelectedGroupName = Object.keys(selectedVars)
      const afterSelectedGroupName = Object.keys(newSelectedVars)
      if (beforeSelectedGroupName.length === afterSelectedGroupName.length) {
        for (let i = 0; i < beforeSelectedGroupName.length; ++i) {
          if (
            selectedVars[beforeSelectedGroupName[i]] !==
            newSelectedVars[beforeSelectedGroupName[i]]
          ) {
            defaultFieldMatch = false
            break
          }
        }
      } else {
        defaultFieldMatch = false
      }

      if (!defaultFieldMatch) {
        console.warn("Нет совпадения с полями по умолчанию!")
      }
      this.state.selectedVars = newSelectedVars
    } else {
      console.warn("При загрузке не найдены самая верхняя группа и айди поля")
    }

    this.calcConfigurationCode(selectedVars, props, !!props.query.pc)
    this.calcParts(selectedVars)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.status !== this.props.status &&
      nextProps.status === "fulfilled"
    ) {
      this.prepare(nextProps)
    }

    try {
      if (
        nextProps.category === "kuhni" &&
        nextProps.product.dynamic.parts !== this.props.product.dynamic.parts
      ) {
        this.calcParts(this.state.selectedVars, nextProps)
      }
    } catch (e) {
      this.parts = []
    }
  }

  calcParts(selectedVars, nextProps) {
    // вычислить добавочную цену
    const { category, dynamic } = (nextProps || this.props).product

    if (category !== "kuhni") {
      this.parts = []
      return
    }

    const parts = (dynamic || {}).parts || []

    this.parts = parts.map(part => {
      let fieldsPrice = 0
      for (let groupName in selectedVars) {
        const varField = this.varFieldsById[selectedVars[groupName]]
        if (!varField) continue

        // если поле есть в списке свойств модулей
        if (PART_PROPERTIES.indexOf(groupName) !== -1) {
          const properties = PART_CATEGORIES[part.baseFields.type]
          if (!properties || properties.indexOf(groupName) === -1) {
            continue
          }
        }

        const targetField = part.vars.find(v => v.id === varField._id)
        const price = targetField ? targetField.price : varField.price
        fieldsPrice += price || 0
      }

      const basePrice = parseInt(part.baseFields.price || 0)
      const totalPrice = basePrice + fieldsPrice

      return {
        ...part,
        totalPrice,
      }
    })
  }

  changeConfigurationByImageClick = imageUrl => {
    const { configurations, groups } = this.props.product.vars

    const selectedVars = {
      ...this.state.selectedVars,
    }

    let field

    const configuration = configurations.filter(
      c => (c.imageUrl || "").trim() === (imageUrl || "").trim(),
    )[0]

    if (configuration) {
      console.log("found conf", configuration)
      const configurationFields = configuration.fieldIds
        .filter(id => this.varFieldsById[id])
        .map(id => this.varFieldsById[id])

      configurationFields.forEach(({ _id, name }) => (selectedVars[name] = _id))

      field = configurationFields[0]
      /*
      const target = configurationFields.find(f => f.name === "Размеры")
      const groupNames = groups.map(group => group.name)

      let maxPos = Number.MAX_SAFE_INTEGER
      let targetField = null
      configurationFields.forEach(f => {
        const pos = groupNames.indexOf(f.name)
        if(pos !== -1 && maxPos > pos) {
          maxPos = pos
          targetField = f
        }
      })
      
      console.log(maxPos, targetField)
      const c = configuration.fieldIds
      .filter(id => this.varFieldsById[id])
      .map(id => {
        const { name, value, price } = this.varFieldsById[id]
        return name + ": " + value + " " + (price || 0) + " руб."
      })
      console.log(c)
      field = targetField
      field = target
      */
    } else {
      let found
      for (let i = 0; i < groups.length; ++i) {
        const group = groups[i]

        for (let k = 0; k < group.fields.length; ++k) {
          if (group.fields[k].imageUrl === imageUrl) {
            console.log("found in vars", group.name, group.fields[k]._id)
            found = true
            field = group.fields[k]
            selectedVars[group.name] = group.fields[k]._id
            break
          }
        }
      }

      if (!found) {
        console.log("config is not found")
        return false
      }
    }

    if (!field) return

    this.state.selectedVars = selectedVars
    const { _id, name } = field
    this.changeSelectedVars(name, _id)
    return true
  }

  goToAdminPage = e => {
    const { auth, product } = this.props

    const url = `/admin/catalog=${product.category}/product=${product.base.urlName}/?pt=base`
    if (auth.admin) window.open(url, "_blank")
  }

  changeSelectedVars = (fieldName, fieldId) => {
    // найти уровень группы, с которой нужно начать пересчет полей.
    let pos
    const { groups } = this.props.product.vars
    //const groups = this.varFields
    for (let i = 0; i < groups.length; ++i) {
      const group = groups[i]
      if (group.name === fieldName) {
        pos = i + 1
        break
      }
    }
    const selectedVars = this.getSelectedVars(pos, fieldName, fieldId)
    this.calcConfigurationCode(selectedVars, null, true)
    this.setState({ selectedVars })
    this.calcParts(selectedVars)
  }

  getSelectedVars = (pos, currentGroupName, currentFieldId) => {
    const { groups } = this.vars
    const topElems = groups.slice(0, pos - 1)
    const middleElem = groups[pos]
    const bottomElems = groups.slice(pos)
    const selectedVars = {}
    // Сохраняем верхние уровни групп
    topElems.forEach(group => {
      if (!this.state.selectedVars[group.name])
        return console.warn(
          'Не получилось найти предыдущее состояние "верхней" группы',
          group.name,
        )
      selectedVars[group.name] = this.state.selectedVars[group.name]
    })

    // включаем текущий уровень (на который нажали)
    selectedVars[currentGroupName] = currentFieldId

    // берем все поля для групп из верхних уровней
    this.varFields = this.varFields.filter(group => group.name in selectedVars)

    // убираем ненужные поля уровнями ниже если нужно
    if (bottomElems.length) {
      // обрабатываем нижние уровни
      bottomElems.forEach(group => {
        // Найти все конфигурации, которые подходят под выбранные поля
        const matchConfigurations = this.getMatchConfigurations(selectedVars)

        // Группы, которые надо скрыть
        const skipGroupIds = matchConfigurations.reduce((prev, curr) => {
          return prev.concat(curr.skipGroupIds)
        }, [])

        if (skipGroupIds.indexOf(group._id) !== -1)
          return console.log("Группа", group.name, "скрыта глобально")

        let resultFields
        // если поля группы скрыты по умолчанию
        if (group.hideFields) {
          // поля, которые нужно включить в выдачу
          const includeFieldIds = matchConfigurations.reduce((prev, curr) => {
            return prev.concat(curr.includeFieldIds)
          }, [])

          // поля, которые доступны для выбора
          resultFields = group.fields.filter(
            field => includeFieldIds.indexOf(field._id) !== -1,
          )
        } else {
          // поля, которые нужно исключить из выдачи
          const skipFieldIds = matchConfigurations.reduce((prev, curr) => {
            return prev.concat(curr.skipFieldIds)
          }, [])

          // Найти названия всех групп, в которых может находится звездочка *
          const starGroups = skipFieldIds
            .filter(id => (this.varFieldsById[id] || {}).value === "*")
            .map(id => this.varFieldsById[id].name)

          // исключить группу полностью, если звездочка
          if (starGroups.indexOf(group.name) !== -1)
            return console.log(
              "Группа",
              group.name,
              "была полностью исключена звездочкой *",
            )

          // поля, которые доступны для выбора (также не включаем поле звездочка *)
          resultFields = group.fields.filter(
            field =>
              skipFieldIds.indexOf(field._id) === -1 &&
              this.varFieldsById[field._id].value !== "*",
          )
        }

        // если для выбора не осталось ни одного поля
        if (resultFields.length === 0) {
          return console.warn(
            "Не найдено ни одного поля для группы",
            group.name,
          )
        }

        // предыдущее выбранное поле из этой группы
        const prevSelectedFieldId = this.state.selectedVars[group.name]

        // если оно есть и доступно для выбора
        // "оставляем его" выбранным
        if (
          prevSelectedFieldId &&
          resultFields.map(f => f._id).indexOf(prevSelectedFieldId) !== -1
        ) {
          selectedVars[group.name] = prevSelectedFieldId
        }
        // иначе берем самое первое (левое\верхнее)
        else {
          selectedVars[group.name] = resultFields[0]._id
        }

        // присоединяем текущую группу полей
        this.varFields.push({
          ...group,
          fields: resultFields,
        })
      })
    }

    // все ненужные поля исключены,
    // и selectedVars имеет валидные айди
    // поэтому берем все конфигурации, которые совпадают,
    // чтобы вычислить цену, наличие и пр.
    const matchConfigurations = this.getMatchConfigurations(selectedVars)

    // вычислить добавочную цену
    this.additionalPrice = 0
    for (let groupName in selectedVars) {
      const varField = this.varFieldsById[selectedVars[groupName]]
      if (varField) this.additionalPrice += parseInt(varField.price) || 0
    }

    const selectedVarIds = Object.keys(selectedVars).map(
      name => selectedVars[name],
    )
    // вычислить состояние наличия
    this.findField(
      matchConfigurations.filter(variant => variant.instock !== -2),
      selectedVarIds,
      "instock",
      this.defaultInstock,
    )

    // вычислить артикул
    this.findField(
      matchConfigurations.filter(variant => variant.article),
      selectedVarIds,
      "article",
      this.props.product.article,
    )

    // вычислить картинку
    const bodyColorId = selectedVars[this.imageField]
    this.findField(
      matchConfigurations.filter(variant => variant.imageUrl),
      selectedVarIds,
      "imageUrl",
      bodyColorId ? this.varFieldsById[bodyColorId].imageUrl : "1.jpg",
    )

    const wildcards = {}
    // спрятать все принты
    return selectedVars
  }

  getMatchConfigurations(selectedVars) {
    return this.vars.configurations.filter((configuration, k) => {
      const { fieldIds } = configuration

      for (let i = 0; i < fieldIds.length; ++i) {
        const id = fieldIds[i]
        const field = this.varFieldsById[id]

        // неправильная конфигурация (присутствует старое удаленное поле)
        if (!field) {
          /*
          console.warn(
            `Предупреждение: в конфигурации ${k + 1} присутствует старое удаленное поле.`,
            "Игнорирую."
          )
          */
          continue
        }

        if (fieldIds.indexOf(selectedVars[field.name]) === -1) return false
      }

      console.info("Найдена конфигурация", k + 1)
      return true
    })
  }

  calcConfigurationCode(selectedVars, nextProps, needChangeUrl) {
    const obj = {}
    const productCode = []
    const props = nextProps || this.props

    props.product.vars.groups.forEach(group => {
      const ids = group.fields.map(({ _id }) => _id)
      let pos = 0

      if (group.name in selectedVars) {
        pos = ids.indexOf(selectedVars[group.name]) + 1
      }

      obj[group.name] = pos
      productCode.push(obj[group.name])
    })

    const oldConfigurationCode = this.configurationCode
    this.configurationCode = productCode.join("-")

    if (needChangeUrl && this.configurationCode !== oldConfigurationCode) {
      props.history.replace({
        pathname: props.location.pathname,
        search: qs.stringify({ ...props.query, pc: this.configurationCode }),
      })
    }
  }

  findField(configurations, selectedVarIds, fieldName, defaultValue) {
    let pos = -1

    for (let i = 0; i < configurations.length; ++i) {
      let score = 0
      configurations[i].fieldIds.forEach(id => {
        if (selectedVarIds.indexOf(id) !== -1) score += 1
      })

      if (score > pos) pos = i
    }

    this[fieldName] = pos > -1 ? configurations[pos][fieldName] : defaultValue
  }

  getTotalPrice() {
    const { category, base } = this.props.product
    const totalPrice =
      category === "kuhni"
        ? this.parts
            .filter(part => part.baseFields.inset)
            .reduce((p, c) => parseInt(p + c.totalPrice), 0)
        : base.price + this.additionalPrice

    return totalPrice
  }

  render() {
    const { product, cart, history, actions, status, auth, department } =
      this.props
    const { productCode, name, urlName, imageFolder, kind, oldPrice } =
      product.base
    const { category, images, description, vars, breadcrumbs } = product
    const {
      varFields,
      changeSelectedVars,
      imageUrl,
      changeConfigurationByImageClick,
    } = this
    const { selectedVars } = this.state
    const _totalPrice = this.getTotalPrice()
    const totalPrice = prettyPrice(_totalPrice)
    const fullName = (kind || "") + " " + name
    const { instockPlaces } = vars.settings
    const seoDescription = getSeoDescription(product)

    return (
      <Block className={auth.admin && "isAdmin"}>
        <Breadcrumbs
          category={category}
          productName={fullName}
          department={department}
          breadcrumbs={breadcrumbs}
        />
        <Header
          productCode={productCode}
          name={fullName}
          goToAdminPage={this.goToAdminPage}
          isAdmin={auth.admin}
        />
        <Layout>
          <LayoutItem1>
            <Image
              {...{
                category,
                imageFolder,
                urlName,
                imageUrl,
                images,
                selectedVars,
                fullName,
                changeConfigurationByImageClick,
              }}
            />
            <Description
              text={description}
              category={category}
              name={name}
              kind={kind}
            />
            {!!seoDescription && <SeoText text={seoDescription} />}
            <AttrDetails attrs={product.attrDetails} />
          </LayoutItem1>
          <LayoutItem2>
            <Title>Характеристики</Title>
            <Vars
              {...{
                varFields,
                category,
                imageFolder,
                selectedVars,
                urlName,
                totalPrice,
                changeSelectedVars,
              }}
            />
            <Attrs {...{ category, selectedVars, product }} />
          </LayoutItem2>
          <LayoutPurchage>
            <Title>Покупка</Title>
            <Details
              category={category}
              price={_totalPrice}
              currentPrettyPrice={totalPrice}
              oldPrettyPrice={oldPrice ? prettyPrice(oldPrice) : ""}
              instock={this.instock}
              instockPlaces={instockPlaces}
              creditPrice={prettyPrice(
                Math.floor((product.base.price + this.additionalPrice) / 24),
              )}
              warranty={product.warranty}
              availableVisibility={vars.settings.availableVisibility}
            />
            <Purchase
              product={product}
              totalPrice={this.getTotalPrice()}
              cart={cart}
              configurationCode={this.configurationCode}
              image={imageUrl}
              actions={actions.cart}
              history={history}
            />
          </LayoutPurchage>
        </Layout>
        {status === "pending" && (
          <Overlay>
            <Spinner />
          </Overlay>
        )}
      </Block>
    )
  }
}

const Block = styled.div`
  position: relative;
`

const Title = styled.h2`
  margin: 0 0 10px;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;
  @media (min-width: 580px) {
    display: none;
  }
`

const Layout = styled.div`
  display: flex;
  flex: 0 0 auto;
  @media (max-width: 1023px) {
    flex-wrap: wrap;
  }
`

const LayoutItem1 = styled.div`
  flex: 1 1 auto;
  margin-right: 25px;
  overflow: hidden;
  @media (max-width: 1023px) {
    margin-bottom: 15px;
    margin-right: 0;
  }
`

const LayoutItem2 = styled.div`
  flex: 0 0 258px;
  align-self: flex-start;
  position: relative;
  margin-bottom: 30px;

  @media (min-width: 581px) {
    margin-bottom: 0;
    margin-right: 25px;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
  }
`

const LayoutPurchage = styled.div`
  flex: 0 0 258px;
  @media (max-width: 580px) {
    flex: 1 1 auto;
  }
  @media (min-width: 581px) and (max-width: 1023px) {
    margin-top: 25px;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.75);
`