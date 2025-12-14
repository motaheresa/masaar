import React from "react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="w-full  py-10 pb-20 animate-fade-in">
      <div
        className="max-w-4xl rounded-md bg-primary/20 px-6 md:px-12 lg:px-24 py-16 md:py-24  mx-auto text-center animate-scale-in"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Title */}
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Ready To Start Your Journey?
        </h2>

        {/* Description */}
        <p
          className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          Expert at React Javascript Framework Expert at front-end and
        </p>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Link
            href="/register/role-selection"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-sm hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Browse Mentors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
