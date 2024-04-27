import React from "react";
import { motion } from "framer-motion";
import MapComponent from "./components/MapComponent";
import {
  useMotionConfig,
  useNavigateWithParams,
  useSocialMediaAndEmailLinks,
} from "@/hooks";
import "./index.less";
const Contact = () => {
  const { openLink, availableLinks, LINK_TYPES } =
    useSocialMediaAndEmailLinks();
  const { goAbout } = useNavigateWithParams();
  const {
    motionSlideLeft,
    motionSlideRight,
    motionScaleUp,
    motionZoomFade,
    motionFadeInUp,
  } = useMotionConfig();

  return (
    <div className="text-center flex flex-col items-center">
      <motion.div
        initial={motionScaleUp.initial}
        whileInView={motionScaleUp.whileInView}
      >
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-600 text-[56px]">
          For General Inquiries
        </h1>
        <p className="text-18 text-gray-300 break-words leading-7 text-left">
          You can find more information on our company on
          <span className=" cursor-pointer text-white ml-1" onClick={goAbout}>
            About Us.
          </span>
        </p>
      </motion.div>

      <section className="flex space-x-32 mt-10">
        <motion.div
          initial={motionSlideRight.initial}
          whileInView={motionSlideRight.whileInView}
        >
          <div className="border-gradient">
            <div className="inner">
              <div className="flex items-center flex-col">
                <h3 className="text-[22px] font-bold mt-12">
                  Having technical issues ?
                </h3>
                <span
                  className="text-18 font-bold mt-12 underline cursor-pointer"
                  onClick={() => openLink(LINK_TYPES.SUPPORT_EMAIL)}
                >
                  Contact Support
                </span>
                <span
                  className="text-18 mt-4 hover:text-blue-500 cursor-pointer"
                  onClick={() => openLink(LINK_TYPES.SUPPORT_EMAIL)}
                >
                  {availableLinks.supportEmail}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={motionSlideLeft.initial}
          whileInView={motionSlideLeft.whileInView}
        >
          <div className="border-gradient">
            <div className="inner">
              <div className="flex items-center flex-col">
                <h3 className="text-[22px] font-bold mt-12">
                  For Business inquiries
                </h3>
                <span
                  className="text-18 font-bold mt-12 underline cursor-pointer"
                  onClick={() => openLink(LINK_TYPES.COOPERATION_EMAIL)}
                >
                  Contact Sales
                </span>
                <span
                  className="text-18 mt-4 hover:text-blue-500 cursor-pointer"
                  onClick={() => openLink(LINK_TYPES.COOPERATION_EMAIL)}
                >
                  {availableLinks.cooperationEmail}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="w-full">
        <motion.div
          initial={motionZoomFade.initial}
          whileInView={motionZoomFade.whileInView}
        >
          <h3 className="text-[48px] font-bold mt-12 ">cinc.net HQ</h3>
          <p className="text-22">Beijing Road Palace Museum</p>
          <div className="mt-8 w-full h-[600px]">
            <MapComponent></MapComponent>
          </div>
        </motion.div>
      </section>
      <motion.div
        className="w-full"
        initial={motionFadeInUp.initial}
        whileInView={motionFadeInUp.whileInView}
      >
        <section className="bg-[#0d1b32]  w-full rounded-12 flex justify-center items-center flex-col text-[56px] py-20">
          <h3 className=" font-bold">Join our community</h3>
          <div className="space-x-3">
            <span>on</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-600 text-[56px]">
              discord
            </span>
          </div>
          <span
            className="text-16 cursor-pointer  mt-6  hover:text-blue-500"
            onClick={() => openLink(LINK_TYPES.DISCORD)}
          >
            Join Now
          </span>
        </section>
      </motion.div>
    </div>
  );
};

export default Contact;
