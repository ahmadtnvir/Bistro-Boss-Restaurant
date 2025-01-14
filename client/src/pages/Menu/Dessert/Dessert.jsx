import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import ItemTile from "../../components/ItemTile/ItemTile";
import filtering from "../../../utils/filtering";

const Dessert = () => {
  const { data, error, isLoading } = useSWR("/menu.json", fetcher);
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
  //   const desserts = data.filter((item) => item.category === "dessert");
  const desserts = filtering(data, "dessert");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
      {desserts.map((item) => (
        <ItemTile key={item._id} item={item}></ItemTile>
      ))}
    </div>
  );
};

export default Dessert;
