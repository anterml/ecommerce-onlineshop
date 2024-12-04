import React from "react"
import styled from "styled-components"
const pageLimit = 60

function paginator(currentPage, pageCount) {
  const delta = 2
  const range = []

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(pageCount - 1, currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  if (currentPage - delta > 2) {
    range.unshift("...")
  }
  if (currentPage + delta < pageCount - 1) {
    range.push("...")
  }

  range.unshift(1)
  range.push(pageCount)

  return range
}

const Paginator = ({ count, click, query, page }) => {
  const paginatorElems = []
  const categoryCount = count || 0
  const pageCount = Math.ceil(categoryCount / pageLimit)

  const values = paginator(page, pageCount)

  if (pageCount < 2) return null

  for (let i = 0; i < values.length; ++i) {
    const _page = values[i]
    if (_page === "...") {
      paginatorElems.push(<Dot key={_page + i} />)
    } else {
      paginatorElems.push(
        <Item
          data-selected={_page === page}
          data-page={_page}
          key={i}
        >
          {_page}
        </Item>,
      )
    }
  }

  return <Block onClick={click}>{paginatorElems}</Block>
}

export default Paginator

const Dot = styled.span`
  width: 10px;
  height: 10px;
  margin: 0 10px;
  background: #ddd;
  border-radius: 50%;
`

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 30px;
`

const Item = styled.span`
  display: inline-block;
  color: #555;
  border: 1px solid #aaa;
  font-size: 16px;
  padding: 9px 0;
  width: 40px;
  text-align: center;
  background: #fffafa;
  margin: 0 4px;
  border-radius: 2px;

  &[data-selected="false"]:hover {
    color: #333;
    border-color: #555;
    cursor: pointer;
  }

  &[data-selected="true"] {
    border-color: #b30202;
    color: #b30202;
    cursor: default;
  }
`
