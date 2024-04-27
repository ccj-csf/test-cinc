import React from "react";
import { useNavigateWithParams } from "@/hooks";

const NewFooter = () => {
  const { goToHome } = useNavigateWithParams();
  return (
    <main className="pb-10">
      <img
        src="/icon.svg"
        alt=""
        className="h-[44px] cursor-pointer"
        onClick={goToHome}
      />
      <p className="text-22 mt-6">
        © Copyright cinc.net, inc. 447 Broadway, New York, NY 10013
      </p>
    </main>
  );
};

export default NewFooter;
