const Title = ({ subTitle, title, textColor, border }) => {
  return (
    <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto px-4">
      <h4 className="italic text-[#D99904] text-base sm:text-lg md:text-xl font-normal">
        --- {subTitle} ---
      </h4>
      <div className={` mt-4 mb-5 ${border ? "border-t-2" : "divider"}`}></div>
      <h2
        className={`uppercase text-${
          textColor ? textColor : "[#151515]"
        } text-2xl sm:text-3xl md:text-4xl font-normal mb-6`}
      >
        {title}
      </h2>
      <div className={` mt-4 mb-5 ${border ? "border-t-2" : "divider"}`}></div>
    </div>
  );
};

export default Title;
