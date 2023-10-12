import { useQuery } from "@tanstack/react-query";
import Container from "../../../../components/Container";
import ClassCard from "../ClassCard/ClassCard";
import Loader from "../../../../components/Loader";

const TopCourses = () => {
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/all-classes");
      return res.json();
    },
  });
  // console.log(classes);

  const sortedClasses = classes.sort(
    (a, b) => b.enrolled_students - a.enrolled_students
  );

  const topClasses = sortedClasses.slice(0, 6);

  return (
    <div className="bg-[#1D0E15] dark:bg-white dark:text-black py-16">
      <Container>
        <div className="text-center py-16">
          <p className="uppercase text-orange-600 dark:text-black font-medium">
            Popular Class
          </p>
          <h2 className="text-4xl font-bold text-white dark:text-black capitalize">
            Our Top Enrolled Classes
          </h2>
        </div>
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topClasses.map((course) => (
            <ClassCard key={course._id} course={course} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TopCourses;
