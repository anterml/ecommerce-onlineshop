import React, { Component } from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"
import Popup from "./popup"

class Settings extends Component {
  state = {
    show: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.group._id !== this.props.group._id) {
      this.setState(state => ({ show: false }))
    }
  }

  render() {
    const { group, groupNames } = this.props

    return (
      <Block>
        <SettingButton onClick={this.toggle}>
          Настроить выбранную группу
        </SettingButton>
        {this.state.show && (
          <Popup
            group={group}
            groupNames={groupNames}
            change={this.change}
            remove={this.remove}
          />
        )}
      </Block>
    )
  }

  remove = e => {
    if (confirm("Удалить группу?")) {
      this.props.actions.removeGroup(this.props.group)
    }
  }

  change = e => {
    let { name, value } = e.currentTarget
    if (name === "hideFields") value = !!value

    this.props.actions.changeGroup(this.props.group, name, value)
  }

  toggle = () => {
    this.setState(state => ({ show: !state.show }))
  }
}

export default Settings

const SettingButton = styled.button`
  padding: 7px 10px;
`

const Block = styled.div`
  margin-left: 5px;
  position: relative;
`
