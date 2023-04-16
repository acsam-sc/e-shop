import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { setSorting, getCurrencyCoefficient } from '../../redux/reducers/shopping'
import { postLog } from '../../api/api'

const Header = () => {
  const { sortedBy, cartItemsSummary } = useSelector((state) => state.shoppingReducer)
  const dispatch = useDispatch()

  const handlePriceSortClick = () => {
    if (sortedBy === 'priceDesc') {
      dispatch(setSorting('priceAsc'))
      postLog(`Sort by priceAsc`)
    } else {
      dispatch(setSorting('priceDesc'))
      postLog(`Sort by priceDesc`)
    }
  }

  const handleAZSortClick = () => {
    if (sortedBy === 'a-z') {
      dispatch(setSorting('z-a'))
      postLog(`Sort by Z-A`)
    } else {
      dispatch(setSorting('a-z'))
      postLog(`Sort by A-Z`)
    }
  }

  return (
    <div className="flex flex-row w-full h-16 bg-black justify-between items-center px-4">
      <Link
        to="/"
        className="flex text-sm md:text-2xl text-white font-bold"
        onClick={() => postLog(`Navigate to ${window.location.origin}/`)}
      >
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
            Price {sortedBy === 'priceDesc' ? <span>&#8593;</span> : <span>&#8595;</span>}
          </button>
          <button type="button" className="px-1 font-semibold" onClick={() => handleAZSortClick()}>
            {sortedBy === 'a-z' ? 'Z-A' : 'A-Z'}
          </button>
        </div>
      </div>
      <div className="flex flex-col text-xs md:text-base text-white items-center">
        <div>Currency:</div>
        <div>
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => {
              dispatch(getCurrencyCoefficient('USD'))
            }}
          >
            USD
          </button>
          |
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => {
              dispatch(getCurrencyCoefficient('EUR'))
            }}
          >
            EUR
          </button>
          |
          <button
            type="button"
            className="px-1 font-semibold"
            onClick={() => {
              dispatch(getCurrencyCoefficient('CAD'))
            }}
          >
            CAD
          </button>
        </div>
      </div>
      <Link
        to="/basket"
        className="flex flex-col text-xs md:text-2xl text-white items-center"
        onClick={() => postLog(`Navigate to ${window.location.origin}/basket`)}
      >
        <span className="text-yellow-500 text-xs md:text-lg justify-center">
          {cartItemsSummary}
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
