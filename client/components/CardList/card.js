import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../redux/reducers/shopping'
import './card.styles.scss'

const Card = ({ id, image, title, price, description, amount, currency }) => {
  const dispatch = useDispatch()

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
        <div className="flex flex-row mt-auto justify-between items-center">
          {amount > 0 && (
            <span className="card__product-amount">
              ({amount} {amount > 1 ? 'pieces' : 'piece'} in your&nbsp;
              <Link to="/basket">Cart</Link>)
            </span>
          )}
          <button
            className="flex ml-auto bg-gray-400 w-auto whitespace-nowrap text-sm px-2"
            type="button"
            onClick={() => dispatch(addItemToCart(id, amount + 1))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card)
