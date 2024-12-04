import React, { Component } from "react"
import styled from "styled-components"
import qs from "query-string"
import asyncRequest from "utils/request"

import List from "./list"
import DND from "globalComponents/admin/dnd"

import Department from "./department/department"
import Creating from "./creating"
import Editing from "./editing"

const DNDList = DND(List)

export default class Display extends Component {
  static title = "Отображение продуктов"

  state = {
    display: [],
    status: "",
    statusText: "",
    edit: false,
  }

  componentDidMount() {
    document.title = this.constructor.title
    this.fetch()
  }

  async fetch() {
    this.setState(() => ({ status: "pending" }))

    try {
      const pages = await asyncRequest({
        url: `admin/display/list`,
      })

      this.setState(() => ({
        status: "fulfilled",
        display: pages,
      }))
    } catch (e) {
      this.setState(() => ({
        status: e.status === 404 ? "404" : "rejected",
      }))
    }
  }

  render() {
    const { pageId, blockId } = qs.parse(this.props.location.search)
    const { display, status, statusText, edit } = this.state
    const {
      addPage,
      addBlock,
      addProduct,
      select,
      refreshBlock,
      removeBlock,
      removePage,
      changeName,
    } = this

    const pages = display.map(({ _id, name, blocks }) => ({
      _id,
      value: name,
      count: blocks.length,
    }))
    const page = (this.page = display.find(page => page._id === pageId))

    const blocks = page
      ? page.blocks.map(({ _id, name, ids }) => ({
          _id,
          value: name,
          count: ids.length,
        }))
      : []
    const block = page ? page.blocks.find(block => block._id === blockId) : null

    return (
      <Block>
        <Layout>
          <div>
            <Creating
              placeholder="Создать страницу"
              add={addPage}
            />
            <List
              name="pageId"
              values={pages}
              select={select}
              remove={removePage}
              selectedValue={pageId}
              edit={changeName}
            />
          </div>

          {page && (
            <div>
              <Creating
                placeholder="Создать блок"
                add={addBlock}
              />
              <DNDList
                name="blockId"
                values={blocks}
                select={select}
                remove={removeBlock}
                selectedValue={blockId}
                swap={this.swap}
                edit={changeName}
              />
            </div>
          )}

          {status === "pending" && (
            <Overlay>
              <StatusText>{statusText}</StatusText>
            </Overlay>
          )}

          {edit && (
            <Overlay>
              <Editing
                value={this.editValue}
                apply={this.edit}
                cancel={this.cancelEdit}
              />
            </Overlay>
          )}
        </Layout>
        <Department
          page={page}
          block={block}
          add={addProduct}
          refreshBlock={refreshBlock}
        />
      </Block>
    )
  }

  cancelEdit = e => {
    this.setState({ edit: false })
  }

  edit = value => {
    this.setState({ edit: false })

    let page, match, $set
    if (this.editName === "pageId") {
      page = this.state.display.find(item => item.name === this.editValue)
      match = { _id: page._id }
      $set = { "data.name": value }

      this.setState(state => ({
        display: state.display.map(p =>
          p !== page ? p : { ...p, name: value },
        ),
      }))
    } else if (this.editName === "blockId") {
      page = this.page
      const block = page.blocks.find(block => block.name === this.editValue)
      match = {
        "_id": page._id,
        "data.blocks._id": block._id,
      }
      $set = { "data.blocks.$.name": value }

      this.setState(state => ({
        display: state.display.map(p =>
          p !== page
            ? p
            : {
                ...p,
                blocks: p.blocks.map(b =>
                  b !== block ? b : { ...b, name: value },
                ),
              },
        ),
      }))
    } else {
      return
    }

    const data = {
      action: "rename",
      match,
      $set,
    }

    asyncRequest({
      url: `admin/display/page/${page._id}`,
      data,
      method: "put",
    }).catch(() => console.log("Не удалось изменить имя"))
  }

  changeName = e => {
    const { value, name } = e.currentTarget.dataset
    this.editValue = value
    this.editName = name
    this.setState({ edit: true })
  }

  swap = (start, end) => {
    if (!this.page) return

    const { blocks, _id } = this.page
    const startValue = blocks.find(block => block.name === start)
    const endValue =
      end === "last"
        ? blocks[blocks.length - 1]
        : blocks.find(block => block.name === end)

    if (!startValue || !endValue || startValue === endValue) return

    const buff = new Set()
    for (let i = 0; i < blocks.length; ++i) {
      const block = blocks[i]
      if (block === startValue) {
        continue
      }

      if (block === endValue && end !== "last") {
        buff.add(startValue)
      }

      buff.add(block)
    }

    // вставляем в самый конец если нужно
    if (end === "last") {
      buff.add(startValue)
    }

    const data = [...buff]

    this.setState(state => ({
      display: state.display.map(page =>
        page !== this.page ? page : { ...this.page, blocks: data },
      ),
    }))

    asyncRequest({
      url: `admin/display/page/${_id}/blocks`,
      method: "put",
      data,
    }).catch(() =>
      this.setState(state => ({
        display: state.display.map(page =>
          page !== this.page ? page : { ...this.page, blocks },
        ),
      })),
    )
  }

