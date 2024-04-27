import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FAQTabs from "./components/FAQTabs";
import {
  useMotionConfig,
  useNavigateWithParams,
  useSocialMediaAndEmailLinks,
} from "@/hooks";
import "./index.less";
const Faq = () => {
  const { goToLogin } = useNavigateWithParams();
  const { openLink, LINK_TYPES } = useSocialMediaAndEmailLinks();
  const { motionScaleUp, motionFadeInUp, motionFadeInDown } = useMotionConfig();
  return (
    <main className="mt-6">
      <motion.div
        initial={motionScaleUp.initial}
        whileInView={motionScaleUp.whileInView}
      >
        <header className="text-center">
          <h1 className="text-[56px] font-bold">Frequently Asked</h1>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-600 text-[56px]">
            Questions
          </span>
        </header>
      </motion.div>
      <motion.div
        initial={motionFadeInDown.initial}
        whileInView={motionFadeInDown.whileInView}
      >
        <FAQTabs></FAQTabs>
      </motion.div>
      <motion.div
        initial={motionFadeInUp.initial}
        whileInView={motionFadeInUp.whileInView}
      >
        <div className=" flex items-center justify-center bg-gradient-animation py-24 rounded-12 mt-20">
          <div className="text-white text-center">
            <h2 className="text-[56px] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-blue-600">
              Ready to Get Started
            </h2>
            <p className="text-lg text-gray-300 ">
              Sign up and dive into io.net in minutes.
            </p>
            <div className="flex space-x-6 justify-center mt-12">
              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={goToLogin}
                sx={{
                  borderRadius: "25px",
                }}
              >
                Sign Up Now
              </Button>
              <Button
                variant="outlined"
                endIcon={<NavigateNextIcon />}
                onClick={() => openLink(LINK_TYPES.DISCORD)}
                sx={{
                  borderRadius: "25px",
                }}
              >
                Join our Discord
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Faq;
