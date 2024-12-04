import React, { Component } from "react"
import styled from "styled-components"
import { Button } from "globalComponents/admin/buttons"

export default class Creating extends Component {
  state = {
    comment: "",
  }

  render() {
    const { comment } = this.state
    return (
      <Block>
        <Comment
          onChange={this.change}
          value={comment}
        />
        <Button
          onClick={this.add}
          disabled={!comment}
        >
          Добавить комментарий
        </Button>
      </Block>
    )
  }

  change = e => {
    this.setState({ comment: e.target.value })
  }

  add = () => {
    const text = this.state.comment.trim()
    if (text) {
      this.setState({ comment: "" })
      this.props.add(text)
    }
  }
}

const Block = styled.div`
  margin-top: 15px;
`

const Comment = styled.textarea`
  max-width: 100%;
  width: 100%;
  height: 120px;
  padding: 5px 10px;
  line-height: 20px;
  color: #666;
`
