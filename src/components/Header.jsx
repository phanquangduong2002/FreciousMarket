import React, { useState } from 'react';
import { MdShoppingCart, MdAdd, MdLogout } from 'react-icons/md';
import { BiHomeAlt, BiFoodMenu } from 'react-icons/bi';
import { RiContactsLine } from 'react-icons/ri';
import { MdOutlineRoomService } from 'react-icons/md';

import { motion } from 'framer-motion';

import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.config';

import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';

import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const Login = async () => {
        if (!user) {
            const {
                user: {
                    stsTokenManager: { refreshToken },
                    providerData,
                },
            } = await signInWithPopup(firebaseAuth, provider);

            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });

            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };

    const Logout = () => {
        setIsMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
            {/* Desktop & Tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={''} onClick={() => setIsMenu(false)}>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <img src={Logo} className="w-10 object-cover" alt="logo" />
                        <p className="text-headingColor font-bold text-2xl">Marker</p>
                    </motion.div>
                </Link>

                <div className="flex items-center justify-center gap-7">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8 ml-auto"
                    >
                        <li
                            className=" text-textColor hover:text-headingColor duration-100 text-lg font-medium transition-all ease-in-out cursor-pointer"
                            onClick={() => setIsMenu(false)}
                        >
                            Home
                        </li>
                        <li
                            className=" text-textColor hover:text-headingColor duration-100 text-lg font-medium transition-all ease-in-out cursor-pointer"
                            onClick={() => setIsMenu(false)}
                        >
                            Menu
                        </li>
                        <li
                            className=" text-textColor hover:text-headingColor duration-100 text-lg font-medium transition-all ease-in-out cursor-pointer"
                            onClick={() => setIsMenu(false)}
                        >
                            About Us
                        </li>
                        <li
                            className=" text-textColor hover:text-headingColor duration-100 text-lg font-medium transition-all ease-in-out cursor-pointer"
                            onClick={() => setIsMenu(false)}
                        >
                            Service
                        </li>
                    </motion.ul>

                    <motion.div
                        whileTap={{ scale: 0.8 }}
                        className="relative flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            setIsMenu(false);
                            showCart();
                        }}
                    >
                        <MdShoppingCart className="text-textColor text-2xl" />
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-3.5 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </motion.div>
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-9 min-w-[36px] h-9 min-h-[36px] drop-shadow-x1 cursor-pointer rounded-full"
                            src={user ? user.photoURL : Avatar}
                            alt="useprofile"
                            onClick={Login}
                        />
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-36 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
                            >
                                {user && user.email === 'phanquangduong2002@gmail.com' && (
                                    <Link to={'/createItem'}>
                                        <p
                                            className="px-3 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            New Item <MdAdd />
                                        </p>
                                    </Link>
                                )}
                                <Link
                                    to={''}
                                    className="px-3 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={Logout}
                                >
                                    Log Out <MdLogout />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="relative flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        setIsMenu(false);
                        showCart();
                    }}
                >
                    <MdShoppingCart className="text-textColor text-2xl" />
                    {cartItems && cartItems.length > 0 && (
                        <div className="absolute -top-3.5 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </motion.div>
                <Link to={''} onClick={() => setIsMenu(false)}>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <img src={Logo} className="w-8 object-cover" alt="logo" />
                        <p className="text-headingColor font-bold text-base">Marker</p>
                    </motion.div>
                </Link>
                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-9 min-w-[36px] h-9 min-h-[36px] drop-shadow-x1 cursor-pointer rounded-full"
                        src={user ? user.photoURL : Avatar}
                        alt="useprofile"
                        onClick={Login}
                    />
                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-36 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0"
                        >
                            {user && user.email === 'phanquangduong2002@gmail.com' && (
                                <Link to={'/createItem'}>
                                    <p
                                        className="px-3 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        New Item <MdAdd />
                                    </p>
                                </Link>
                            )}
                            <ul className="flex flex-col">
                                <li
                                    className="px-3 py-2 flex items-center gap-3 text-textColor cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Home <BiHomeAlt />
                                </li>
                                <li
                                    className="px-3 py-2 flex items-center gap-3 text-textColor cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Menu <BiFoodMenu />
                                </li>
                                <li
                                    className="px-3 py-2 flex items-center gap-3 text-textColor cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base"
                                    onClick={() => setIsMenu(false)}
                                >
                                    About Us <RiContactsLine />
                                </li>
                                <li
                                    className="px-3 py-2 flex items-center gap-3 text-textColor cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-base"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Service <MdOutlineRoomService />
                                </li>
                            </ul>
                            <Link
                                to={''}
                                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center gap-3 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                                onClick={Logout}
                            >
                                Log Out <MdLogout />
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
