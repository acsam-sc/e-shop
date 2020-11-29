import React from 'react'
import BasketItem from './basketItem'

const Basket = (props) => {
  return (
    <div className="flex flex-grow flex-wrap md:w-2/3 justify-center mb-12">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Your Cart</div>
      {props.itemsInCartArray.length === 0 && 'Your Cart is empty'}
      {props.itemsInCartArray.map((it) => {
        return (
          <BasketItem
            key={it.id}
            it={it}
            currency={props.currency}
            currencyCoefficient={props.currencyCoefficient}
          />
        )
      })}
    </div>
  )
}

export default Basket
