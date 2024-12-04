import React from "react"
import styled from "styled-components"

const fieldNames = [
  {
    eng: "name",
    ru: "Представьтесь",
  },
  {
    eng: "email",
    ru: "Электронная почта",
    type: "email",
  },
  {
    eng: "address",
    ru: "Адрес",
  },
]

const Recipient = ({ recipient, errors, change, validate, phonePaste }) => (
  <Block>
    <Item>
      <Title>Сотовый телефон</Title>
      <Phone>
        <span data-active={!!recipient.phone.length}>
          <span>+7</span>
        </span>
        <Input
          data-has-error={!!errors.phone}
          name="phone"
          value={recipient.phone}
          onChange={change}
          onBlur={validate}
          onPaste={phonePaste}
        />
      </Phone>
      {errors.phone && <Error>{errors.phone}</Error>}
    </Item>
    {fieldNames.map(({ eng, ru, type }) => (
      <Item key={eng}>
        <Title data-optionally>{ru}</Title>
        <Input
          type={type || "text"}
          name={eng}
          value={recipient[eng]}
          onChange={change}
        />
      </Item>
    ))}
  </Block>
)

export default Recipient

const Block = styled.div``

const Item = styled.div`
  margin-bottom: 10px;
`

const Title = styled.div`
  &[data-optionally]:after {
    content: "(Необязательно для заполнения)";
    margin-right: 5px;
    margin-left: 5px;
    display: inline-block;
    color: #888;
  }
`

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 2px;
  border: 1px solid #bbb;
  width: 100%;

  &[data-has-error="true"] {
    border-color: #b30202;
  }
`

const Error = styled.div`
  color: #b30202;
`

const Phone = styled.div`
  position: relative;

  & > span {
    position: absolute;
    display: flex;
    align-items: center;
    left: 1px;
    top: 1px;
    bottom: 1px;
    border-radius: 2px 0 0 2px;
    padding: 0 4px;

    &[data-active="false"] {
      color: #999;
    }
  }

  input {
    padding-left: 20px;
    margin-bottom: 0;
  }
`
