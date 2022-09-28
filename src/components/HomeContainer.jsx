import React from 'react';
import Delivery from '../img/delivery.png';
import HeroBg from '../img/heroBg.png';
import { heroData } from '../utils/data';

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
            <div className="py-2 flex-1 flex flex-col items-start justify-center gap-5">
                <div className="flex items-center gap-2 justify-center bg-orange-200 px-3 py-1 rounded-full">
                    <p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
                    <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
                        <img
                            src={Delivery}
                            className="w-full h-full object-contain"
                            alt="delivery"
                        />
                    </div>
                </div>

                <p className="text-[1.8rem] lg:text-[3rem] font-bold tracking-wide text-headingColor">
                    The fastest Delivery in
                    <span className="text-orange-500 text-[2.5rem] lg:text-[4rem]">Your City</span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit eaque
                    fugit distinctio est nam voluptatum architecto, porro iusto deserunt recusandae
                    ipsa minus eos sunt, dolores illo repellat facere suscipit!
                </p>

                <button
                    type="button"
                    className="text-white font-medium bg-gradient-to-br from-orange-300 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Order Now
                </button>
            </div>
            <div className="py-2 flex-1 flex items-center relative">
                <img
                    src={HeroBg}
                    className="ml-auto h-420 w-full lg:w-auto lg:h-600"
                    alt="hero-bg"
                />
                <div className="w-full h-[90%] absolute top-12 left-0 flex items-center justify-center gap-8 flex-wrap md:grid md:grid-rows-2 md:grid-flow-col md:gap-x-8 md:gap-y-20 md:px-32 py-2 md:py-4">
                    {heroData &&
                        heroData.map((item) => (
                            <div
                                key={item.id}
                                className="  lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >
                                <img
                                    src={item.imageSrc}
                                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                                    alt="I1"
                                />
                                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                                    {item.name}
                                </p>

                                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                    {item.decp}
                                </p>

                                <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-600">$</span> {item.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default HomeContainer;
