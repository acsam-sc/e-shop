import React from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart, decreaseItemQuantity } from '../../redux/reducers/shopping'
import './basketitem.styles.scss'

const BasketItem = ({ it, currency, currencyCoefficient }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex w-full m-2 border-2">
      <div className="flex w-1/3 justify-center">
        <img alt="product_image" src={it.image} className="card__image" />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between">
          <span className="card__title">{it.title}</span>
          <span className="card__price">
            {(it.price * currencyCoefficient).toFixed(2)} {currency}
          </span>
        </div>
        <span className="card__description">{it.description}</span>
        <div className="flex flex-row mt-auto justify-between items-center">
          {it.amount > 0 && (
            <span className="card__product-amount">
              (Summary: {it.amount * it.price * currencyCoefficient} {currency})
            </span>
          )}
          <div className="flex ml-auto w-auto whitespace-nowrap text-sm px-2">
            <button
              className="flex bg-gray-400 px-2"
              type="button"
              onClick={() => dispatch(addItemToCart(it, it.amount + 1))}
            >
            +
            </button>
            <span className="flex px-2">{it.amount}</span>
            <button
              className="flex bg-gray-400 px-2"
              type="button"
              onClick={() => dispatch(decreaseItemQuantity(it, it.amount - 1))}
            >
            -
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(BasketItem)
