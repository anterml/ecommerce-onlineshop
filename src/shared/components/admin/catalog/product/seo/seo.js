import React, { Component } from "react"
import { Select } from "globalComponents/admin/elements"
import styled from "styled-components"
import normalizeDescription from "utils/normalize-description"
import removeMarking from "utils/remove-marking"

function getDescriptionData(seo, templates) {
  const { descriptionTemplateId } = seo
  if (descriptionTemplateId) {
    const template = templates.find(t => t._id === descriptionTemplateId)
    if (template) return ["descriptionTemplateId", template.text]
  }

  return ["descriptionText", seo.descriptionText]
}

function getMetaDescriptionText(seo, templates, general) {
  switch (seo.metaDescriptionKind) {
    case "#seo-text": {
      if (!seo.descriptionTemplateId) return seo.descriptionText

      const template = templates.find(t => t._id === seo.descriptionTemplateId)
      if (template) return template.text
    }

    case "#description": {
      return general.description
    }

    default:
      return seo.metaDescriptionText
  }
}

export default class Seo extends Component {
  render() {
    const { internalData, seo, general } = this.props
    const seoTemplates = internalData ? internalData.seoTemplates : []
    const [descriptionKind, description] = getDescriptionData(seo, seoTemplates)
    const { descriptionTemplateId, metaDescriptionKind } = seo
    const metaDescriptionText =
      getMetaDescriptionText(seo, seoTemplates, general) || ""

    return (
      <Block>
        <Title>Seo текст</Title>
        <Wrap>
          <Select
            value={descriptionTemplateId}
            data-name="descriptionTemplateId"
            onChange={this.change}
          >
            <option value="">Своё</option>
            <option disabled>Выбор шаблона</option>
            {seoTemplates.map(({ _id, name }) => (
              <option
                value={_id}
                key={_id}
              >
                {name}
              </option>
            ))}
          </Select>
          <textarea
            value={description}
            data-name="descriptionText"
            onChange={this.change}
            disabled={descriptionKind === "descriptionTemplateId"}
          />
          <Preview
            dangerouslySetInnerHTML={{
              __html: normalizeDescription(description),
            }}
          />
        </Wrap>

        <Title>{"<meta description>"}</Title>
        <Wrap>
          <Select
            value={metaDescriptionKind}
            data-name="metaDescriptionKind"
            onChange={this.change}
          >
            <option value="">Своё</option>
            {descriptionKind && <option value="#seo-text">Seo текст</option>}
            <option value="#description">Описание</option>
          </Select>
          <textarea
            value={metaDescriptionText}
            data-name="metaDescriptionText"
            onChange={this.change}
            disabled={!!metaDescriptionKind}
          />
          <Preview>{removeMarking(metaDescriptionText)}</Preview>
        </Wrap>
      </Block>
    )
  }

  change = e => {
    const { dataset, value } = e.target
    if (dataset.name) {
      this.props.actions.change(dataset.name, value)
    }
  }
}

const Block = styled.div`
  textarea {
    width: 100%;
    min-height: 300px;
    margin-top: 5px;
  }
`

const Title = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 15px;
`

const Wrap = styled.div`
  margin-bottom: 50px;
`

const Preview = styled.div`
  padding: 10px 15px;
  border: 1px dashed #bbb;

  a {
    color: #0670eb;

    &:hover {
      color: #0f56a9;
    }
  }
`
