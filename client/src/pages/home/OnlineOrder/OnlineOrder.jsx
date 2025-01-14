import Title from "../../components/Title/Title";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide3.jpg";
import img4 from "../../../assets/home/slide4.jpg";
import img5 from "../../../assets/home/slide5.jpg";

const OnlineOrder = () => {
  return (
    <div>
      <Title
        subTitle={"From 11:00am to 10:00pm"}
        title={"Order Online"}
      ></Title>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="flex flex-col justify-center items-center relative">
            <img src={img1} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <span className="hidden md:flex lg:flex absolute bottom-10 text-[#FFFFFF] text-[32px] font-normal">
              Salad
            </span>
          </SwiperSlide>
          <SwiperSlide className="flex flex-col justify-center items-center relative">
            <img src={img2} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <span className="hidden md:flex lg:flex absolute bottom-10 text-[#FFFFFF] text-[32px] font-normal">
              Pizza
            </span>
          </SwiperSlide>
          <SwiperSlide className="flex flex-col justify-center items-center relative">
            <img src={img3} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <span className="hidden md:flex lg:flex absolute bottom-10 text-[#FFFFFF] text-[32px] font-normal">
              Soups
            </span>
          </SwiperSlide>
          <SwiperSlide className="flex flex-col justify-center items-center relative">
            <img src={img4} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <span className="hidden md:flex lg:flex absolute bottom-10 text-[#FFFFFF] text-[32px] font-normal">
              Desserts
            </span>
          </SwiperSlide>
          <SwiperSlide className="flex flex-col justify-center items-center relative">
            <img src={img5} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <span className="hidden md:flex lg:flex absolute bottom-10 text-[#FFFFFF] text-[32px] font-normal">
              Vegetables
            </span>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default OnlineOrder;
