import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigateWithParams } from "@/hooks";
import "./index.less";

const Navbar = () => {
  const { goAbout, goContact, goFaq } = useNavigateWithParams();
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isCompanyOpen, setCompanyOpen] = useState(false);

  return (
    <div className=" text-white  sticky top-0 z-50 bg-[#090B0E]">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <img src="/icon.svg" alt="Logo" className="mr-10 h-7 w-[]118px]" />
        </div>

        <div className="flex items-center space-x-10">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button className="hover:text-blue-500 focus:outline-none menu">
              Products
            </button>
            {isProductsOpen && (
              <div className="absolute  -left-[100px] top-10 py-[56px]  px-[40px] bg-[#11141A] shadow-lg rounded-lg dropdown border border-[#242832] min-w-[600px]">
                <main className="grid  grid-cols-3 gap-x-4">
                  <section className="w-[154px] flex flex-col justify-center">
                    <img className="w-[154px] h-[150px]" src="" />
                    <div className="flex items-center justify-around mt-4">
                      <img src="/icon.svg" className="h-4 w-[62px]" alt="" />
                      <span className="border-r h-[16px] border-[#d9d9d9]"></span>
                      <span className="text-16 text-[#A5A7B2]">Cosmos</span>
                    </div>
                    <p className="text-14 text-[#A5A7B2] ml-1 mt-1">
                      What is CINC Cosmos
                    </p>
                  </section>
                  <section className="w-[154px] flex flex-col justify-center">
                    <img className="w-[154px] h-[150px]" src="" />
                    <div className="flex items-center justify-around mt-4">
                      <img src="/icon.svg" className="h-4 w-[62px]" alt="" />
                      <span className="border-r h-[16px] border-[#d9d9d9]"></span>
                      <span className="text-16 text-[#A5A7B2]">Voyager</span>
                    </div>
                    <p className="text-14 text-[#A5A7B2] ml-1 mt-1">
                      What is CINC Voyager
                    </p>
                  </section>
                  <section className="w-[154px] flex flex-col justify-center">
                    <img className="w-[154px] h-[150px]" src="" />
                    <div className="flex items-center justify-around mt-4">
                      <img src="/icon.svg" className="h-4 w-[62px]" alt="" />
                      <span className="border-r h-[16px] border-[#d9d9d9]"></span>
                      <span className="text-16 text-[#A5A7B2]">Nexus</span>
                    </div>
                    <p className="text-14 text-[#A5A7B2] ml-1 mt-1">
                      What is CINC Nexus
                    </p>
                  </section>
                </main>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button className="hover:text-blue-500 focus:outline-none menu">
              Company
            </button>
            {isCompanyOpen && (
              <div className="absolute  -left-[100px] top-10 py-[56px]  px-[40px] bg-[#11141A] shadow-lg rounded-lg dropdown border border-[#242832] min-w-[600px]">
                <main className="grid  grid-cols-3 gap-x-4">
                  <section
                    className="w-[154px] flex flex-col justify-center"
                    onClick={goAbout}
                  >
                    <img className="w-[154px] h-[150px]" src="" />
                    <div className="flex items-center justify-around mt-4">
                      <img src="/icon.svg" className="h-4 w-[62px]" alt="" />
                      <span className="border-r h-[16px] border-[#d9d9d9]"></span>
                      <span className="text-16 text-[#A5A7B2]">About Us</span>
                    </div>
                  </section>
                  <section
                    className="w-[154px] flex flex-col justify-center"
                    onClick={goContact}
                  >
                    <img className="w-[154px] h-[150px]" src="" />
                    <div className="flex items-center justify-around mt-4">
                      <img src="/icon.svg" className="h-4 w-[62px]" alt="" />
                      <span className="border-r h-[16px] border-[#d9d9d9]"></span>
                      <span className="text-16 text-[#A5A7B2]">Contact Us</span>
                    </div>
                  </section>
                  <section
                    className="w-[154px] flex flex-col justify-center"
                    onClick={goFaq}
                  >
                    <img className="w-[154px] h-[150px]" src="" />
                    <div className="flex items-center justify-around mt-4">
                      <img src="/icon.svg" className="h-4 w-[62px]" alt="" />
                      <span className="border-r h-[16px] border-[#d9d9d9]"></span>
                      <span className="text-16 text-[#A5A7B2]">FAQs</span>
                    </div>
                  </section>
                </main>
              </div>
            )}
          </div>
        </div>

        <div>
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: "25px" }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
