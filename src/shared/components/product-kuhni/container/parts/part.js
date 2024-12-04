import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

const POSITIONS = {
  top: "Верх",
  bottom: "Низ",
}

const Part = ({
  part: {
    _id,
    kind,
    code,
    position,
    inset,
    countInset,
    totalPrice,
    name,
    fullImageUrl,
    images,
  },
  toggleInset,
  showDetails,
  buttonText,
  changeCountInset,
}) => (
  <div>
    <Item
      data-id={_id}
      onClick={showDetails}
    >
      <Image>
        <img
          src={fullImageUrl + images[0]}
          itemProp="image"
          alt={kind}
          title={kind}
        />
      </Image>
      <Price>{prettyPrice(totalPrice * (Number(countInset) || 1))} Р</Price>
      <Kind>
        {kind} {name}
      </Kind>
      <Position>
        {POSITIONS[position]} {code}
      </Position>
    </Item>
    {!!inset && (
      <CountInset
        onClick={changeCountInset}
        data-code={code}
      >
        <span
          data-action="dec"
          data-disabled={typeof countInset !== "number" || countInset <= 1}
        >
          -
        </span>
        {countInset || 1}
        <span data-action="inc">+</span>
      </CountInset>
    )}
    <Button
      onClick={toggleInset}
      data-code={code}
    >
      {buttonText}
    </Button>
  </div>
)

export default Part

const Item = styled.div`
  position: relative;

  & * {
    pointer-events: none;
  }
`

const Price = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const Kind = styled.div`
  line-height: 18px;
  max-height: 36px;
  height: 36px;
  margin-top: 10px;
  color: #333;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;

  & > img {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
`

const Button = styled.button`
  padding: 8px 28px;
  border: 1px solid #999;
  color: #666;
  background: #fff;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 11px;
  border-radius: 2px;
`

const Position = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
  padding: 4px 8px;
  color: #555;
  background-color: #e8e8e8;
`

const CountInset = styled.div`
  margin-bottom: 20px;
  color: #666;

  span[data-action] {
    display: inline-block;
    width: 25px;
    height: 25px;
    color: #0670eb;
    font-size: 21px;
    vertical-align: middle;
    cursor: pointer;
    text-align: center;
    border: 1px solid #e8e8e8;
  }

  span:not([data-disabled="true"]):hover {
    background-color: #e8e8e8;
    color: #0f56a9;
  }

  span[data-action="dec"] {
    margin-right: 10px;
    &[data-disabled="true"] {
      color: #999;
      cursor: default;
    }
  }

  span[data-action="inc"] {
    margin-left: 10px;
  }
`
