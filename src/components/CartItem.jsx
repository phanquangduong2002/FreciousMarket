import React, { useEffect, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CartItem = ({ item }) => {
    const [{ cartItems }, dispatch] = useStateValue();

    const [items, setItems] = useState(cartItems);

    const updateQty = (action, item) => {
        if (action === 'add') {
            const newCartItems = [...cartItems];
            newCartItems.map((n) => {
                if (n.id === item.id) {
                    n.qty += 1;
                }
            });
            setItems(newCartItems);
        } else {
            if (item.qty == 1) {
                const newItems = cartItems.filter((n) => n.id !== item.id);
                setItems(newItems);
            } else {
                const newCartItems = [...cartItems];
                newCartItems.map((n) => {
                    if (n.id === item.id) {
                        n.qty -= 1;
                    }
                });
                setItems(newCartItems);
            }
        }
    };

    useEffect(() => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    return (
        <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img
                src={item?.imageURL}
                alt=""
                className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            />

            {/* Name section */}
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-50">{item?.title}</p>
                <p className="text-sm block text-gray-300 font-semibold">
                    $ {parseFloat(item?.price) * item.qty}
                </p>
            </div>

            {/* bottom section */}

            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.div onClick={() => updateQty('remove', item)} whileTap={{ scale: 0.8 }}>
                    <BiMinus className="text-gray-50" />
                </motion.div>
                <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                    {item?.qty}
                </p>
                <motion.div onClick={() => updateQty('add', item)} whileTap={{ scale: 0.8 }}>
                    <BiPlus className="text-gray-50" />
                </motion.div>
            </div>
        </div>
    );
};

export default CartItem;
