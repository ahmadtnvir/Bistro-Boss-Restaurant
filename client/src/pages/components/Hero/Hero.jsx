import { Parallax, Background } from "react-parallax";
const Hero = ({
  hero,
  bg,
  heading,
  description,
  upperCase,
  fontWeight,
  pFontWeight,
  textSize,
}) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={hero}
      bgImageAlt="background image"
      strength={200}
    >
      <div
        className="w-full min-h-[550px] flex justify-center items-center"
        // style={{
        //   background: `url(${hero})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundAttachment: "fixed",
        // }}
      >
        <div className="relative w-[90%] sm:w-[80%] lg:w-[70%] flex justify-center items-center">
          <div
            className={`absolute inset-0 ${bg ? "bg-black" : "bg-white"} ${
              bg ? "opacity-75" : "opacity-100"
            }
          }`}
          ></div>
          <div className="relative w-[95%] sm:w-[85%] lg:w-[80%] py-12 sm:py-16 lg:py-24 mx-auto">
            <h1
              className={`text-${bg ? "[#FFFFFF]" : "[#151515]"}

             ${textSize ? "text-[50px]" : "text-[30px]"}
            sm:${textSize ? "text-[70px]" : "text-[35px]"}
            md:${textSize ? "text-[80px]" : "text-[40px]"}
            lg:${textSize ? "text-[88px]" : "text-[45px]"}
            xl:${textSize ? "text-[96px]" : "text-[50px]"}
            2xl:${textSize ? "text-[104px]" : "text-[55px]"}
            font-${fontWeight} text-center uppercase`}
            >
              {heading}
            </h1>
            <p
              className={`text-${bg ? "[#FFFFFF]" : "[#151515]"}
            ${upperCase && "uppercase"}
            ${textSize ? "text-[16px]" : "text-[12px]"}
            sm:${textSize ? "text-[20px]" : "text-[14px]"}
            md:${textSize ? "text-[22px]" : "text-[16px]"}
            lg:${textSize ? "text-[24px]" : "text-[18px]"}
            xl:${textSize ? "text-[28px]" : "text-[20px]"}
            2xl:${textSize ? "text-[32px]" : "text-[24px]"}
            ${
              pFontWeight ? "font-normal" : "font-semibold"
            } leading-[22px] sm:leading-[26px] text-center mt-4`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Hero;