  addProduct = (block, productId) => {
    this.setState(state => ({
      display: state.display.map(page =>
        !page.blocks.includes(block)
          ? page
          : {
              ...page,
              blocks: page.blocks.map(b =>
                b !== block ? b : { ...block, ids: [...block.ids, productId] },
              ),
            },
      ),
    }))
  }

  addPage = async name => {
    if (name) {
      // не добавлять, если страница с таким названием уже существует
      if (this.state.display.find(page => page.name === name)) return

      this.setState({
        status: "pending",
        statusText: "Создание страницы...",
      })

      try {
        const result = await asyncRequest({
          url: "admin/display/page",
          data: { name },
          method: "post",
        })

        this.setState(state => ({
          status: "fulfilled",
          display: [...state.display, result],
        }))
        this.changeRoute("pageId", result._id)
      } catch (e) {
        this.setState(() => ({ status: "rejected" }))
      }
    }
  }

  addBlock = async name => {
    if (name) {
      const { pageId } = qs.parse(this.props.location.search)
      const page = this.state.display.find(page => page._id === pageId)

      // не добавлять, если нет такой страницы
      // или блок с таким названием уже существует
      if (!page || page.blocks.find(block => block.name === name)) return

      this.setState({
        status: "pending",
        statusText: "Создание набора...",
      })

      try {
        const result = await asyncRequest({
          url: `admin/display/page/${pageId}`,
          data: { name },
          method: "put",
        })

        this.setState(state => ({
          status: "fulfilled",
          display: state.display.map(item =>
            item !== page
              ? item
              : {
                  ...item,
                  blocks: [...item.blocks, result],
                },
          ),
        }))

        this.changeRoute("blockId", result._id)
      } catch (e) {
        this.setState(() => ({ status: "rejected" }))
      }
    }
  }

  // После сохранения заменяет новый блок.
  // Функция нужна для обновления информации о последнем редактировании
  refreshBlock = (oldBlock, newBlock) => {
    this.setState(state => ({
      display: state.display.map(page =>
        !page.blocks.find(block => block === oldBlock)
          ? page
          : {
              ...page,
              blocks: page.blocks.map(block =>
                block !== oldBlock ? block : newBlock,
              ),
            },
      ),
    }))
  }

  select = e => {
    const { name, id } = e.target.dataset
    if ((name, id)) this.changeRoute(name, id)
  }

  removePage = e => {
    const page = this.state.display.find(
      page => page.name === e.target.dataset.value,
    )

    if (
      page &&
      confirm("Вы действительно хотите удалить страницу и все блоки в ней?")
    ) {
      this.changeRoute("removePage")
      this.setState(state => ({
        display: state.display.filter(item => item !== page),
      }))

      asyncRequest({
        url: `admin/display/page/${page._id}`,
        method: "del",
      })
    }
  }

  removeBlock = e => {
    const { page } = this

    if (!page) return

    const block = page.blocks.find(
      block => block.name === e.target.dataset.value,
    )

    if (block && confirm("Вы действительно хотите удалить блок?")) {
      this.changeRoute("pageId", page._id)
      this.setState(state => ({
        display: state.display.map(item =>
          item !== page
            ? item
            : {
                ...item,
                blocks: item.blocks.filter(b => b !== block),
              },
        ),
      }))
      asyncRequest({
        url: `admin/display/page/${page._id}/block/${block._id}`,
        method: "del",
      })
    }
  }

  changeRoute = (name, value) => {
    const { location, history } = this.props

    const query = {
      ...qs.parse(location.search),
      [name]: value,
    }

    // если сменяется страница - убрать параметр блока в запросе
    if (name === "pageId") delete query.block

    const search = name === "removePage" ? "" : qs.stringify(query)

    history.replace({
      pathname: location.pathname,
      search,
    })
  }
}

const Block = styled.div`
  flex: 1 1 auto;
  display: flex;
  overflow: hidden;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(214, 214, 214, 0.94);
`

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex: 0 0 430px;
  border-left: 1px solid #ddd;
  overflow: hidden;
  border-right: 1px solid #555;
`

const StatusText = styled.div`
  padding-top: 40px;
  font-size: 20px;
  text-align: center;
  color: #649f4c;
`
