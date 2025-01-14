import Title from "../../components/Title/Title";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  // const [rating, setRating] = useState(0)
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/review",
    fetcher
  );
  if (error)
    return (
      <div class="flex items-center justify-center bg-red-100 text-red-600 font-bold p-4 rounded-md">
        ❌ Failed to load
      </div>
    );
  if (isLoading)
    return (
      <div>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  return (
    <div>
      <Title subTitle={"What Our Clients Say"} title={"Testimonials"}></Title>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {data.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="w-[60%] mx-auto flex flex-col items-center">
                <Rating
                  style={{ maxWidth: 250 }}
                  value={review.rating}
                  readOnly
                />
                <FaQuoteLeft className="text-4xl my-6" />
                <p>{review.details}</p>
                <h3>{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
