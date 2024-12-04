import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { ObjectID } from "bson"

import asyncRequest from "utils/request"
import translite from "utils/translite"
import KINDS from "utils/data/kinds"
import Parts from "./kuhnya/parts"

import { Input } from "globalComponents/admin/elements"

const initialState = {
  name: "",
  general: false,
  vars: false,
  sattrs: false,
  attrs: false,
  attrsExtend: false,
  status: "",
  statusText: "",
  errors: [],
  parts: true,
  enabledParts: [],
}

export default class Clone extends Component {
  state = initialState

  render() {
    const {
      name,
      general,
      vars,
      sattrs,
      attrs,
      attrsExtend,
      statusText,
      status,
      errors,
      parts,
      enabledParts,
    } = this.state
    const { closePopup, product } = this.props
    const { dynamic } = product
    const canClonePart =
      dynamic.isTemplate || dynamic.parts.find(part => part.clone)

    return (
      <Fragment>
        <Overlay onClick={closePopup} />
        <Content>
          <div>
            <Title>Клонирование продукта</Title>
            <Input
              name="name"
              placeholder="Название"
              value={name}
              onChange={this.changeName}
            />
            <label>
              <input
                type="checkbox"
                name="general"
                checked={general}
                onChange={this.toggle}
              />
              Основные (описание)
            </label>
            <label>
              <input
                type="checkbox"
                name="vars"
                checked={vars}
                onChange={this.toggle}
              />
              Вариации (только поля)
            </label>
            <label>
              <input
                type="checkbox"
                name="sattrs"
                checked={sattrs}
                onChange={this.toggle}
              />
              Атрибуты обычные
            </label>
            <label>
              <input
                type="checkbox"
                name="attrs"
                checked={attrs}
                onChange={this.toggle}
              />
              <span>Атрибуты для поиска</span>
            </label>
            <label
              data-sub="1"
              data-disabled={!attrs}
            >
              <input
                type="checkbox"
                name="attrsExtend"
                checked={attrsExtend}
                disabled={!attrs}
                onChange={this.toggle}
              />
              Полностью
            </label>
            {product.general.category === "kuhnya" && canClonePart && (
              <Fragment>
                <label>
                  <input
                    type="checkbox"
                    name="parts"
                    checked={parts}
                    onChange={this.toggle}
                  />
                  <span>Модули</span>
                </label>
                <Parts
                  parts={dynamic.parts}
                  enabledParts={enabledParts}
                  toggle={this.togglePart}
                  enable={parts}
                />
              </Fragment>
            )}
            {!!errors.length &&
              errors.map(error => <ErrorText key={error}>{error}</ErrorText>)}
            {status !== "pending" && (
              <Controls>
                <button onClick={closePopup}>Отмена</button>
                <button onClick={this.clone}>Клонировать</button>
              </Controls>
            )}
            {statusText && (
              <StatusText data-status={status}>{statusText}</StatusText>
            )}
          </div>
        </Content>
      </Fragment>
    )
  }

  canClonePart = () => {}

  togglePart = e => {
    const { id } = e.target.dataset

    if (id) {
      if (id === "select all") {
        const { parts } = this.props.product.dynamic
        this.setState(state => ({
          enabledParts:
            parts.length !== state.enabledParts.length
              ? parts.map(part => part._id)
              : [],
        }))
      } else {
        this.setState(state => ({
          enabledParts: state.enabledParts.includes(id)
            ? state.enabledParts.filter(value => value !== id)
            : [...state.enabledParts, id],
        }))
      }
    }
  }

  toggle = e => {
    const { name, checked } = e.target
    this.setState(state => ({ [name]: checked }))
  }

  changeName = e => {
    const { value } = e.target
    this.setState(state => ({ name: value }))
  }

