import React from 'react'

const Footer = (props) => {
  const total = props.itemsInCartArray
    .reduce((acc, item) => {
      const summ = acc
      return summ + item.price * item.amount * props.currencyCoefficient
    }, 0)
    .toFixed(2)

  return (
    <div className="flex fixed bottom-0 w-full h-12 justify-end md:px-24 font-bold md:text-2xl bg-white border-t-2 items-center">
      Order total: {total}
      {props.currency}
    </div>
  )
}

export default Footer
