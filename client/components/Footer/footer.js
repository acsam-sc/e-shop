import React from 'react'

const Footer = (props) => {
  return (
    <div className="flex fixed bottom-0 w-full h-12 justify-end md:px-24 font-bold md:text-2xl bg-white">
      Order total: {props.itemsInCartArray.reduce((acc, item) => {
        const total = acc
        return total + item.price * item.amount * props.currencyCoefficient
      }, 0)} {props.currency}
    </div>
  )
}

export default Footer