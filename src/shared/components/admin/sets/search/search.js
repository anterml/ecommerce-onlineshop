import React, { PureComponent } from "react"
import request from "utils/request"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import Spinner from "globalComponents/spinners/inline"
import { getFullDate } from "utils/date"
import ProductResults from "./product-results"
import SetResults from "./set-results"
import SetList from "./set-list"

import { getAllCategories } from "utils/data/categories"
const CATEGORIES = getAllCategories()

const contexts = {
  collName: "Название коллекции",
  name: "Название продукта",
  productCode: "Код продукта",
}

export default class Search extends PureComponent {
  state = {
    text: "",
    context: "productCode",
    category: "all",
    values: [],
    hover: false,
    status: "",
    sets: [],
  }

  render() {
    const { text, context, category, values, hover, status, sets } = this.state
    const elems =
      context === "collName" ? (
        <SetResults {...{ text, values }} />
      ) : (
        <ProductResults {...{ text, values, context }} />
      )

    return (
      <Block>
        <Controls>
          <InputWrap>
            {status === "pending" && (
              <SpinnerWrap>
                <Spinner borderWidth="2" />
              </SpinnerWrap>
            )}
            <InputElem
              value={text}
              onChange={this.changeText}
              placeholder="Поиск..."
              onBlur={this.blur}
              onFocus={this.focus}
            />
          </InputWrap>
          <Select
            value={context}
            onChange={this.changeContext}
          >
            {Object.keys(contexts).map(name => (
              <option
                value={name}
                key={name}
              >
                {contexts[name]}
              </option>
            ))}
          </Select>
          <Select
            value={category}
            onChange={this.changeCategory}
            disabled={context === "collName"}
          >
            <option value="all">Все категории</option>
            {Object.keys(CATEGORIES).map(name => (
              <option
                value={name}
                key={name}
              >
                {CATEGORIES[name]}
              </option>
            ))}
          </Select>
        </Controls>
        {hover && <List onMouseDown={this.selectProduct}>{elems}</List>}
        {sets.length > 1 && (
          <SetList
            values={sets}
            select={this.selectSet}
          />
        )}
      </Block>
    )
  }

  selectSet = e => {
    this.props.changeRoute("id", e.target.dataset.id)
  }

  blur = e => {
    this.setState(state => ({ hover: false }))
  }

  focus = e => {
    this.setState(state => ({ hover: true }))
  }

  changeText = e => {
    this.search(e.target.value, this.state.context, this.state.category)
  }

  changeContext = e => {
    this.search(this.state.text, e.target.value, this.state.category)
  }

  changeCategory = e => {
    this.search(this.state.text, this.state.context, e.target.value)
  }

  search = (text, context, category) => {
    if (text.length < 2) {
      return this.setState(state => ({
        values: [],
        text,
        context,
        category,
        status: "",
      }))
    }

    const url =
      context === "collName"
        ? `admin/sets/search?name=${text}`
        : `admin/search?text=${text}&category=${category}&context=${context}`

    this.searchIndex = (this.searchIndex || 0) + 1
    this.handleSearch(url, text, context, category, this.searchIndex)
  }

  searchSet = (productId, index) => {
    const url = `admin/sets/search?productId=${productId}`
    request({ url }).then(result => {
      if (this.searchIndex !== index) return
      const sets = prepareSetsData(result)
      this.setState(state => ({ sets }))
      if (sets.length) {
        this.props.changeRoute("id", sets[0]._id)
      }
    })
  }

  handleSearch(url, text, context, category, index) {
    this.setState(() => ({ status: "pending", text }))
    request({ url }).then(result => {
      if (this.searchIndex !== index) return

      const values = context === "collName" ? prepareSetsData(result) : result

      this.setState({
        values: values || [],
        context,
        category,
        status: "",
      })
    })
  }

  selectProduct = e => {
    const { id } = e.target.dataset
    const { context } = this.state

    if (!id) return

    if (context === "collName") {
      this.props.changeRoute("id", id)
    } else {
      this.searchIndex = (this.searchIndex || 0) + 1
      this.searchSet(id, this.searchIndex)
    }
  }
}

function prepareSetsData(values) {
  return Array.isArray(values)
    ? values.map(set => {
        set.created.date = getFullDate(set.created.date)
        return set
      })
    : []
}

const Block = styled.div`
  position: relative;
  padding: 7px 15px;
  background: #ddd;
`

const Controls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const List = styled.div`
  position: absolute;
  background-color: #fff;
  left: 15px;
  right: 15px;
  z-index: 900;
  max-height: 448px;
  overflow: auto;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.41);
`

const InputWrap = styled.div`
  position: relative;
  flex: 1 1 auto;

  & input {
    padding-left: 25px;
  }
`

const SpinnerWrap = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1px;
  width: 15px;
  height: 15px;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
`

const InputElem = styled(Input)`
  width: 100%;
`

const Select = styled.select`
  padding: 8px 10px;
  margin-left: 5px;
`
