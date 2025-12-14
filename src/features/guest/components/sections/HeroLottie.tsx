"use client";

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
    </div>
  );
};
