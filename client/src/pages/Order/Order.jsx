import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero/Hero";
import hero from "../../assets/shop/banner2.jpg";
import ItemsTab from "./ItemsTab/ItemsTab";

const Order = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order</title>
      </Helmet>
      {/* Header */}
      <section>
        <Hero
          hero={hero}
          bg={true}
          heading={"Order"}
          description={"Would you like to try a dish?"}
          upperCase={true}
          fontWeight={"bold"}
          textSize={true}
        ></Hero>
      </section>

      {/* Items Tab */}
      <section className="w-full lg:w-[80%] mx-auto my-24 ">
        <ItemsTab></ItemsTab>
      </section>
    </div>
  );
};

export default Order;
