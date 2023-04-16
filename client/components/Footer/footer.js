import React from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { currency, currencyCoefficient, itemsInCart } = useSelector(
    (state) => state.shoppingReducer
  )

  const total = itemsInCart
    .reduce((acc, item) => {
      const summ = acc
      return summ + item.price * item.amount * currencyCoefficient
    }, 0)
    .toFixed(2)

  return (
    <div className="flex fixed bottom-0 w-full h-12 justify-end md:px-24 font-bold md:text-2xl bg-white border-t-2 items-center">
      Order total: {total}
      {currency}
    </div>
  )
}

export default Footer
