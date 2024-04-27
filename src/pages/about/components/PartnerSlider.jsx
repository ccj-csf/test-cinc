import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useMotionConfig } from "@/hooks";

const PartnerSlider = ({ partners }) => {
  const { motionFadeInUp } = useMotionConfig();
  return (
    <motion.div
      initial={motionFadeInUp.initial}
      whileInView={motionFadeInUp.whileInView}
    >
      <Swiper
        className="mt-20 "
        navigation
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {partners.map((partner, index) => (
          <SwiperSlide
            key={index}
            className="h-[487px] w-full bg-[#090B0E] !rounded-12"
          >
            <div className="flex justify-center items-center bg-gradient-animation h-full px-20 !rounded-12">
              <div className="flex justify-center items-center gap-6">
                <img src="/icon.svg" className="w-6" />
                <span className="text-white text-[30px] font-bold">X</span>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="!w-14 object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default PartnerSlider;
