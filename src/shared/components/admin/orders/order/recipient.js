import React from "react"
import styled from "styled-components"

const Recipient = ({ recipient }) => {
  const { name, phone, city, address, region, email } = recipient
  let fullAddress = []

  if (region) fullAddress.push(region)

  if (city) fullAddress.push(city)

  if (address) fullAddress.push(address)

  fullAddress = fullAddress.join(", ")

  return (
    <Block>
      {name && (
        <Item>
          Получатель: <strong>{name}</strong>
        </Item>
      )}
      {fullAddress && (
        <Item>
          Адрес: <strong>{fullAddress}</strong>
        </Item>
      )}
      {phone && (
        <Item>
          Телефон: <strong>{phone}</strong>
        </Item>
      )}
      {email && (
        <Item>
          Email: <strong>{email}</strong>
        </Item>
      )}
    </Block>
  )
}

export default Recipient

const Block = styled.div`
  margin-bottom: 30px;
`

const Item = styled.div`
  margin-bottom: 3px;
  font-weight: 500;

  strong {
    margin-left: 5px;
    color: #666;
    font-weight: 400;
  }
`
