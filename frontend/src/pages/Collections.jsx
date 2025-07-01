import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa"
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'

function Collections() {
  const [showFilter, setShowFilter] = useState(false)
  const { products, search, showSearch } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCaterory] = useState([])
  const [subCategory, setSubCaterory] = useState([])
  const [sortType, SetSortType] = useState("relavent")

  const toggleCategory = (e) => {
    const value = e.target.value
    setCaterory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCaterory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  }

  const applyFilter = () => {
    let productCopy = products.slice()

    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProduct(productCopy)
  }

  const sortProducts = () => {
    let sorted = filterProduct.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProduct(sorted.sort((a, b) => a.price - b.price))
        break
      case 'high-low':
        setFilterProduct(sorted.sort((a, b) => b.price - a.price))
        break
      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    sortProducts()
  }, [sortType])

  useEffect(() => {
    setFilterProduct(products)
  }, [products])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] overflow-x-hidden pb-[110px]'>

      {/* FILTER SIDEBAR */}
      <div className={`w-full md:w-[30vw] lg:w-[20vw] ${showFilter ? 'h-auto' : 'h-[60px]'} md:min-h-screen p-5 border-r border-gray-500 text-[#aaf5fa] lg:fixed`}>
        <p
          className='text-xl font-semibold flex items-center gap-2 cursor-pointer'
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          {!showFilter ? <FaChevronRight className='text-base md:hidden' /> : <FaChevronDown className='text-base md:hidden' />}
        </p>

        {/* CATEGORY FILTER */}
        <div className={`border border-gray-300 px-4 py-3 mt-5 rounded-md bg-[#2c3a44] ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-lg mb-2 text-white'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm'>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className='flex items-center gap-2'>
                <input type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* SUBCATEGORY FILTER */}
        <div className={`border border-gray-300 px-4 py-3 mt-5 rounded-md bg-[#2c3a44] ${showFilter ? '' : 'hidden'} md:block`}>
          <p className='text-lg mb-2 text-white'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm'>
            {['TopWear', 'BottomWear', 'WinterWear'].map(sub => (
              <label key={sub} className='flex items-center gap-2'>
                <input type="checkbox" value={sub} onChange={toggleSubCategory} />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID AREA */}
      <div className='flex-1 md:ml-[30vw] lg:ml-[20vw] px-4 md:px-8'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 mb-6 gap-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => SetSortType(e.target.value)}
            className='bg-[#2c3a44] text-white border border-gray-400 rounded-md px-3 py-2 text-sm md:text-base'
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className='w-full flex flex-wrap justify-center gap-5 min-h-[60vh]'>
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collections
