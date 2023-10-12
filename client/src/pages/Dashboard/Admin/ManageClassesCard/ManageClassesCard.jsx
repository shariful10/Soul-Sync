import { BsCheck2Square } from "react-icons/bs";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

const ManageClassesCard = ({ item, index, handleStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const {
    _id,
    name,
    image,
    price,
    status,
    instructor,
    instructor_email,
    available_seats,
  } = item;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  const handleFeedbackSubmission = () => {
    // Send feedback to the server and update the class
    axios
      .put(`/classes/${_id}`, { admin_feedback: feedback })
      .then((response) => {
        // Handle the successful response
        console.log("Class updated:", response.data);

        // Close the modal
        closeModal();
      })
      .catch((error) => {
        // Handle the error
        console.error("Error updating class:", error);
      });
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={image} alt={name} />
              </div>
            </div>
          </div>
        </td>
        <td>
          <div>
            <h4 className="font-bold">{name}</h4>
          </div>
        </td>
        <td> {instructor}</td>
        <td>{instructor_email}</td>
        <td className="text-center"> {available_seats}</td>
        <td className="text-right">${price}</td>
        <td className="text-right">
          <p
            className={`${
              status === "Approved"
                ? "text-green-700"
                : status === "Denied" && "text-red-600"
            } font-bold mx-auto`}
          >
            {status}
          </p>
        </td>
        <td className="text-center flex items-center gap-5 font-semibold">
          {/* Approve button */}
          <button
            className="w-full p-3 rounded-full bg-green-700 text-white"
            onClick={() => handleStatus("Approved", _id)}
          >
            <BsCheck2Square size={25} />
          </button>
          {/* Deny Button */}
          <button
            className="w-full p-3 rounded-full bg-red-700 text-white"
            // onClick={() => handleStatus("Denied", _id)}
            onClick={openModal}
          >
            <AiOutlineCloseSquare size={25} />
          </button>
        </td>
      </tr>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 md:w-[500px] shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Provide Feedback
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter feedback here..."
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleFeedbackSubmission}
                className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageClassesCard;
