import React from "react";
import { SectionTitle, MentorCard, type MentorCardProps } from "../atoms";
import mentorImage from "@/assets/images/mentor-1.jpg";

const MENTORS_DATA: MentorCardProps[] = [
  {
    id: 1,
    name: "John Doe",
    title: "Full-Stack Developer",
    description: "Expert at front-end and back-end development ",
    rating: 4.3,
    reviews: 43,
    image: mentorImage,
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "React Developer",
    description: "Expert at React Javascript Framework",
    rating: 5.0,
    reviews: 60,
    image: mentorImage,
  },
  {
    id: 3,
    name: "Samuel Lee",
    title: "Nodejs Developer",
    description: "Expert at Nodejs Javascript Backend Environment",
    rating: 3.0,
    reviews: 30,
    image: mentorImage,
  },
];

export const TopRatedMentorsSection = () => {
  return (
    <section className="w-full  px-6 md:px-12 lg:px-24 py-16 md:py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <SectionTitle
            title="Meet Our Top-Rated Mentors"
            className="mb-12 md:mb-16"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MENTORS_DATA.map((mentor, index) => (
            <div
              key={mentor.id}
              className="animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <MentorCard
                {...mentor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedMentorsSection;
