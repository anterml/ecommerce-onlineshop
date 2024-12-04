import styled from "styled-components"

export default styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    flex: 1 1 auto;
  }

  button:not(:last-child) {
    margin-right: 5px;
  }

  button:disabled {
    cursor: not-allowed;
    color: #999;
  }
`
