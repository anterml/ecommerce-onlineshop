import React, { PureComponent } from "react"
import request from "utils/request"
import prettyPrice from "utils/prettyPrice"
import styled from "styled-components"
import qs from "query-string"
import { Input } from "globalComponents/admin/elements"
import Spinner from "globalComponents/spinners/inline"
import { getAllCategories } from "utils/data/categories"
const CATEGORIES = getAllCategories()

const contexts = {
  name: "Название",
  productCode: "Код продукта",
  article: "Артикул",
}

export default class Search extends PureComponent {
  state = {
    text: "",
    context: "productCode",
    category: "all",
    values: [],
    hover: false,
    status: "",
  }

  render() {
    const { text, context, category, values, hover, status } = this.state
    const { params } = this.props.match

    const elems = values.map(({ _id, base, vars }) => {
      const { name, urlName, kind, price, productCode, article } = base
      let articles = []

      if (context === "article") {
        if (article) articles.push(article)

        vars.configurations.forEach(c => {
          if (c.article) articles.push(c.article)
        })
      }

      return (
        <Link
          key={_id}
          data-url-name={urlName}
          data-selected={urlName === params.urlName}
        >
          <ProductCode>{productCode}</ProductCode>
          {context === "name" ? prettyName(name, text) : <Name>{name}</Name>}
          <span>{kind}</span>
          <Price>{prettyPrice(price)} руб</Price>
          {!!articles.length && prettyArticle(articles.join(" | "), text)}
        </Link>
      )
    })

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
              placeholder="Найти продукт..."
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
      </Block>
    )
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

    const url = `admin/search?text=${text}&category=${category}&context=${context}`
    this.searchIndex = (this.searchIndex || 0) + 1
    this.handleSearch(url, text, context, category, this.searchIndex)
  }

  handleSearch(url, text, context, category, index) {
    this.setState(() => ({ status: "pending", text }))
    request({ url }).then(result => {
      if (this.searchIndex !== index) return

      this.setState({
        values: result || [],
        context,
        category,
        status: "",
      })
    })
  }

  selectProduct = e => {
    const { urlName } = e.target.dataset
    const { history, location, match, query } = this.props
    const search = qs.stringify(query)

    if (urlName && urlName !== match.params.urlName) {
      history.push({
        pathname: location.pathname.replace(
          /(\/product=)[^\/]+/,
          `$1${urlName}`,
        ),
        search,
      })
    }
  }
}

function prettyName(name, text) {
  const pos = name.indexOf(text)
  const beg = name.toLowerCase().indexOf(text.toLowerCase())
  const end = beg + text.length

  return (
    <Name>
      {name.substr(0, beg)}
      <Selected>{name.substring(beg, end)}</Selected>
      {name.substr(end)}
    </Name>
  )
}

function prettyArticle(name, text) {
  const pos = name.indexOf(text)
  const beg = name.toLowerCase().indexOf(text.toLowerCase())
  const end = beg + text.length

  return (
    <Article>
      {name.substr(0, beg)}
      <Selected>{name.substring(beg, end)}</Selected>
      {name.substr(end)}
    </Article>
  )
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

const ProductCode = styled.span`
  color: #999;
`

const Name = styled.span`
  font-weight: 500;
  color: #292929;
  display: inline-block;
`

const Price = styled.span`
  color: #999;
`

const Link = styled.div`
  width: 100%;
  display: flex;
  padding: 4px 8px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &[data-selected="true"] {
    background-color: #cad1d6;
  }

  & > * {
    margin-right: 8px;
    pointer-events: none;
  }
`

const Article = styled.span`
  color: #666;
`

const Selected = styled.span`
  color: #bd0000;
`
