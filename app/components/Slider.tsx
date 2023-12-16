"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//import './styles.css';

// import required modules
import { Navigation } from "swiper/modules";
import herosection from "@/public/images/hero-section.png";
import skill from "@/public/images/skill.jpg";
import metalwork from "@/public/images/metalwork.jpeg";
import hoteltourism from "@/public/images/hoteltourism.jpeg";

import Image from "next/image";
export default function Slider() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper -z-50"
      >
        <SwiperSlide>
          <img src="/images/skill.jpg" />
          {/* <Image src={skill} alt="Hero " width={100} /> */}
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/metalwork.jpeg" />
          {/* <Image src={metalwork} alt="Hero " width={100} /> */}
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/foodethiopia.jpeg" />
          {/* <Image src={hoteltourism} alt="Hero " /> */}
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/hero-section.png" />
          {/* <Image src={herosection} alt="Hero " width={100} /> */}
        </SwiperSlide>

        <SwiperSlide>
          <img src="/images/mihle.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/technical-staff.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/justina.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/youth.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/garment.jpeg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
