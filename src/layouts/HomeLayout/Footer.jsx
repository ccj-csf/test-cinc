import React from "react";
import SendIcon from "@mui/icons-material/Send";
import XIcon from "@mui/icons-material/X";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigateWithParams, useSocialMediaAndEmailLinks } from "@/hooks";

const Footer = () => {
  const { goAbout, goContact, goFAQ } = useNavigateWithParams();
  const { openLink, LINK_TYPES } = useSocialMediaAndEmailLinks();
  return (
    <div className="pb-20">
      <div className="flex justify-between">
        <div>
          <img src="/public/icon.svg" alt="" className="h-5 ml-1" />
          <div className="bg-[#242832] inline-block px-3 py-1 rounded-12 mt-6  cursor-pointer">
            <span className="text-14 ">Status</span>
            <span className="text-12 text-purple-300 ml-1">
              All service are online
            </span>
          </div>
          <section className=" flex items-center space-x-3 mt-4 ml-1">
            <SendIcon
              fontSize="16"
              className="cursor-pointer"
              onClick={() => openLink(LINK_TYPES.TELEGRAM)}
            ></SendIcon>
            <XIcon
              fontSize="16"
              className=" cursor-pointer"
              onClick={() => openLink(LINK_TYPES.TWITTER)}
            ></XIcon>
          </section>
        </div>
        <div className="text-18">
          <h2 className="mb-4">Company</h2>
          <div className="flex flex-col text-16 text-gray-300  space-y-3">
            <p className=" cursor-pointer" onClick={goAbout}>
              About Us
            </p>
            <p className=" cursor-pointer" onClick={goContact}>
              Contact Us
            </p>
            <p className=" cursor-pointer" onClick={goFAQ}>
              FAQs
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-20 cursor-pointer">
        <img src="/public/icon.svg" alt="" className="h-4" />
        <ShareIcon fontSize="22" className=" ml-2"></ShareIcon>
      </div>
      <div className="flex justify-between ">
        <div className="text-14 mt-6">
          <span className=" text-gray-300">Email Address: </span>
          <span>support@cinc.net</span>
          <span className="ml-10 text-gray-300">Privacy Policy</span>
        </div>
        <p className="text-14 text-gray-300 mt-6">
          © Copyright cinc.net, inc. 447 Broadway, New York, NY 10013
        </p>
      </div>
    </div>
  );
};

export default Footer;
