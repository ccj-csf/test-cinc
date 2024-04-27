import React from "react";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks";
const EnchantedTextScroll = () => {
  const { motionSlideUp, motionSlideRight, motionSlideLeft } =
    useMotionConfig();
  return (
    <>
      <motion.div
        initial={motionSlideLeft.initial}
        whileInView={motionSlideLeft.whileInView}
      >
        <section className="flex  justify-center mt-20 gap-x-10 items-center">
          <div className=" w-[200px]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-blue-600 text-[56px]">
              Our Mission
            </span>
            <p className="text-gray-300">
              Putting together one million GPUs in a DePIN - decentralized
              physical infrastructure network.
            </p>
          </div>
          <img
            src="https://framerusercontent.com/images/sBVpmEsjRAboLmcYBXzP7w02LWg.png"
            alt=""
            className="w-[368px] h-[352px]"
          />
        </section>
      </motion.div>
      <motion.div
        initial={motionSlideUp.initial}
        whileInView={motionSlideUp.whileInView}
      >
        <div className="wrap mt-10">
          <div className="scrollbar"></div>
          <div className="text-scroll-container">
            <section className="item flex justify-between gap-x-6">
              <img
                src="https://picsum.photos/id/1005/1000/600"
                alt=""
                className="flex-1 w-[200px] h-[200px] object-cover rounded-12"
              />
              <div>
                <h2 className="text-20 font-bold">Before June 2022</h2>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  In the enchanted world of frontend development, pixels and
                  code guide your design journey. Entranced by the dance of
                  colors, shapes unfold on the digital canvas. Every line of
                  code is a spell, weaving functionality and aesthetics into an
                  immersive digital tale.
                </p>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  Our primary challenge was constructing the infrastructure
                  necessary to accommodate a robust backend trading system with
                  significant computational power.
                </p>
              </div>
            </section>
            <section className="item flex justify-between gap-x-6">
              <div>
                <h2 className="text-20 font-bold">Compute Shortage</h2>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  Facing the limitations of traditional computing providers
                  first hand, we got deeper into the world of Distributed
                  Computing and crafting our own solution to the shortage of
                  computing power.
                </p>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  This pursuit ultimately led to the solution of decentralized
                  clusters within a DePIN (Decentralized Physical Infrastructure
                  Network).
                </p>
              </div>
              <img
                src="https://picsum.photos/id/1000/1000/600"
                alt=""
                className="flex-1 w-[200px] h-[200px] object-cover rounded-12"
              />
            </section>
            <section className="item flex justify-between gap-x-6">
              <img
                src="https://picsum.photos/id/1004/1000/600"
                alt=""
                className="flex-1 w-[200px] h-[200px] object-cover rounded-12"
              />
              <div>
                <h2 className="text-20 font-bold">Ray.io</h2>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  Such an infrastructure requires a team of MLOps and DevOps.
                  However, Ray's discovery accelerated our backend development
                  from over six months to under 60 days.
                </p>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  As we integrated Ray and Deployed our GPU clusters, the
                  obstacle of high GPU costs from on-demand cloud providers
                  emerged.
                </p>
              </div>
            </section>
            <section className="item flex justify-between gap-x-6">
              <div>
                <h2 className="text-20 font-bold">Pricey Compute Power</h2>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  For instance, the high cost of an NVIDIA A100 card at over $80
                  per day per card presented a major obstacle.
                </p>
                <p className="text-16 text-gray-300 leading-6 mt-6">
                  We required 50+ cards monthly, resulting in an expense of over
                  $100K. This financial challenge was significant for us, same
                  as it is for other ML startups.
                </p>
              </div>
              <img
                src="https://picsum.photos/id/1002/1000/600"
                alt=""
                className="flex-1 w-[200px] h-[200px] object-cover rounded-12"
              />
            </section>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={motionSlideRight.initial}
        whileInView={motionSlideRight.whileInView}
      >
        <Paper
          className="mt-10 text-center"
          sx={{ borderRadius: "12px", padding: "30px 36px" }}
        >
          <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-300 text-[20px]">
            io.net
          </h3>
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-blue-200 text-[22px]">
            Igniting a DePIN Revolution
          </h2>
          <p className="text-16 text-gray-300 mt-4 leading-6 text-justify">
            Despite these high costs, AI compute requirements have been growing
            tenfold every 18 months. OpenAI's rental of over 300K CPUs and 10K
            GPUs for GPT-3 training marks just the beginning of this
            compute-intensive era.
          </p>
          <p className="text-16 text-gray-300 mt-4 leading-6 text-justify">
            Out of necessity, io.net emerged. A vision born of urgency, we set
            forth the DePIN revolution. io.net embraces the future, where
            computational power knows no limits.
          </p>
        </Paper>
      </motion.div>
    </>
  );
};

export default EnchantedTextScroll;
