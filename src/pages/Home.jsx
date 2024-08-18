import {useState} from "react";
import Select from "react-select";
import {CiSearch} from "react-icons/ci";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import {useQuery} from "@tanstack/react-query";
import UseProductsCount from "../hooks/UseProductsCount";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Adjust max value as needed

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

  const brands = Array.from(
    new Set(allProducts.map((res) => res.brandName)) // Assuming 'brandName' is the field for brand
  );

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const filterProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.categoryName === selectedCategory.value
      : true;
    const matchesBrand = selectedBrand
      ? product.brandName === selectedBrand.value
      : true;
    const matchesSearchQuery = product.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriceRange =
      product.price >= minPrice && product.price <= maxPrice;
    return (
      matchesCategory && matchesBrand && matchesSearchQuery && matchesPriceRange
    );
  });

  // Sort products based on selected sort order
  const sortProducts = (products) => {
    if (sortOrder === "lowToHigh") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "newest") {
      return products.sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      );
    } else if (sortOrder === "oldest") {
      return products.sort(
        (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
      );
    }
    return products; // Default order if no sort is selected
  };

  // Apply sorting to the filtered products
  const sortedProducts = sortProducts([...filterProducts]);
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-center text-4xl font-semibold mb-2">
          Featured Product
        </h1>
        <div className="sort md:flex items-center gap-3 justify-end pr-6 mb-3 md:border md:py-2 px-6 md:mx-6 ">
          <p className="text-lg">Sort By</p>
          <Select
            className="md:w-96 mt-2"
            options={[
              {value: "lowToHigh", label: "Price: Low to High"},
              {value: "highToLow", label: "Price: High to Low"},
              {value: "newest", label: "Newest First"},
              {value: "oldest", label: "Oldest First"},
            ]}
            isClearable
            placeholder="Select sort order"
            onChange={(selectedOption) => setSortOrder(selectedOption.value)}
          />
        </div>
        <div className="md:flex gap-4">
          <div className="md:w-72 w-full pl-6 md:fixed">
            <div className="search relative">
              <input
                className="p-4 md:w-60 w-full  border outline-none rounded-md text-slate-900"
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
            <div className="category mt-4">
              <h4 className="text-xl font-semibold">Brand</h4>
              <Select
                className="w-60 mt-2"
                options={brandOptions}
                isClearable
                placeholder="Select brand"
                onChange={(selectOptions) => setSelectedBrand(selectOptions)}
                value={selectedBrand}
              />
            </div>
            <div className="price-range mt-4 w-60">
              <h4 className="text-xl font-semibold">Price Range</h4>
              <div className="flex items-center gap-4 mt-2">
                <div>
                  <label>Min: ${minPrice}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000" // Adjust according to your product price range
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="range range-info h-4 "
                  />
                </div>
                <div>
                  <label>Max: ${maxPrice}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000" // Adjust according to your product price range
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="range range-info h-4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-4 gap-4 w-full  md:ml-72">
            {sortedProducts.map((product) => (
              <div key={product.id}>
                <div className="card mb-2 card-compact bg-base-100 md:w-[356px] shadow-xl">
                  <figure>
                    <img
                      className="h-[190px]"
                      src={product.image}
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.productName}</h2>
                    <p className="text-lg">${product.price}</p>
                    <p className="text-lg">Last Update: {product.dateAdded} </p>
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
            className={
              (currentPage === page && "bg-orange-500 btn") || "btn gap-ml-2"
            }
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
