// import service from "../../../assets/home/featured.jpg";
// const FindItems = () => {
//   return (
//     <div className="flex flex-col lg:flex-row justify-center items-center gap-10 text-white">
//       <div>
//         <img className="w-full object-cover rounded-xl" src={service} alt="" />
//       </div>
//       <div className="text-start">
//         <h2>
//           December 29, 2024 <br />
//           WHERE CAN I GET SOME?
//         </h2>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
//           inventore explicabo animi, consequatur consequuntur nulla minus!
//           Itaque, nam! Animi tempore ea veniam! Omnis quo ea pariatur odio. Unde
//           asperiores, illo et obcaecati odio, excepturi maiores cupiditate, quas
//           consequuntur sit neque! Qui eaque dolorem in libero nesciunt debitis
//           odio magnam? Earum!
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FindItems;
import service from "../../../assets/home/featured.jpg";

const FindItems = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 text-white">
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={service}
          alt="Featured"
        />
      </div>

      {/* Text Content */}
      <div className="text-start w-full lg:w-1/2 space-y-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">
          December 29, 2024 <br />
          WHERE CAN I GET SOME?
        </h2>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
          inventore explicabo animi, consequatur consequuntur nulla minus!
          Itaque, nam! Animi tempore ea veniam! Omnis quo ea pariatur odio. Unde
          asperiores, illo et obcaecati odio, excepturi maiores cupiditate, quas
          consequuntur sit neque! Qui eaque dolorem in libero nesciunt debitis
          odio magnam? Earum!
        </p>
      </div>
    </div>
  );
};

export default FindItems;
