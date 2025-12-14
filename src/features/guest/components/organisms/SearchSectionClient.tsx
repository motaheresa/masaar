"use client";

import React, { useState } from "react";
import { SearchInput } from "../atoms";

export const SearchSectionClient = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  return (
    <SearchInput
      placeholder="Search by Language , Skills , Name.... ( e.g JavaScript , React )"
      value={searchQuery}
      onChange={setSearchQuery}
      onSearch={handleSearch}
      containerClassName=""
      className="shadow-md hover:shadow-lg transition-shadow  py-3 border-none! bg-[#F5F5F5]!"
    />
  );
};
