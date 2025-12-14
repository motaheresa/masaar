"use client";

import Image from "next/image";
// import HeroLottieImage from "@/assets/images/student with laptop.gif";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const HeroLottie = () => {
  return (
    <div className="w-full max-w-[550px] aspect-square">
      <DotLottieReact
        src={"/guestHero.lottie"}
        speed={0.3}
        autoplay  
        loop
        style={{ width: "100%", height: "100%" }}
      />
      {/* <Image src={HeroLottieImage} alt="Hero Lottie" width={550} height={550} priority fetchPriority="high" /> */}
    </div>
  );
};
