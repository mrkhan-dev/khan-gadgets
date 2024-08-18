import {useState} from "react";
import UseProductsCount from "../hooks/UseProductsCount";

const Pagination = () => {
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

  return (
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
  );
};

export default Pagination;
