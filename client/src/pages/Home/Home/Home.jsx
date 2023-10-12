import TopCourses from "../AllCourse/TopCourses/TopCourses";
import Banner from "../Banner/Banner";
import LatestBlog from "../LatestBlog/LatestBlog";
import Membership from "../Membership/Membership";
import TopInstructor from "../TopInstructor/TopInstructor";
import WorkOut from "../WorkOut/WorkOut";

const Home = () => {
  return (
    <div>
      <Banner />
      <WorkOut />
      <Membership />
      <TopCourses />
      <TopInstructor />
      <LatestBlog />
    </div>
  );
};

export default Home;
