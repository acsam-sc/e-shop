import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './card.styles.scss'

const Card = ({ image, title, price, description, amount, currency }) => {
  const [localAmount, setLocalAmount] = useState(amount)

  return (
    <div className="flex w-full md:w-5/12 m-2 border-2">
      <div className="flex w-1/3 justify-center">
        <img alt="product_image" src={image} className="card__image" />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between">
          <span className="card__title">{title}</span>
          <span className="card__price">
            {price} {currency}
          </span>
        </div>
        <span className="card__description">{description}</span>
        {localAmount && (
          <span className="card__product-amount">
            (You have {localAmount} {localAmount > 1 ? 'pieces' : 'piece'} of this product in your{' '}
            <Link to="/basket">Cart</Link>)
          </span>
        )}
        <button
          className="flex self-end mt-auto bg-gray-400 w-auto whitespace-nowrap text-sm px-2"
          type="button"
          onClick={() => setLocalAmount(localAmount + 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card
