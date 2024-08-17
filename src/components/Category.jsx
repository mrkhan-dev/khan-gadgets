import {useState} from "react";
import Select from "react-select";
import UseAllProducts from "../hooks/UseAllProducts";
import {CiSearch} from "react-icons/ci";

const Category = () => {
  const [allProducts] = UseAllProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = Array.from(
    new Set(allProducts.map((res) => res.categoryName))
  );

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const filterProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.categoryName === selectedCategory.value
      : true;
    const matchesSearchQuery = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold">Featured Product</h1>
      <div className="flex">
        <div className="w-1/3 pl-6">
          <div className="search relative">
            <input
              className="p-4 w-72 border outline-none rounded-md text-slate-900"
              type="text"
              placeholder="search by product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button disabled className="absolute mt-4 ml-[-50px]">
              <CiSearch className="text-3xl" />
            </button>
          </div>
          <div className="category mt-3">
            <h4 className="text-xl font-semibold">Category</h4>
            <Select
              className="w-96 mt-2"
              options={categoryOptions}
              isClearable
              placeholder="Select a category"
              onChange={(selectOptions) => setSelectedCategory(selectOptions)}
              value={selectedCategory}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full">
          {filterProducts.map((product) => (
            <div key={product.id}>
              <div className="card card-compact bg-base-100 w-96 shadow-xl">
                <figure>
                  <img className="h-[190px]" src={product.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.productName}</h2>
                  <p>{product.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
