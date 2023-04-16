import React from 'react'
import { useSelector } from 'react-redux'
import BasketItem from './basketItem'

const Basket = () => {
  const { currency, currencyCoefficient, sortedBy, itemsInCart } = useSelector(
    (state) => state.shoppingReducer
  )

  const sortItemsInCart = (a, b) => {
    switch (sortedBy) {
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

  const itemsInCartFunc = () => {
    if (sortedBy !== null) {
      const sortedArray = itemsInCart
        .map((item, index) => {
          if (sortedBy === 'priceAsc' || sortedBy === 'priceDesc') {
            return { index, price: item.price }
          }
          return { index, title: item.title }
        })
        .sort(sortItemsInCart)
      return sortedArray.map((it) => itemsInCart[it.index])
    }
    return itemsInCart
  }

  return (
    <div className="flex flex-grow flex-col flex-wrap md:w-2/3 items-center mb-12">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Your Cart</div>
      {itemsInCart.length === 0 && 'Your Cart is empty'}
      {itemsInCartFunc().map((it) => {
        return (
          <BasketItem
            key={it.id}
            it={it}
            currency={currency}
            currencyCoefficient={currencyCoefficient}
          />
        )
      })}
    </div>
  )
}

export default React.memo(Basket)
