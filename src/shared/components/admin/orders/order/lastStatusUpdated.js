import React from "react"
import styled from "styled-components"

const LastStatusUpdated = ({ value: { author, date } }) => (
  <div>
    <Title>Последним изменил:</Title>
    <span>
      {author} {date}
    </span>
  </div>
)

export default LastStatusUpdated

const Title = styled.div`
  font-weight: 500;
`
