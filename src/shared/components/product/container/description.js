import React from "react"
import styled from "styled-components"

const Description = ({ text, category, kind, name }) => {
  const isElectronics = !!text && category === "sp_phone"
  const fullName = kind.toLowerCase() + " " + name
  return (
    <Block>
      <Title>Описание</Title>
      {isElectronics && (
        <p>
          <strong>
            <em>
              Вы можете приобрести {fullName} в рассрочку до 6 месяцев или в
              кредит до 24 месяцев.
            </em>
          </strong>
        </p>
      )}
      <Text dangerouslySetInnerHTML={{ __html: text }} />
      {isElectronics && (
        <p>
          <strong>
            <em>
              Вы можете приобрести {fullName} в рассрочку до 6 месяцев или в
              кредит до 24 месяцев.
            </em>
          </strong>
        </p>
      )}
    </Block>
  )
}

export default Description

const Block = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  padding: 20px 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const Title = styled.h2`
  margin: 0 0 10px;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;
`

const Text = styled.p`
  line-height: 22px;
  margin: 0;

  a {
    color: #0670eb;

    &:hover {
      color: #0f56a9;
    }
  }
`
