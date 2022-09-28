import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

import EmptyCart from '../img/emptyCart.png';
import CartItem from './CartItem';

const CartContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });

        localStorage.setItem('cartItems', JSON.stringify([]));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="w-full fixed top-0 right-0 md:w-[400px] h-screen bg-white drop-shadow-md flex flex-col z-[100]"
        >
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
                <motion.div whileTap={{ scale: 0.8 }} onClick={showCart}>
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
                </motion.div>
                <p className="text-textColor text-lg font-semibol">Cart</p>
                <motion.p
                    onClick={clearCart}
                    whileTap={{ scale: 0.8 }}
                    className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
                >
                    Clear
                    <RiRefreshFill />
                </motion.p>
            </div>
            {/* Bottom Section */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
                    {/* Cart Items */}
                    <div className="w-full h-[480px] md:h-[420px] px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {/* Cart Item */}
                        {cartItems.map((item) => (
                            <CartItem key={item?.id} item={item} />
                        ))}
                    </div>

                    {/* Cart total Section */}
                    <div className="w-full rounded-t-[2rem] flex flex-col items-center justify-center px-8 py-2">
                        {user ? (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                            >
                                Login to check out
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-10">
                    <img src={EmptyCart} className="w-300" alt="" />
                    <p className="text-xl text-textColor font-semibold">
                        Add some items to your cart
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default CartContainer;
