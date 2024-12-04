import styled from "styled-components"

const baseCss = `
  padding: 8px 10px;
  border-radius: 2px;
  border: 1px solid #ccc;
`

export const BaseInput = styled.input`
  display: block;
  flex: 1 1 auto;
  width: 100%;
  ${baseCss};
`

export const Input = styled(BaseInput)`
  width: 0;
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const Title = styled.div`
  color: #777;
  margin-right: 6px;
  width: 200px;
`

export const Textarea = styled.textarea`
  max-width: 100%;
  width: 100%;
  height: 80px;
  line-height: 20px;
  ${baseCss};
`

export const Select = styled.select`
  padding: 5px 8px;
`
