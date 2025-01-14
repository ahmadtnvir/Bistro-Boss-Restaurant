const filtering = (data, itemName) => {
  const filteredItems = data.filter((item) => item.category === itemName);
  return filteredItems;
};
export default filtering;
