import React, { Component } from "react"
import styled from "styled-components"
import request from "superagent"
import prettyPrice from "utils/prettyPrice"
import Category from "./category"
import { withRouter } from "react-router-dom"

import { PRODUCT_KEYWORDS, KEYWORDS } from "./keywords"
const rootImageUrl = "shop/category/"

class Search extends Component {
  state = {
    text: [],
    results: [],
    context: "general",
    productResults: [],
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  render() {
    const productResults = this.state.productResults.slice(0, 8)
    const len = 10 - productResults.length

    const categoryElems = this.state.results.slice(0, len).map((word, i) => (
      <Category
        keywords={KEYWORDS}
        word={word}
        key={i}
      />
    ))
    const productElems = productResults.map(
      (
        { name, type, brand, price, keywords, imageUrl, engCategory, urlName },
        i,
      ) => {
        const _keywords = []
        const skipWords = [name, type.split(/\s+/)[0], brand].map(v =>
          (v || "").toLowerCase(),
        )
        for (let i = 0; i < this.state.text.length; ++i) {
          keywords
            .filter(keyword => skipWords.indexOf(keyword) === -1)
            .forEach(keyword => {
              if (
                skipWords.indexOf(keyword) === -1 &&
                keyword.indexOf(this.state.text[i]) !== -1 &&
                _keywords.indexOf(keyword) === -1
              )
                _keywords.push(keyword)
            })
        }

        const department =
          engCategory === "sp_phone" ? "electronics" : "furniture"
        const linkDepartment =
          engCategory === "sp_phone" ? "electronics" : "mebel"
        return (
          <Item
            key={i}
            data-url={`/${linkDepartment}/${engCategory}/${urlName}`}
            onMouseDown={this.toProductPage}
          >
            <Image
              style={{
                backgroundImage: `url(${
                  rootImageUrl + department
                }/${engCategory}/${imageUrl})`,
              }}
            />
            <Details>
              <span>
                <Value>{name}</Value>
                <Value>{type}</Value>
                {_keywords
                  .filter(value => type.toLowerCase().indexOf(value) === -1)
                  .map((value, i) => (
                    <Value key={i}>{value}</Value>
                  ))}
              </span>
              <Info>{prettyPrice(price)} руб.</Info>
              <Info>Фабрика {brand}.</Info>
            </Details>
          </Item>
        )
      },
    )

    const hasResults = !!(productElems.length || categoryElems.length)
    const { show, context } = this.state
    return (
      <Block>
        <Wrap>
          <Input
            placeholder="Я ищу..."
            autoComplete="off"
            innerRef={this.input}
            onChange={this.search}
            onFocus={this.show}
            onBlur={this.hide}
          />
          {hasResults && (
            <Results className={!show && "hidden"}>
              {productElems}
              <div onMouseDown={this.toCategoryPage}>{categoryElems}</div>
            </Results>
          )}
        </Wrap>
        <Select
          value={context}
          onChange={this.changeContext}
        >
          <option value="general">Общий поиск</option>
          <option value="productCode">Код продукта</option>
        </Select>
      </Block>
    )
  }

  show = e => {
    this.setState(state => ({ show: true }))
  }

  hide = e => {
    this.setState(state => ({ show: false }))
  }

  toProductPage = e => {
    const { url } = e.currentTarget.dataset
    if (!url) return false

    if (e.nativeEvent.which === 3) window.open(url, "_blank")
    else {
      this.props.history.push({
        pathname: url,
      })
    }
  }

  toCategoryPage = e => {
    const { url } = e.target.dataset

    if (url) {
      const data = {}
      const [category, query] = url.split("?")
      data.pathname = category
      if (query) {
        const [name, value] = query.split("=")
        data.query = { [name]: value }
      }

      if (e.nativeEvent.which === 3) window.open(url, "_blank")
      else {
        this.props.history.push(data)
      }
    }
  }

  searchProducts = value => {
    const keywords = value
      .trim()
      .replace(/ё/g, "е")
      .toLowerCase()
      .split(/\s+/)
      .join(";")
    const searchWords = value
      .trim()
      .replace(/ё/g, "е")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .split(" ")
    const url = `/api/v1/fulltext-search?keywords=${keywords}`
    request.get(url, (err, response) => {
      this.setState({
        text: searchWords,
        productResults: response.body,
        results: [],
      })
    })
  }

  searchProductsByProductCode(value) {
    const text = value.replace(/[^\d]+/g, "")
    const productCode = parseInt(text) || 0
    if (!productCode) {
      this.input.current.value = ""
      return this.setState({
        text,
        productResults: [],
        result: [],
      })
    }

    const url = `/api/v1/fulltext-search?keywords=${productCode}&context=productCode`
    request.get(url, (err, response) => {
      this.setState({
        text,
        productResults: response.body,
        result: [],
      })
    })
  }

  search = e => {
    this.prepare(e.target.value)
  }

  prepare(value) {
    const { context } = this.state
    if (context === "productCode")
      return this.searchProductsByProductCode(value)

    const searchWords = value
      .trim()
      .replace(/ё/g, "е")
      .replace(/\s+/g, " ")
      .toLowerCase()
      .split(" ")

    let matchWords = []

    if (searchWords.find(w => PRODUCT_KEYWORDS.includes(w))) {
      console.log("only")
    }
    matchWords = Object.keys(KEYWORDS).filter(keyword => {
      const keywords = keyword.toLowerCase().split(/\s+\|\s+|\s+/g)
      //console.log('k', keywords)
      for (let i = 0; i < searchWords.length; ++i) {
        if (keywords.find(k => k.indexOf(searchWords[i]) === 0)) return true
      }

      return false
    })

    if (searchWords.length === 1) {
      const groups = {}
      const buff = []
      matchWords.forEach(word => {
        const [name, ...values] = word.split(" | ")
        if (values.length) {
          if (!groups[name]) groups[name] = []
          groups[name] = groups[name].concat(values)
        } else {
          buff.push(name)
        }
      })

      matchWords = buff.concat(
        Object.keys(groups).map(name =>
          groups[name].length === 1
            ? name + " | " + groups[name][0]
            : { name, values: groups[name] },
        ),
      )
    }

    if (matchWords.length) {
      console.log("if", matchWords)
      for (let i = 0; i < searchWords.length; ++i) {
        if (PRODUCT_KEYWORDS.indexOf(searchWords[i]) !== -1) {
          return this.searchProducts(value)
        }
      }

      this.setState({
        productResults: [],
        text: searchWords,
        results: matchWords,
      })
    } else if (value.trim().length > 2) {
      console.log("else", matchWords)
      this.searchProducts(value)
    }
  }

  changeContext = e => {
    const { value } = e.target
    if (value && this.state.context !== value) {
      this.setState(
        state => ({ context: value, show: true }),
        () => {
          this.prepare(this.input.current.value)
          this.input.current.focus()
        },
      )
    }
  }
}

export default withRouter(Search)

const Block = styled.div`
  font-size: 13px;
  color: #333;
  display: flex;
  width: 100%;
`

const Wrap = styled.div`
  position: relative;
  flex: 0 1 631px;

  @media (max-width: 767px) {
    flex: 1 1 auto;
  }
`

const Input = styled.input`
  width: 100%;
  background: white;
  font-size: 13px;
  color: #555;

  @media (max-width: 767px) {
    border: 1px solid #ddd;
    padding: 8px 8px;
  }

  @media (min-width: 768px) {
    //width: 631px;
    padding: 10px 8px;
    border: 2px solid transparent;
    border-radius: 3px 0 0 3px;
  }

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none !important;
  }
`

const Results = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.41);
  padding: 0 10px 5px;
  border-radius: 0 0 3px 3px;
  margin-top: -2px;
`

const Item = styled.div`
  display: flex;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  align-items: center;

  &:last-child {
    border: none;
  }

  :hover {
    background-color: #cfd5d9;
  }
`

const Image = styled.div`
  width: 42px;
  height: 42px;
  margin-right: 5px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px 10px;
`

const Value = styled.span`
  color: #333;
  margin-right: 4px;
  white-space: nowrap;
  &:first-child {
    font-weight: 500;
  }
`

const Info = styled.span`
  color: #999;
  margin-right: 5px;
  white-space: nowrap;
`

const Select = styled.select`
  padding: 4px 8px;
  color: #555;
  background: #3980af;
  border: none;
  border-left: 1px solid #ddd;
  border-radius: 0 3px 3px 0;
  background-color: #fff;

  @media (max-width: 767px) {
    display: none;
  }
`
