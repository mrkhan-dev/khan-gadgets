import Category from "../components/Category";
import UseAllProducts from "../hooks/UseAllProducts";

const Home = () => {
  const [allProducts] = UseAllProducts();
  console.log(allProducts);

  return (
    <div>
      <Category />
    </div>
  );
};

export default Home;
