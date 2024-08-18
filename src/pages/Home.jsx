import {useState} from "react";
import Select from "react-select";
import {CiSearch} from "react-icons/ci";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import {useQuery} from "@tanstack/react-query";
import UseProductsCount from "../hooks/UseProductsCount";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  // pagination
  const [productsCount] = UseProductsCount();
  const {count} = productsCount;
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 12;
  const numberOfPage = Math.ceil(count / itemPerPage);
  console.log(numberOfPage);

  const pages = [];
  for (let i = 0; i < numberOfPage; i++) {
    pages.push(i);
  }
  console.log(pages);

  const handlePrevBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const axiosPublic = UseAxiosPublic();
  const {data: allProducts = []} = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allProducts?page=${currentPage}&size=${itemPerPage}`
      );
      return res.data;
    },
  });

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

  // Sort products based on selected sort order
  const sortProducts = (products) => {
    if (sortOrder === "lowToHigh") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      return products.sort((a, b) => b.price - a.price);
    }
    return products; // Default order if no sort is selected
  };

  // Apply sorting to the filtered products
  const sortedProducts = sortProducts([...filterProducts]);
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-center text-4xl font-semibold">Featured Product</h1>
        <div className="sort flex items-center gap-3 justify-end pr-6 mb-3">
          <p className="text-lg">Sort By</p>
          <Select
            className="w-96 mt-2"
            options={[
              {value: "lowToHigh", label: "Price: Low to High"},
              {value: "highToLow", label: "Price: High to Low"},
            ]}
            placeholder="Select sort order"
            onChange={(selectedOption) => setSortOrder(selectedOption.value)}
            isClearable
          />
        </div>
        <div className="flex gap-4">
          <div className="w-72 pl-6 fixed">
            <div className="search relative">
              <input
                className="p-4 w-60 border outline-none rounded-md text-slate-900"
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
                className="w-60 mt-2"
                options={categoryOptions}
                isClearable
                placeholder="Select a category"
                onChange={(selectOptions) => setSelectedCategory(selectOptions)}
                value={selectedCategory}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full  ml-72">
            {sortedProducts.map((product) => (
              <div key={product.id}>
                <div className="card card-compact bg-base-100 w-[356px] shadow-xl">
                  <figure>
                    <img
                      className="h-[190px]"
                      src={product.image}
                      alt="Shoes"
                    />
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
      <div className=" pagination gap-2 flex justify-center mt-4 mb-4">
        <button onClick={handlePrevBtn} className="btn">
          Prev
        </button>
        {pages.map((page) => (
          <button
            className={(currentPage === page && "bg-orange-500 btn") || "btn"}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextBtn} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
