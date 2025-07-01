import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
    let [method, setMethod] = useState('cod')
    let navigate = useNavigate()
    const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
    let { serverUrl } = useContext(authDataContext)
    let [loading, setLoading] = useState(false)

    let [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', pinCode: '', country: '', phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
                if (data) {
                    navigate("/order")
                    setCartItem({})
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let orderItems = []
            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            switch (method) {
                case 'cod':
                    const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
                    if (result.data) {
                        setCartItem({})
                        toast.success("Order Placed")
                        navigate("/order")
                    } else {
                        toast.error("Order Placed Error")
                    }
                    setLoading(false)
                    break;

                case 'razorpay':
                    const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
                    if (resultRazorpay.data) {
                        initPay(resultRazorpay.data)
                        toast.success("Order Placed")
                    }
                    setLoading(false)
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start justify-center gap-10 px-4 py-20'>
            {/* LEFT: FORM */}
            <div className='w-full lg:w-1/2 flex justify-center'>
                <form onSubmit={onSubmitHandler} className='w-full max-w-[600px]'>
                    <div className='mb-6'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <input type="text" placeholder='First name' required name='firstName' value={formData.firstName}
                            onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />

                        <input type="text" placeholder='Last name' required name='lastName' value={formData.lastName}
                            onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />
                    </div>

                    <div className='mb-4'>
                        <input type="email" placeholder='Email address' required name='email' value={formData.email}
                            onChange={onChangeHandler} className='w-full h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />
                    </div>

                    <div className='mb-4'>
                        <input type="text" placeholder='Street' required name='street' value={formData.street}
                            onChange={onChangeHandler} className='w-full h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <input type="text" placeholder='City' required name='city' value={formData.city}
                            onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />

                        <input type="text" placeholder='State' required name='state' value={formData.state}
                            onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <input type="text" placeholder='Pincode' required name='pinCode' value={formData.pinCode}
                            onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />

                        <input type="text" placeholder='Country' required name='country' value={formData.country}
                            onChange={onChangeHandler} className='w-1/2 h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />
                    </div>

                    <div className='mb-6'>
                        <input type="text" placeholder='Phone' required name='phone' value={formData.phone}
                            onChange={onChangeHandler} className='w-full h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-4 shadow-sm shadow-[#343434]' />
                    </div>

                    <div className='flex justify-center md:justify-end'>
                        <button type='submit'
                            className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-3 border border-[#80808049] shadow-md'>
                            {loading ? <Loading /> : "PLACE ORDER"}
                        </button>
                    </div>
                </form>
            </div>

            {/* RIGHT: CART + PAYMENT */}
            <div className='w-full lg:w-1/2 flex flex-col items-center gap-6'>
                <CartTotal />

                <div>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                </div>

                <div className='flex flex-wrap justify-center gap-6'>
                    <button onClick={() => setMethod('razorpay')}
                        className={`w-[150px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-[4px] border-blue-900' : ''}`}>
                        <img src={razorpay} alt="razorpay" className='w-full h-full object-contain rounded-sm' />
                    </button>

                    <button onClick={() => setMethod('cod')}
                        className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-sm px-4 rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[4px] border-blue-900' : ''}`}>
                        CASH ON DELIVERY
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
