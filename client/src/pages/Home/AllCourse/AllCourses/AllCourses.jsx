import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader";
import ClassCard from "../ClassCard/ClassCard";
import Container from "../../../../components/Container";
import { Helmet } from "react-helmet-async";

const AllCourses = () => {
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/all-classes");
      return res.json();
    },
  });

  return (
    <div className="bg-[#1D0E15] dark:bg-white dark:text-black py-16">
      <Helmet>
        <title>Soul Sync | All Classes</title>
      </Helmet>
      <Container>
        <div className="text-center py-16">
          <p className="uppercase text-orange-600 dark:text-black font-medium">
            Our Courses
          </p>
          <h2 className="text-4xl font-bold text-white dark:text-black capitalize">
            Checkout Our Courses
          </h2>
        </div>
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes
            .filter((course) => course.status === "Approved")
            .map((course) => (
              <ClassCard key={course._id} course={course} />
            ))}
        </div>
      </Container>
    </div>
  );
};

export default AllCourses;
