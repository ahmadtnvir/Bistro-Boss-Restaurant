import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";

const ItemsTab = () => {
  const { selectedCategory } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/menu",
    fetcher
  );

  if (error)
    return (
      <div className="flex items-center justify-center bg-red-100 text-red-600 font-bold p-4 rounded-md">
        ❌ Failed to load
      </div>
    );
  if (isLoading || !data)
    return (
      <div>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );

  const categories = Array.from(new Set(data.map((item) => item.category)));

  const foodCategories = categories.filter(
    (cat) => cat !== "popular" && cat !== "offered"
  );


  return (
    <Tabs
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        setSelectedIndex(index);
      }}
    >
      <TabList>
        {foodCategories.map((cat, i) => (
          <Tab key={i}>
            <span className="uppercase">{cat}</span>
          </Tab>
        ))}
      </TabList>
      {foodCategories.map((cat, i) => (
        <TabPanel key={i}>
          <h2 className="text-xl font-bold">Items of {cat}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data
              .filter((item) => item.category === cat)
              .map((item) => (
                <Card key={item._id} item={item}></Card>
              ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default ItemsTab;
