import useSWR from "swr";
import Title from "../../components/Title/Title";
import fetcher from "../../../utils/fetcher";
import ItemTile from "../../components/ItemTile/ItemTile";

const TodaysOffer = () => {
  const { data, error, isLoading } = useSWR("http://localhost:5000/menu", fetcher);
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
  const items = data.slice(0, 4);
  return (
    <div>
      <Title subTitle={"Don't miss"} title={"Today's Offer"}></Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {items.map((item) => (
          <ItemTile key={item._id} item={item}></ItemTile>
        ))}
      </div>
      <div className="mt-6">
        <button className="btn btn-outline border-0 border-b-2 uppercase">
          Order Your Favorite Food
        </button>
      </div>
    </div>
  );
};

export default TodaysOffer;
