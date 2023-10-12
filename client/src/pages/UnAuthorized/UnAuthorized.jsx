import { Link } from "react-router-dom";
import useStudent from "../../hooks/useStudent";

const UnAuthorized = () => {
  const [error] = useStudent();
  console.log(error);
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-blue-600 text-9xl">401</h1>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Whoa!</span> Unauthorized Access
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                You don`t have access to the pag you are looking for.
              </p>
              <Link
                to="/"
                className="px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
