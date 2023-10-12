import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const InstructorCard = ({ instructor }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg group">
      <img
        src={instructor.photo}
        alt={instructor.name}
        className="w-full h-[480px] object-cover object-top"
      />
      {/* info DIV */}
      <div className="absolute m-auto w-[300px] h-[350px] rounded-xl inset-0 p-10 text-center flex flex-col items-center justify-end bg-orange-700 text-white transition-all duration-700 md:opacity-0 bottom-0 group-hover:bottom-10 md:group-hover:opacity-100 group-hover:translate-y-0">
        <div className="space-y-5 ">
          <h3 className="text-2xl font-semibold">{instructor.name}</h3>
          <p className="text-lg">{instructor.email}</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
