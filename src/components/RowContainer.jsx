import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { motion } from 'framer-motion';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowCotainer = ({ flag, data, scrollValue }) => {
    const rowCotainer = useRef();

    const [items, setItems] = useState([]);

    const [{ cartItems }, dispatch] = useStateValue();

    const addToCart = (item) => {
        let isRepeated = false;
        const newCartItems = [...cartItems];
        newCartItems.map((n) => {
            if (n.id === item.id) {
                n.qty += 1;
                isRepeated = true;
                setItems(newCartItems);
            }
        });
        if (isRepeated === false) setItems([...cartItems, item]);
    };

    useEffect(() => {
        rowCotainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    useEffect(() => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items.length > 0 ? items : cartItems,
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    return (
        <div
            ref={rowCotainer}
            className={`w-full flex items-center gap-3 my-4 scroll-smooth ${
                flag
                    ? 'overflow-x-scroll scrollbar-none'
                    : 'overflow-x-hidden flex-wrap justify-center'
            }`}
        >
            {data && data.length > 0 ? (
                data.map((item) => (
                    <div
                        key={item?.id}
                        className="w-[220px] min-w-[220px] md:w-[280px] md:min-w-[280px] h-[210px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
                    >
                        <div className="w-full flex items-center justify-between">
                            <motion.div
                                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                                whileHover={{ scale: 1.2 }}
                            >
                                <img
                                    src={item?.imageURL}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                                onClick={() => addToCart(item)}
                            >
                                <MdShoppingCart className="text-white" />
                            </motion.div>
                        </div>
                        <div className="w-full flex flex-col gap-1 items-end justify-end">
                            <p className="text-textColor font-semibold text-base md:text-lg">
                                {item?.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 ">{item?.calories}</p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-headingColor font-semibold">
                                    <span className="text-sm text-red-500 px-1">$</span>
                                    {item?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full flex flex-col items-center justify-center">
                    <img className="h-340" src={NotFound} alt="" />
                    <p className="text-xl text-headingColor font-semibold my-3">
                        Items Not Available
                    </p>
                </div>
            )}
        </div>
    );
};

export default RowCotainer;
