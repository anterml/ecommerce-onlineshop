import React, { Component, Fragment } from "react"
import styled from "styled-components"
import asyncRequest from "utils/request"
import Spinner from "globalComponents/spinners/inline"

export default class SideBar extends Component {
  state = {
    status: "",
    value: [],
  }

  async componentDidMount() {
    document.title = "Статистика"
    this.setState(state => ({ status: "pending" }))

    try {
      const value = await asyncRequest({
        url: `admin/stats/employees/users`,
      })

      this.setState(state => ({
        status: "fulfilled",
        value,
      }))
    } catch (e) {
      console.log(e)
      this.setState(state => ({ status: "rejected" }))
    }
  }

  render() {
    const { value, status } = this.state
    const { selectedUser } = this.props

    return (
      <Block>
        {status === "pending" && (
          <SpinnerWrap>
            <Spinner />
          </SpinnerWrap>
        )}
        {status === "rejected" && (
          <ErrorText>Не получилось загрузить данные пользователей</ErrorText>
        )}
        {status === "fulfilled" && (
          <Fragment>
            <Title>Пользователи</Title>
            {(value || []).map((user, i) => (
              <User
                data-user-name={user._id.userName}
                onClick={this.changeRoute}
                key={i}
              >
                <Name selected={user._id.userName === selectedUser}>
                  {user._id.userName}
                </Name>
                <Count>{user.count}</Count>
              </User>
            ))}
          </Fragment>
        )}
      </Block>
    )
  }

  changeRoute = e => {
    const { userName } = e.target.dataset
    if (userName) this.props.changeRoute("userName", userName)
  }
}

const SpinnerWrap = styled.div`
  width: 55px;
  height: 55px;
  display: block;
  margin: 0 auto;
`

const ErrorText = styled.div`
  color: #b30202;
  font-size: 15px;
`

const Block = styled.div`
  padding: 20px;
  background-color: #ddd;
  flex: 0 0 310px;
  overflow: auto;
`

const Title = styled.div`
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 20px;
`

const User = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  & > * {
    pointer-events: none;
  }
`

const Name = styled.span`
  margin-right: 5px;
  color: ${props => (props.selected ? "#666" : "blue")};
`

const Count = styled.span`
  color: #999;
`
