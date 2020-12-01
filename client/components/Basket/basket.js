import React from 'react'
import BasketItem from './basketItem'

const Basket = (props) => {
  const sortItemsInCart = (a, b) => {
    switch (props.sortedBy) {
      case 'a-z':
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      case 'z-a':
        if (a.title > b.title) return -1
        if (a.title < b.title) return 1
        return 0
      case 'priceAsc':
        return a.price - b.price
      case 'priceDesc':
        return b.price - a.price
      default:
        return false
    }
  }

  const itemsInCart = () => {
    if (props.sortedBy !== null) {
      const sortedArray = props.itemsInCartArray
        .map((item, index) => {
          if (props.sortedBy === 'priceAsc' || props.sortedBy === 'priceDesc') {
            return { index, price: item.price }
          }
          return { index, title: item.title }
        })
        .sort(sortItemsInCart)
      return sortedArray.map((it) => props.itemsInCartArray[it.index])
    }
    return props.itemsInCartArray
  }

  return (
    <div className="flex flex-grow flex-wrap md:w-2/3 justify-center mb-12">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Your Cart</div>
      {props.itemsInCartArray.length === 0 && 'Your Cart is empty'}
      {itemsInCart().map((it) => {
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

export default React.memo(Basket)
