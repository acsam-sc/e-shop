import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { setCurrency, getSortedListAZ, getSortedListPrice } from '../../redux/reducers/shopping'

const Header = () => {
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row w-full h-16 bg-black justify-between items-center px-4">
      <div className="flex text-sm md:text-2xl text-white font-bold">The Best E-Shop ever</div>
      <div className="flex flex-col text-xs md:text-base text-white items-center">
        Sort by:
        <div className="flex">
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(getSortedListPrice())}
            >
            Price
          </button>
          <button
          type="button"
          className="px-1 font-semibold"
          onClick={() => dispatch(getSortedListAZ())}
          >
            A-Z
          </button>
        </div>
      </div>
      <div className="flex flex-col text-xs md:text-base text-white items-center">
        <div>Currency:</div>
        <div>
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(setCurrency('USD'))}
          >
            USD
          </button>
          |
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(setCurrency('EUR'))}
          >
            EUR
          </button>
          |
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(setCurrency('CAD'))}
          >
            CAD
          </button>
        </div>
      </div>
      <Link to="/basket" className="flex flex-col text-xs md:text-2xl text-white items-center">
        <span className="text-yellow-500 text-xs md:text-lg justify-center">0</span>
        <div>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="pl-1">Cart</span>
        </div>
      </Link>
    </div>
  )
}

export default Header
