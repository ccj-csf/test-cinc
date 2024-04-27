import React from "react";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks";
const InfoBar = () => {
  const { motionScaleUp } = useMotionConfig();
  return (
    <motion.div
      initial={motionScaleUp.initial}
      whileInView={motionScaleUp.whileInView}
    >
      <section className="flex justify-between mb-10">
        <div className="flex flex-col flex-1">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-600 text-[56px]">
            CINC DePIN
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-600 text-[56px]">
            Network
          </span>
          <p className="text-14 text-gray-300 mt-4 leading-6">
            cinc.net Cloud is a <span>state-of-the-art</span> decentralized
            computing network
          </p>
          <p className="text-14 text-gray-300  leading-6">
            that allows machine learning engineers to access{" "}
            <span>scalable</span> distributed clusters at a computing network{" "}
            <span>small fraction of the cost</span> of comparable centralized
            services.
          </p>
        </div>
        <div className=" grid  grid-cols-2 gap-4">
          <img
            src="https://framerusercontent.com/images/dBqADxYIAaPkcGJDzJSqBeTl80.png"
            alt=""
            className="w-[260px] h-[171px] object-cover"
          />
          <img
            src="https://framerusercontent.com/images/rtcj6eh2nQllN9LDYBdCbl4XFA.png"
            alt=""
            className="w-[260px] h-[171px] object-cover"
          />
          <img
            src="https://framerusercontent.com/images/uet2PsJlKTyK18WXzaMAY7A5CkU.png"
            alt=""
            className="w-[260px] h-[171px] object-cover"
          />
          <img
            src="https://framerusercontent.com/images/yjHviK82cqt3OjctbOIFwLCJbL8.png"
            alt=""
            className="w-[260px] h-[171px] object-cover"
          />
        </div>
      </section>
    </motion.div>
  );
};

export default InfoBar;
