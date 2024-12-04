import React from "react"
import styled from "styled-components"

const SeoText = ({ text }) => (
  <Text dangerouslySetInnerHTML={{ __html: text }} />
)

export default SeoText

const Text = styled.p`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  line-height: 22px;
  margin: 0;

  a {
    color: #0670eb;

    &:hover {
      color: #0f56a9;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`
