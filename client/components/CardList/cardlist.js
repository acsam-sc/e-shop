import React from 'react'
import Card from './card'

const CardList = (props) => {

  return (
    <div className="flex flex-grow flex-wrap w-full justify-center">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Our Products</div>
      {props.productsArray.map((it) => {
        let amount = 0
        const itemArr = props.itemsInCartArray.filter((item) => item.id === it.id)
        if (itemArr.length > 0) {
          amount = itemArr[0].amount
        }
        return (
          <Card
            key={it.id}
            it={it}
            amount={amount}
            currency={props.currency}
            currencyCoefficient={props.currencyCoefficient}
          />
        )
      })}
    </div>
  )
}

export default CardList
