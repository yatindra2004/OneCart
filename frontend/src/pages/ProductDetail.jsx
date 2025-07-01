import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
  let { productId } = useParams()
  let { products, currency, addtoCart, loading } = useContext(shopDataContext)
  let [productData, setProductData] = useState(false)

  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div>
      {/* Main Product Detail Section */}
      <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row gap-6 pt-[70px] px-4'>

        {/* Image Gallery */}
        <div className='lg:w-[50%] w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-6'>
          {/* Thumbnail Images */}
          <div className='flex lg:flex-col flex-row gap-4'>
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] bg-slate-300 border border-[#80808049] rounded-md overflow-hidden'>
                <img src={img} alt="" className='w-full h-full object-cover cursor-pointer' onClick={() => setImage(img)} />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className='lg:w-[70%] w-[80%] aspect-square border border-[#80808049] rounded-md overflow-hidden'>
            <img src={image} alt="" className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Product Info */}
        <div className='lg:w-[50%] w-full flex flex-col gap-4 text-white'>
          <h1 className='text-2xl md:text-4xl font-bold'>{productData.name.toUpperCase()}</h1>
          <div className='flex items-center gap-1'>
            {[...Array(4)].map((_, i) => <FaStar key={i} className='text-yellow-400' />)}
            <FaStarHalfAlt className='text-yellow-400' />
            <p className='text-white text-sm ml-2'>(124)</p>
          </div>
          <p className='text-xl font-semibold'>{currency} {productData.price}</p>
          <p className='text-sm md:text-base w-full md:w-[80%]'>{productData.description} and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.</p>

          {/* Size Selector */}
          <div className='mt-4'>
            <p className='text-lg font-semibold mb-2'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button key={index}
                  className={`border py-2 px-4 bg-slate-300 rounded-md 
                  ${item === size ? 'bg-black text-[#2f97f1] text-lg' : ''}`}
                  onClick={() => setSize(item)}>
                  {item}
                </button>
              ))}
            </div>
            <button
              className='mt-4 bg-[#495b61c9] text-white py-2 px-6 rounded-xl border border-[#80808049] shadow-md shadow-black active:bg-slate-500'
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          {/* Highlights */}
          <div className='mt-4 border-t border-slate-700 pt-4 text-sm md:text-base'>
            <p>✅ 100% Original Product</p>
            <p>💰 Cash on delivery available</p>
            <p>🔁 Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Related */}
      <div className='w-full min-h-[60vh] bg-gradient-to-l from-[#141414] to-[#0c2025] py-10 px-4'>
        {/* Tabs */}
        <div className='flex gap-4 mb-4 text-white'>
          <p className='border px-4 py-2 text-sm'>Description</p>
          <p className='border px-4 py-2 text-sm'>Reviews (124)</p>
        </div>

        {/* Product Long Description */}
        <div className='bg-[#3336397c] text-white text-sm md:text-base p-4 rounded-md w-full max-w-4xl'>
          Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
        </div>

        {/* Related Products */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default ProductDetail
 