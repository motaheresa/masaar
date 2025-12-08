"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "Search...",
      value = "",
      onChange,
      onSearch,
      className = "",
      inputClassName = "",
      containerClassName = "",
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(value);
      }
    };

    const handleSearchClick = () => {
      onSearch?.(value);
    };

    return (
      <div className={`w-full ${containerClassName}`}>
        <div
          className={`relative flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all ${className}`}
        >
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent px-4 py-3 text-gray-800 placeholder:text-gray-500 outline-none ${inputClassName}`}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="px-4 py-3 text-gray-500 hover:text-primary transition-colors"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;