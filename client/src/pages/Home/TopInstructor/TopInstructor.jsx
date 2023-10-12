import { useQuery } from "@tanstack/react-query";
import InstructorCard from "./InstructorCard";
import Loader from "../../../components/Loader";
import Container from "../../../components/Container";

const TopInstructor = () => {
  const { data: instructors = [], isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/instructor");
      return res.json();
    },
  });
  // console.log(classes);

  return (
    <div className="bg-[#1D0E15] dark:bg-white dark:text-black py-16">
      <Container>
        <div className="text-center py-16">
          <p className="uppercase text-orange-600 dark:text-black font-medium">
            Popular Instructors
          </p>
          <h2 className="text-4xl font-bold text-white dark:text-black capitalize">
            Our Top Recommended Instructors
          </h2>
        </div>
        {isLoading && <Loader />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors
            .filter((instructor) => instructor.role === "Instructor")
            .map((instructor) => (
              <InstructorCard key={instructor._id} instructor={instructor} />
            ))}
        </div>
      </Container>
    </div>
  );
};

export default TopInstructor;
