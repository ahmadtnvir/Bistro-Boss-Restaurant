import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import Card from "../../components/Card/Card";
import Title from "../../components/Title/Title";

const Recommended = () => {
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
  const sliceData = data.slice(0, 3);
  //   console.log(sliceData);
  return (
    <div>
      <Title subTitle={"Should Try"} title={"CHEF RECOMMENDS"}></Title>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-3">
        {sliceData.map((item) => (
          <Card key={item._id} item={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
