import React, { Component, Fragment } from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as CartActions from "../../../cart/actions"
import * as AuthActions from "../../../auth/actions"

import Line from "./line/line"
import Social from "./social"
import FurnitureLinks from "./furnitureLinks/furnitureLinks"
import { getPhoneNumberByUrl } from "utils/data/phone-numbers"

class Header extends Component {
  componentDidMount() {
    this.props.actions.cart.fillFromLocalStorage()
  }

  render() {
    const { auth, cart, actions, location } = this.props

    return (
      <div>
        <Top className="container">
          <Row>
            <LogoLink to="/">
              <img
                src="shop/textures/logo.jpg"
                alt="yoursite"
                className="logo"
              />
            </LogoLink>
          </Row>
          <Row>
            {/*}
            <PhoneWrap>
              <Svg viewBox="0 0 24 24" width="20px" height="20px">
                <path fill="currentColor" d="M15 12c0-1.641-1.359-3-3-3v-2.016c2.766 0 5.016 2.25 5.016 5.016h-2.016zM18.984 12c0-3.891-3.094-6.984-6.984-6.984v-2.016c4.969 0 9 4.031 9 9h-2.016zM20.016 15.516c0.563 0 0.984 0.422 0.984 0.984v3.516c0 0.563-0.422 0.984-0.984 0.984-9.375 0-17.016-7.641-17.016-17.016 0-0.563 0.422-0.984 0.984-0.984h3.516c0.563 0 0.984 0.422 0.984 0.984 0 1.266 0.188 2.438 0.563 3.563 0.094 0.328 0.047 0.75-0.234 1.031l-2.203 2.203c1.453 2.859 3.797 5.156 6.609 6.609l2.203-2.203c0.281-0.281 0.703-0.328 1.031-0.234 1.125 0.375 2.297 0.563 3.563 0.563z"></path>
              </Svg>
              <Phone>{getPhoneNumberByUrl(location.pathname)}</Phone>
            </PhoneWrap>
            */}
            <div>
              {getPhoneNumberByUrl(location.pathname).map(number => (
                <Phone key={number}>{number}</Phone>
              ))}
            </div>
            <Auth>
              {auth.isLogged ? (
                <Fragment>
                  {auth.admin && (
                    <AdminButton
                      href="/admin/catalog=all/product=empty"
                      target="_blank"
                    >
                      Админка
                    </AdminButton>
                  )}
                  <UserName>{auth.username}</UserName>
                  <LogoutButton onClick={actions.auth.logout}>
                    Выйти
                  </LogoutButton>
                </Fragment>
              ) : (
                <Social />
              )}
            </Auth>
          </Row>
        </Top>

        <Line cart={cart} />
        {auth.admin && <FurnitureLinks />}
      </div>
    )
  }
}

export default connect(
  state => ({
    cart: state.cart,
    auth: state.auth,
  }),
  dispatch => ({
    actions: {
      cart: bindActionCreators(CartActions, dispatch),
      auth: bindActionCreators(AuthActions, dispatch),
    },
  }),
)(Header)

const Top = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const LogoLink = styled(Link)`
  padding-top: 6px;
  cursor: pointer;

  @media (min-width: 1024px) {
    margin-left: 62px;
  }

  img {
    height: 40px;
    @media (max-width: 480px) {
      height: 25px;
    }
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

/*
const PhoneWrap = styled.div`
  white-space: nowrap;

  @media (max-width: 480px) {
    svg {
      display: none;
    }
  }
`
*/

const Auth = styled.div`
  display: flex;
  align-items: center;
  margin-left: 60px;

  @media (max-width: 767px) {
    display: none;
  }
`

const Svg = styled.svg`
  width: 20px;
  height: 20px;
  color: #2974a2;
  margin-right: 5px;
  vertical-align: bottom;
`

const Phone = styled.div`
  font-size: 1.1em;
  vertical-align: middle;
  white-space: nowrap;
  @media (max-width: 480px) {
    margin-right: 0;
    font-size: 1em;
  }
`

const UserName = styled.span`
  color: #b3b3b3;
  font-size: 14px;
  margin: 0 15px;
`

const LogoutButton = styled.span`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    color: #b30202;
  }
`

const AdminButton = styled.a`
  background: #7ac5f7;
  align-self: center;
  border-radius: 2px;
  cursor: pointer;
  padding: 8px 16px;
  color: white;
`
