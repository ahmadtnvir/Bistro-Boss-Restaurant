import useSWR from "swr";
import fetcher from "./fetcher";
import ItemTile from "../pages/components/ItemTile/ItemTile";
import filtering from "./filtering";
import { Link } from "react-router-dom";

const ItemHook = ({ item }) => {
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
  const filteredItems = filtering(data, item);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <ItemTile key={item._id} item={item}></ItemTile>
        ))}
      </div>
      <div className="mt-6">
        <Link to={`/order/${item}`}>
          <button className="btn btn-outline border-0 border-b-2 uppercase">
            Order Your Favorite Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemHook;
