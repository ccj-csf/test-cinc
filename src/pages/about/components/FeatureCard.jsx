import React from "react";
import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";
import BackHandIcon from "@mui/icons-material/BackHand";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useMotionConfig } from "@/hooks";
const FeatureCard = () => {
  const { motionZoomFade } = useMotionConfig();
  return (
    <motion.div
      initial={motionZoomFade.initial}
      whileInView={motionZoomFade.whileInView}
    >
      <main className="mt-20">
        <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-blue-100 text-[56px] text-center">
          Your Needs, Our Focus
        </h3>
        <p className="text-16 text-gray-300 text-center mt-4">
          Our users satisfaction drives our every action and decision, making
          your success our ultimate goals
        </p>
        <section className="grid  grid-cols-3  gap-8 mt-14">
          <Paper
            sx={{
              borderRadius: "12px",
            }}
            elevation={3}
            className="flex justify-center items-center flex-col px-4 py-6 gap-2"
          >
            <BackHandIcon></BackHandIcon>
            <h3 className="text-18 font-bold">Ease of Use</h3>
            <p className=" text-gray-300 text-center">
              With our UX/UI, We place a premium on user experience
            </p>
          </Paper>
          <Paper
            sx={{
              borderRadius: "12px",
            }}
            elevation={3}
            className="flex justify-center items-center flex-col px-4 py-6 gap-2"
          >
            <AddModeratorIcon></AddModeratorIcon>
            <h3 className="text-18 font-bold">Security</h3>
            <p className=" text-gray-300 text-center">
              Fortified Security isn't just a feature, it's a commitment
            </p>
          </Paper>
          <Paper
            sx={{
              borderRadius: "12px",
            }}
            elevation={3}
            className="flex justify-center items-center flex-col px-4 py-6 gap-2"
          >
            <PaymentsIcon></PaymentsIcon>
            <h3 className="text-18 font-bold">Fast Payments</h3>
            <p className=" text-gray-300 text-center">
              Streamlined payment system and enables users to be paid in crypto
            </p>
          </Paper>
        </section>
      </main>
    </motion.div>
  );
};

export default FeatureCard;
