import Container from "../../../components/Container";
import BlogCard from "./BlogCard";

const LatestBlog = () => {
  return (
    <div className="bg-[#1D0E15] dark:bg-white dark:text-black py-16">
      <Container>
        <div className="text-center py-16">
          <p className="uppercase text-orange-600 dark:text-black font-medium">
            news update
          </p>
          <h2 className="text-4xl font-bold text-white dark:text-black capitalize">
            Latest News & Blog
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard
            image={
              "https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2019/11/gymblog_4-400x252.jpg"
            }
          />
          <BlogCard
            image={
              "https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2020/11/gym_5-400x252.jpg"
            }
          />
          <BlogCard
            image={
              "https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2019/11/gymblog_2-400x252.jpg"
            }
          />
        </div>
      </Container>
    </div>
  );
};

export default LatestBlog;
