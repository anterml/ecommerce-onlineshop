import React from "react"
import styled from "styled-components"

const Products = ({ products, remove, drag }) => (
  <Block>
    {products.map(
      ({ _id, image, fullName, prettyPrice, url, productCode, removed }, i) => (
        <Item
          key={_id}
          draggable="true"
          data-value={i}
          data-drag-selected={i.toString() === drag.value}
          onDragStart={drag.start}
          onDragOver={drag.over}
          onDragEnd={drag.end}
        >
          <DndText>Переместить</DndText>
          <Content removed={removed}>
            <Link
              href={url}
              target="_blank"
            >
              <Image style={image} />
            </Link>
            <Price>{prettyPrice} р.</Price>
            <Name>{fullName}</Name>
            <ProductCode>Код продукта {productCode}</ProductCode>
          </Content>
          <RemoveButton
            onClick={remove}
            data-id={_id}
          >
            {removed ? "Восстановить" : "Удалить"}
          </RemoveButton>
        </Item>
      ),
    )}
    {!!products.length && (
      <Placeholder
        draggable="true"
        data-value="last"
        data-drag-selected={"last" === drag.value}
        onDragStart={drag.start}
        onDragOver={drag.over}
        onDragEnd={drag.end}
      />
    )}
  </Block>
)

export default Products

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  padding: 10px 15px 20px;
  overflow-y: auto;
`

const DndText = styled.div`
  position: absolute;
  background: #222;
  color: rgba(255, 255, 255, 0.9);
  top: 0;
  left: 0;
  right: 0;
  padding: 8px 10px;
  cursor: pointer;
  opacity: 0;
`

const Item = styled.div`
  position: relative;
  margin: 10px 10px 10px 0;
  border: 1px solid #555;
  padding: 10px 15px;
  border-radius: 3px;
  flex: 0 0 209px;
  text-align: center;

  &:hover {
    border-color: #000;
    ${DndText} {
      opacity: 1;
    }
  }

  &[data-drag-selected="true"]:before {
    position: absolute;
    top: 0;
    left: -8px;
    bottom: 0;
    content: " ";
    width: 4px;
    background-color: #b30202;
  }
`

const Content = styled.div`
  display: block;
  color: #333;
  ${props => props.removed && "opacity: 0.5"}
`

const Link = styled.a`
  display: block;
`

const Image = styled.div`
  width: 100%;
  height: 160px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
  margin-bottom: 10px;
`

const Name = styled.div`
  font-weight: 500;
  line-height: 15px;
`

const Price = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 300;
`

const ProductCode = styled.div`
  color: #888;
`

const RemoveButton = styled.div`
  color: #0670eb;
  padding: 10px 0;
  cursor: pointer;
  text-decoration: underline;
  user-select: none;

  &:hover {
    color: #0f56a9;
  }
`

const Placeholder = styled(Item)`
  border: none;
  padding: 0;
  flex: 1 1 auto;
  align-self: stretch;
`
