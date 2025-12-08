"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./StoriesSection.module.css";
import { SectionTitle, TestimonialCard, type TestimonialCardProps } from "../atoms";

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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="w-full  px-6 md:px-12 lg:px-24 py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <SectionTitle
            title="Stories From Our Community"
            className="mb-12 md:mb-16"
          />
        </motion.div>

        <motion.div className="relative" variants={itemVariants}>
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            modules={[Pagination, Navigation]}
            className={styles.storiesSwiper}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            onInit={(swiper) => {
              // Assign refs after Swiper initialization
              if (swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
          >
            {TESTIMONIALS_DATA.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default StoriesSection;
