import React from "react";
import { SectionTitle, FeatureCard, type FeatureCardProps } from "../atoms";
import { LuUser } from "react-icons/lu";
import { RiPulseFill } from "react-icons/ri";
import { TbClockHour4 } from "react-icons/tb";


const FEATURES_DATA: FeatureCardProps[] = [
  {
    id: 1,
    icon: <LuUser />,
    title: "Personalized Guidance",
    description: "Expert at front-end and back-end development",
  },
  {
    id: 2,
    icon: <RiPulseFill />,
    title: "Career Growth",
    description: "Expert at React Javascript Framework",
  },
  {
    id: 3,
    icon: <TbClockHour4 />,
    title: "Flexible Scheduling",
    description: "Expert at Nodejs Javascript Backend Environment",
  },
];

export const WhyChooseMasaarSection = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 md:py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <SectionTitle
            title="Why choose Masaark?"
            className="mb-12 md:mb-16"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {FEATURES_DATA.map((feature, index) => (
            <div
              key={feature.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <FeatureCard
                {...feature}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMasaarSection;
