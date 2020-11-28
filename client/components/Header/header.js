import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {
  setPriceSorting,
  setAZSorting,
  getCurrencyCoefficient
} from '../../redux/reducers/shopping'

const Header = (props) => {
  const dispatch = useDispatch()

  const handlePriceSortClick = () => {
    dispatch(setPriceSorting(props.requestURL, props.isSortedPriceAsc))
  }

  const handleAZSortClick = () => {
    dispatch(setAZSorting(props.requestURL, props.isSortedAZ))
  }

  return (
    <div className="flex flex-row w-full h-16 bg-black justify-between items-center px-4">
      <Link to="/" className="flex text-sm md:text-2xl text-white font-bold">
        The Best E-Shop ever
      </Link>
      <div className="flex flex-col text-xs md:text-base text-white items-center">
        Sort by:
        <div className="flex">
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => handlePriceSortClick()}
          >
            Price {props.isSortedPriceAsc ? <span>&#8593;</span> : <span>&#8595;</span>}
          </button>
          <button type="button" className="px-1 font-semibold" onClick={() => handleAZSortClick()}>
            {props.isSortedAZ ? 'Z-A' : 'A-Z'}
          </button>
        </div>
      </div>
      <div className="flex flex-col text-xs md:text-base text-white items-center">
        <div>Currency:</div>
        <div>
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(getCurrencyCoefficient(props.requestURL, 'USD'))}
          >
            USD
          </button>
          |
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(getCurrencyCoefficient(props.requestURL, 'EUR'))}
          >
            EUR
          </button>
          |
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => dispatch(getCurrencyCoefficient(props.requestURL, 'CAD'))}
          >
            CAD
          </button>
        </div>
      </div>
      <Link to="/basket" className="flex flex-col text-xs md:text-2xl text-white items-center">
        <span className="text-yellow-500 text-xs md:text-lg justify-center">
          {props.cartItemsSummary}
        </span>
        <div>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="pl-1">Cart</span>
        </div>
      </Link>
    </div>
  )
}

export default Header
