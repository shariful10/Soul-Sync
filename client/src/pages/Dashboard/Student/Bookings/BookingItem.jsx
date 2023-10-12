import { IoMdRemoveCircle } from "react-icons/io";

const BookingItem = ({ item, index, handleDelete }) => {
  const { name, image, price } = item;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={name} />
            </div>
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
          </div>
        </div>
      </td>
      <td className="text-right">${price}</td>
      <td className="text-center">
        <button
          className="text-3xl text-red-600"
          onClick={() => handleDelete(item)}
        >
          {" "}
          <IoMdRemoveCircle />{" "}
        </button>
      </td>
    </tr>
  );
};

export default BookingItem;
