import {useState} from "react";
import Select from "react-select";
import UseAllProducts from "../hooks/UseAllProducts";

const Category = () => {
  const [allProducts] = UseAllProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(
    new Set(allProducts.map((res) => res.categoryName))
  );

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const filterProducts = selectedCategory
    ? allProducts.filter(
        (product) => product.categoryName === selectedCategory.value
      )
    : allProducts;

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold">Featured Product</h1>
      <div className="flex">
        <div className="w-1/3 pl-6">
          <div className="search">
            <input
              className="p-4 border outline-none rounded-s-md text-slate-900"
              type="text"
              placeholder="search by product name"
            />
            <button className="p-4 border border-l-0">Search</button>
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
