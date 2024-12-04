import React from "react"
import styled from "styled-components"
import { ruPlaceNames, engPlaceNames } from "utils/data/instock-places"

const List = ({ products, allowShops, change, status }) => (
  <Block className="container">
    <Header>
      <span>Код</span>
      <span>Название</span>
      <span>Магазины</span>
    </Header>
    <Content id="block">
      {status && (
        <div>
          {status === "pending" ? (
            <Status data-value={status}>Загрузка...</Status>
          ) : (
            <Status>{status}</Status>
          )}
        </div>
      )}
      {products.map(
        ({
          _id,
          department,
          category,
          base: { kind, name, urlName, productCode },
          instockPlaces,
        }) => (
          <div
            key={_id}
            data-code={productCode}
          >
            <span>{productCode}</span>
            <Name
              href={`/${department}/${category}/${urlName}`}
              target="_blank"
            >
              {kind} {name}
            </Name>
            {ruPlaceNames.map((name, i) => {
              const disabled = !allowShops.includes(engPlaceNames[i])
              return (
                <label
                  key={name}
                  data-disabled={disabled}
                >
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={instockPlaces.includes(i)}
                    onChange={change}
                    data-id={_id}
                    data-place-index={i}
                  />
                  {name}
                </label>
              )
            })}
          </div>
        ),
      )}
    </Content>
  </Block>
)

export default List

const Block = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  overflow: hidden;

  span,
  label {
    padding: 8px 10px;
  }

  input {
    margin: 0 5px 0 0;
    cursor: pointer;
  }

  a {
    color: #0670eb;
    display: block;
    padding: 8px 10px;
    &:hover {
      background-color: #ddd;
      color: #115892;
    }
  }
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 75px auto repeat(3, 140px);
  background-color: #444;
  color: white;
  font-weight: 500;

  span:last-child {
    grid-column: 3 / 6;
  }
`

const Content = styled.div`
  overflow-y: auto;
  position: relative;
  padding-bottom: 50px;

  & > div {
    display: grid;
    grid-template-columns: 75px 300px repeat(3, 140px);
    border-bottom: 1px solid #ccc;
  }

  label {
    display: flex;
    align-items: center;
    user-select: none;
    &[data-disabled="false"] {
      cursor: pointer;
      &:hover {
        background-color: #ddd;
      }
    }

    &[data-disabled="true"] {
      color: #999;
    }
  }
`

const Name = styled.a`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Status = styled.span`
  text-align: center;
  grid-column: span 5;
  color: #b30202;

  &[data-value="pending"] {
    color: green;
  }
`
