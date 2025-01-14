import Hero from "../components/Hero/Hero";
import Banner from "./Banner";
import OnlineOrder from "./OnlineOrder/OnlineOrder";
import OurMenu from "./OurMenu/OurMenu";
import Recommended from "./Recommended/Recommended";
import bgImg from "../../assets/home/featured.jpg";
import FindItems from "./FindItems/FindItems";
import Title from "../components/Title/Title";
import Testimonial from "./Testimonial/Testimonial";
import { Helmet } from "react-helmet-async";
import hero from "../../assets/home/chef-service.jpg";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      {/*----------------- Header Section ----------------- */}
      <header>{/* <Banner></Banner> */}</header>
      {/*----------------- Main -----------------*/}
      <main className="w-full lg:w-[80%] mx-auto">
        {/*----------------- Order Section -----------------*/}
        <section className="mt-20">
          <OnlineOrder></OnlineOrder>
        </section>

        {/*----------------- About Section -----------------*/}
        <section className="my-[90px]">
          <Hero
            hero={hero}
            heading={"BISTRO BOSS"}
            description={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, ipsum in? Totam quisquam debitis aspernatur nam facilis. Dolorum pariatur quia aspernatur libero fugit atque provident necessitatibus, perspiciatis accusamus laudantium illo blanditiis ex distinctio doloremque molestias id sed repellendus doloribus dolores magni quas. Nulla cupiditate asperiores eum vitae natus beatae nesciunt."
            }
            fontWeight={"normal"}
            pFontWeight={true}
          ></Hero>
        </section>

        {/*----------------- Menu section -----------------*/}
        <section>
          <OurMenu></OurMenu>
        </section>

        {/*----------------- Contact Us -----------------*/}
        <section className="bg-[#151515] py-8 flex justify-center items-center my-24">
          <p className="text-[#FFFFFF] text-[50px] font-semibold">
            Call Us: +88 0192345678910
          </p>
        </section>

        {/*----------------- Recommended Section -----------------*/}
        <section>
          <Recommended></Recommended>
        </section>
      </main>

      {/*----------------- Find Section -----------------*/}
      <section
        style={{
          background: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] my-16 md:my-24 flex justify-center items-center py-24 "
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:w-[80%] mx-auto">
          <Title
            subTitle={"Check it out"}
            title={"Featured"}
            textColor={"white"}
            border={true}
          />
          <FindItems />
        </div>
      </section>

      {/*----------------- Testimonials -----------------*/}
      <section className="w-full lg:w-[80%] mx-auto mb-24">
        <Testimonial></Testimonial>
      </section>
    </div>
  );
};

export default Home;
