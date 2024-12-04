import React, { PureComponent } from "react"
import styled from "styled-components"
import DescriptionTips from "./description-tips"
import normalizeDescription from "utils/normalize-description"

export default class General extends PureComponent {
  render() {
    const { description, shortDescription, sliderDescription } =
      this.props.general
    return (
      <Block>
        <Item>
          <Title>
            Описание <DescriptionTips />
          </Title>
          <textarea
            value={description}
            name="description"
            data-full="true"
            onChange={this.change}
          />
        </Item>
        <Preview
          dangerouslySetInnerHTML={{
            __html: normalizeDescription(description),
          }}
        />
        <Item>
          <Title>Короткое описание</Title>
          <textarea
            value={shortDescription}
            name="shortDescription"
            onChange={this.change}
          />
        </Item>
        <Item>
          <Title>Описание продукта на слайдере главной страницы</Title>
          <textarea
            value={sliderDescription}
            name="sliderDescription"
            onChange={this.change}
          />
        </Item>
      </Block>
    )
  }

  change = e => {
    this.props.actions.change(e.target.name, e.target.value)
  }
}

const Block = styled.div`
  margin-top: 30px;

  & textarea {
    max-width: 100%;
    width: 100%;
    height: 70px;
    padding: 5px 10px;
    color: #333;
    line-height: 20px;
    &[data-full="true"] {
      height: 250px;
    }
  }
`

const Item = styled.div`
  margin-bottom: 30px;
`

const Title = styled.div`
  display: flex;
  color: #777;
  margin-bottom: 5px;
`

const Preview = styled.div`
  padding: 10px 15px;
  border: 1px dashed #bbb;
  margin: -20px 0 30px;

  a {
    color: #0670eb;

    &:hover {
      color: #0f56a9;
    }
  }
`
