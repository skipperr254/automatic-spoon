import Banner from "../components/home/Banner";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import ProductSlider from "../components/home/ProductSlider";
import BrandSection from "../components/home/BrandSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Banner />
      <CategorySection />
      <FeaturedProducts />
      <ProductSlider />
      <BrandSection />
      <Footer />
    </div>
  );
};

export default Home;
