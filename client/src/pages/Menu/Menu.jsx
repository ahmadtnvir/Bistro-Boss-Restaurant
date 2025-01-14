import { Helmet } from "react-helmet-async";
import hero from "../../assets/menu/banner3.jpg";
import Hero from "../components/Hero/Hero";
import TodaysOffer from "./Today'sOffer/TodaysOffer";
import Dessert from "./Dessert/Dessert";
import ItemHook from "../../utils/ItemHook";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>

      {/* Heading */}
      <section>
        <Hero
          hero={hero}
          bg={true}
          heading={"Our Menu"}
          description={"Would you like to try a dish?"}
          upperCase={true}
          fontWeight={"bold"}
          textSize={true}
        ></Hero>
      </section>

      {/* Today's Offer */}
      <section className="w-full lg:w-[80%] mx-auto my-24 ">
        <TodaysOffer></TodaysOffer>
      </section>

      {/* Dessert */}
      <section>
        <Hero
          hero={hero}
          bg={true}
          heading={"DESSERTS"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facilis voluptatibus, aliquid quasi optio quos corporis aliquam blanditiis aspernatur odit."
          }
          // upperCase={true}
          fontWeight={"semibold"}
          // textSize={true}
        ></Hero>
      </section>
      <section className="w-full lg:w-[80%] mx-auto my-24 ">
        {/* <Dessert></Dessert> */}
        <ItemHook item={"dessert"}></ItemHook>
      </section>

      {/* Pizza */}
      <section>
        <Hero
          hero={hero}
          bg={true}
          heading={"Pizza"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facilis voluptatibus, aliquid quasi optio quos corporis aliquam blanditiis aspernatur odit."
          }
          // upperCase={true}
          fontWeight={"semibold"}
          // textSize={true}
        ></Hero>
      </section>
      <section className="w-full lg:w-[80%] mx-auto my-24 ">
        <ItemHook item={"pizza"}></ItemHook>
      </section>

      {/* Salads */}
      <section>
        <Hero
          hero={hero}
          bg={true}
          heading={"salads"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facilis voluptatibus, aliquid quasi optio quos corporis aliquam blanditiis aspernatur odit."
          }
          // upperCase={true}
          fontWeight={"semibold"}
          // textSize={true}
        ></Hero>
      </section>
      <section className="w-full lg:w-[80%] mx-auto my-24 ">
        <ItemHook item={"salad"}></ItemHook>
      </section>

      {/* Soups */}
      <section>
        <Hero
          hero={hero}
          bg={true}
          heading={"soups"}
          description={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi facilis voluptatibus, aliquid quasi optio quos corporis aliquam blanditiis aspernatur odit."
          }
          // upperCase={true}
          fontWeight={"semibold"}
          // textSize={true}
        ></Hero>
      </section>
      <section className="w-full lg:w-[80%] mx-auto my-24 ">
        <ItemHook item={"soup"}></ItemHook>
      </section>
    </div>
  );
};

export default Menu;