  clone = async () => {
    let {
      name,
      general,
      vars,
      attrs,
      sattrs,
      attrsExtend,
      parts,
      enabledParts,
    } = this.state
    const { product, changeProductRoute } = this.props
    const errors = []

    name = name.trim()
    if (!name) errors.push("Не указано название продукта")

    const { category } = product.general
    const kind = KINDS[category]

    if (!category || !kind) errors.push("Не получилось определить категорию")

    if (errors.length) return this.setState(state => ({ errors }))

    const urlName = translite(kind + "-" + name)

    const newProduct = {
      category,
      base: {
        name,
        urlName,
        imageFolder: urlName,
        kind,
      },
    }

    if (general) {
      newProduct.description = product.general.description
    }

    if (attrs) {
      const attrsFields = [
        "Назначение",
        "Размещение",
        "Страна производитель",
        "Бренд",
        "Цвет",
      ]

      newProduct.attrs = attrsExtend
        ? product.attrs
        : product.attrs.filter(attr => attrsFields.includes(attr.name))
    }

    newProduct.sattrs = sattrs
      ? product.sattrs
      : [{ name: "Гарантия", value: 12 }]

    if (vars) {
      const groups = product.vars.groups.map(group => ({
        ...group,
        _id: new ObjectID().toString(),
        fields: group.fields.map(field => ({
          ...field,
          _id: new ObjectID().toString(),
        })),
      }))

      newProduct.vars = { groups }
    }

    if (category === "kuhnya") {
      let data = []

      if (parts && enabledParts.length) {
        data = product.dynamic.parts
          .filter(p => enabledParts.includes(p._id))
          .map(part => ({
            ...part,
            clone: part.clone || {
              id: part._id,
              urlName: product.base.urlName,
              imageFolder: product.base.imageFolder,
            },
            _id: new ObjectID().toString(),
          }))
      }

      newProduct.dynamic = {
        parts: data,
      }
    }

    if (["detskaya_krovat", "krovat_cherdak"].includes(category)) {
      newProduct.category = "detskaya_krovat"
      const type = product.attrs.find(attr => attr.name === "Тип")

      if (type) {
        newProduct.base.kind = type.value
        if (Array.isArray(newProduct.attrs) && !attrsExtend)
          newProduct.attrs.push(type)
        else if (!Array.isArray(newProduct.attrs)) newProduct.attrs = [type]
      }
    }

    this.setState(state => ({
      status: "pending",
      statusText: "Создание кода продукта...",
      errors: [],
    }))

    try {
      // получить код продукта
      const { counter } = await asyncRequest({
        url: "admin/catalog/get-unique-productCode",
      })

      // проверка на валидность кода продукта
      if (typeof counter !== "number" || Number.isNaN(counter)) {
        return this.setState(state => ({
          status: "failure",
          statusText: "Ошибка при создании кода продукта",
        }))
      }

      this.setState(state => ({ statusText: "Клонирование..." }))

      // дополнительная подготовка данных продукта
      newProduct.base.productCode = counter
      newProduct.base.imageFolder += "-" + counter
      newProduct.base.urlName += "-" + counter

      // создание продукта
      const result = await asyncRequest({
        url: "admin/catalog/product",
        method: "post",
        data: newProduct,
      })

      this.setState(state => ({ status: "success", statusText: "" }))
      changeProductRoute(newProduct.base.urlName)
    } catch (error) {
      console.log(error)
      this.setState(state => ({
        status: "failure",
        statusText: "Не получилось создать продукт",
      }))
    }
  }
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(233, 233, 233, 0.95);
  z-index: 50;
  overflow: auto;
`

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 500;
  white-space: nowrap;
  padding: 15px 30px 20px;
  box-shadow: 0 0 2px 2px #aaa;
  border-radius: 2px;

  & input {
    width: 100%;
    margin-bottom: 5px;

    &:nth-of-type(1) {
      margin-bottom: 15px;
    }

    &[type="checkbox"] {
      width: auto;
      margin: 0 5px 0 0;
    }
  }

  & button {
    padding: 5px 10px;
    color: #222;
  }

  & label {
    display: flex;
    margin-bottom: 5px;
    width: 100%;
    align-items: center;
    user-select: none;
    cursor: pointer;
    &[data-sub="1"] {
      margin-left: 8px;
    }

    &[data-disabled="true"] {
      opacity: 0.5;
      color: #333 !important;
    }

    &:hover {
      color: #000;
    }
  }
`

const Title = styled.div`
  font-weight: 500;
  padding: 5px 0 15px;
`

const Controls = styled.div`
  margin-top: 25px;

  button:not(:last-child) {
    margin-right: 5px;
  }
`

const ErrorText = styled.div`
  color: red;
  margin: 15px 0;
  text-align: center;
`

const StatusText = styled.div`
  margin: 15px 0;
  text-align: center;
  color: #555;

  &[data-status="failure"] {
    color: red;
  }

  &[data-status="success"] {
    color: green;
  }
`
