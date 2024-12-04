import React, { PureComponent } from "react"
import styled from "styled-components"
import Links from "./categories"
import Content from "./content"

export default class FurnitureLinks extends PureComponent {
  state = {
    selected: false,
  }

  render() {
    const { selected } = this.state

    return (
      <div className="container">
        <Block onMouseLeave={this.hide}>
          {Object.keys(Links).map((department, i) => (
            <Department key={i}>
              <Name
                data-name={department}
                selected={selected === department}
                onMouseEnter={this.show}
              >
                {department}
              </Name>
              {selected === department && !!Links[department] && (
                <List data-align-right={i > 4}>
                  {Links[department].map((column, k) => (
                    <Column key={k}>
                      <Content
                        column={column}
                        hide={this.hide}
                      />
                    </Column>
                  ))}
                </List>
              )}
            </Department>
          ))}
        </Block>
      </div>
    )
  }

  show = e => {
    const { name } = e.target.dataset
    if (name) this.setState(state => ({ selected: name }))
  }

  hide = () => {
    this.setState(state => ({ selected: false }))
  }
}

const Block = styled.div`
  position: relative;
  display: flex;
  border-bottom: 1px solid #ddd;
  @media (max-width: 1023px) {
    display: none;
  }
`

const Department = styled.div`
  position: relative;
`

const Name = styled.div`
  white-space: nowrap;
  padding: 15px 20px;
  text-transform: uppercase;
  text-shadow: 0 0 2px #e7e7e7;
  cursor: pointer;
  background-color: ${props => (props.selected ? "#c5dae8" : "#fff")};
`

const List = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 1000;
  display: flex;
  white-space: nowrap;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.41);
  &[data-align-right="true"] {
    right: 0;
  }
`

const Column = styled.div`
  padding: 20px 30px;
`
