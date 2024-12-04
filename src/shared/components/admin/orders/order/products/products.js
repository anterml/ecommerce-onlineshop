import React, { Fragment } from "react"
import VarFields, { KuhnyaVarFields } from "./varfields"
import Item from "./item"
import Sum from "./sum"
import Parts from "./parts"
const rootImageUrl = "https://storage.googleapis.com/yourpath"
import { kuhniFieldNames } from "utils/data/parts"

const Products = ({ items, delivery, totalPrice }) => (
  <div>
    {items.map(product => {
      const {
        _id,
        name,
        count,
        varFields,
        categoryType,
        category,
        image,
        imageFolder,
        urlName,
        configurationCode,
        productCode,
        dynamic,
        totalPrice,
      } = product
      const imagePrefix = category === "sp_phone" ? "electronics" : "furniture"
      const urlPrefix = category === "sp_phone" ? "electronics" : "mebel"

      const fullName = `${product.kind || categoryType || ""} ${name}`
      const backgroundImage = `url(${rootImageUrl}/${imagePrefix}/${category}/${imageFolder}/ct/${image})`
      const url = `/${urlPrefix}/${category}/${urlName}?pc=${configurationCode}`
      const price = category === "kuhnya" ? "" : product.price

      return (
        <Item
          {...{ fullName, count, price, backgroundImage, url, productCode }}
          totalPrice={totalPrice}
          key={_id}
        >
          {category !== "kuhnya" ? (
            <VarFields
              fields={varFields}
              count={count}
            />
          ) : (
            <Fragment>
              <KuhnyaVarFields
                fields={varFields}
                count={count}
                names={kuhniFieldNames}
              />
              <Parts
                urlName={urlName}
                parts={dynamic.parts}
                count={count}
                varFields={varFields.filter(
                  f => !kuhniFieldNames.includes(f.name),
                )}
              />
            </Fragment>
          )}
        </Item>
      )
    })}
    <Sum
      totalPrice={totalPrice}
      delivery={delivery}
    />
  </div>
)

export default Products
