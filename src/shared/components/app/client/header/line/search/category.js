import React from "react"
import styled from "styled-components"

const Category = ({ word, keywords }) => {
  let url = ""
  let snippetElems = null
  let name

  if (typeof word === "object") {
    name = word.name

    snippetElems = word.values.map((s, k) => {
      const attrUrl = keywords[name + " | " + s]
      url = attrUrl.substr(0, attrUrl.indexOf("?"))
      return (
        <Snippet
          data-url={attrUrl}
          key={k}
        >
          {s}
        </Snippet>
      )
    })
  } else {
    name = word.replace(" | ", " ")
    url = keywords[word]
  }

  return (
    <Block>
      <Name data-url={url}>{name}</Name>
      {snippetElems && !!snippetElems.length && (
        <Snippets>{snippetElems}</Snippets>
      )}
    </Block>
  )
}

export default Category

const Snippets = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-left: 13px;
`

const Snippet = styled.div`
  margin: 0 15px 0 5px;
  color: rgba(6, 112, 235, 0.91);
  text-decoration: underline;

  &:hover {
    color: #b30202;
  }
`

const Block = styled.div`
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`

const Name = styled.div`
  background: white;
  padding: 5px;

  &:hover {
    background-color: #cfd5d9;
  }
`
