import React from "react";
import InfoBar from "./components/InfoBar";
import EnchantedTextScroll from "./components/EnchantedTextScroll";
import ProjectAdvantages from "./components/ProjectAdvantages";
import FeatureCard from "./components/FeatureCard";
import PartnerSlider from "./components/PartnerSlider";
import "./index.less";
const About = () => {
  const partners = [
    { name: "Partner 1", logo: "https://picsum.photos/id/1004/1000/600" },
    { name: "Partner 2", logo: "https://picsum.photos/id/1005/1000/600" },
    { name: "Partner 3", logo: "https://picsum.photos/id/1006/1000/600" },
    { name: "Partner 4", logo: "https://picsum.photos/id/1008/1000/600" },
  ];
  return (
    <main>
      <InfoBar></InfoBar>
      <ProjectAdvantages></ProjectAdvantages>
      <EnchantedTextScroll></EnchantedTextScroll>
      <FeatureCard></FeatureCard>
      <PartnerSlider partners={partners}></PartnerSlider>
    </main>
  );
};

export default About;
