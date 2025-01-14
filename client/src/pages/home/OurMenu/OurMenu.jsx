import Title from "../../components/Title/Title";
import useSWR from "swr";
import ItemTile from "../../components/ItemTile/ItemTile";
import fetcher from "../../../utils/fetcher";

const OurMenu = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/menu",
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

  const limitData = data?.slice(0, 6);
  // console.log(limitData);
  return (
    <div>
      <Title subTitle={"Check it out"} title={"From our menu"}></Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {limitData.map((item) => (
          <ItemTile key={item._id} item={item}></ItemTile>
        ))}
      </div>
    </div>
  );
};

export default OurMenu;
