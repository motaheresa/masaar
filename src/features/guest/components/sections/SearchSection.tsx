import React from "react";
import { SectionTitle } from "../atoms";
import { SearchSectionClient } from "./SearchSectionClient";

export const SearchSection = () => {
  return (
    <section className="w-full bg-white px-6 md:px-12 lg:px-24 py-16 md:py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <SectionTitle
            title="Find The Perfect Mentor For You"
            className="mb-8"
            underlineClassName="hidden"
          />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <SearchSectionClient />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
