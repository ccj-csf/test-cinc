import React from "react";
import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useMotionConfig } from "@/hooks";
const ProjectAdvantages = () => {
  const { motionZoomFade } = useMotionConfig();
  return (
    <motion.div
      initial={motionZoomFade.initial}
      whileInView={motionZoomFade.whileInView}
    >
      <main className="flex flex-col gap-4 justify-center items-center mt-20">
        <h2 className="text-[30px]  text-center text-gray-300 w-3/5">
          cinc.net Cloud is significantly better, faster and cheaper than any
          other option on the market
        </h2>
        <section className="grid  grid-cols-3  gap-8 mt-10">
          <Paper
            sx={{
              borderRadius: "12px",
            }}
            elevation={3}
            className="flex justify-center items-center flex-col px-4 py-6 gap-2"
          >
            <AlignVerticalBottomIcon></AlignVerticalBottomIcon>
            <h3 className="text-18 font-bold">Better</h3>
            <p className=" text-gray-300 text-center">
              cinc.net Users have unlimited flexibility to choose from the
              world's best GPUs and customize
            </p>
          </Paper>
          <Paper
            sx={{
              borderRadius: "12px",
            }}
            elevation={3}
            className="flex justify-center items-center flex-col px-4 py-6 gap-2"
          >
            <ElectricBoltIcon></ElectricBoltIcon>
            <h3 className="text-18 font-bold">Faster</h3>
            <p className=" text-gray-300 text-center">
              Unlike AWS, which can often takes weeks to deploy, users can
              access the cinc.net network in a matter of seconds
            </p>
          </Paper>
          <Paper
            sx={{
              borderRadius: "12px",
            }}
            elevation={3}
            className="flex justify-center items-center flex-col px-4 py-6 gap-2"
          >
            <CurrencyExchangeIcon></CurrencyExchangeIcon>
            <h3 className="text-18 font-bold">Cheaper</h3>
            <p className=" text-gray-300 text-center">
              With outstanding affordability and high cost efficiency, cinc.net
              can be up to 90% cheaper than the competition
            </p>
          </Paper>
        </section>
        <Paper
          className="mt-4 mb-6"
          sx={{ borderRadius: "12px", padding: "20px 16px" }}
        >
          cinc.net is the only solution that can parallelize ML workloads
          between GPU nodes distributed across the planet with the ability to
          create “super clusters” of 100K, 500K and even 1 million GPUs
        </Paper>
      </main>
    </motion.div>
  );
};

export default ProjectAdvantages;
