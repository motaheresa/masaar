import { SectionTitle, type TestimonialCardProps } from "../atoms";
import { StoriesSectionClient } from "./StoriesSectionClient";

const TESTIMONIALS_DATA: TestimonialCardProps[] = [
  {
    id: 1,
    quote:
      "I'm John Doe i was confusing while doing my project and when i heared about masaarak i was excited to gain more experience with it mentors",
    author: "John Doe",
    role: "Node js",
    image: undefined,
  },
  {
    id: 2,
    quote:
      "I'm John Doe i was confusing while doing my project and when i heared about masaarak i was excited to gain more experience with it mentors",
    author: "John Doe",
    role: "Node js",
    image: undefined,
  },
  {
    id: 3,
    quote:
      "I'm John Doe i was confusing while doing my project and when i heared about masaarak i was excited to gain more experience with it mentors",
    author: "Jane Smith",
    role: "React Developer",
    image: undefined,
  },
  {
    id: 4,
    quote:
      "I'm John Doe i was confusing while doing my project and when i heared about masaarak i was excited to gain more experience with it mentors",
    author: "Samuel Lee",
    role: "Node.js Developer",
    image: undefined,
  },
];

export const StoriesSection = () => {
  return (
    <section className="w-full  px-6 md:px-12 lg:px-24 py-16 md:py-24 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <SectionTitle
            title="Stories From Our Community"
            className="mb-12 md:mb-16"
          />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {/* <StoriesSectionClient testimonials={TESTIMONIALS_DATA} /> */}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
