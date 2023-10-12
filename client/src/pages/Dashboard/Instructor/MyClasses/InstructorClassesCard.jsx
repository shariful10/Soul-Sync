const InstructorClassesCard = ({ item, index }) => {
  const {
    name,
    image,
    price,
    status,
    enrolled_students,
    admin_feedback,
    available_seats,
  } = item;

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
      <td className="text-center"> {enrolled_students}</td>
      <td className="text-center"> {available_seats}</td>
      <td className="text-center">{admin_feedback}</td>
      <td className="text-right">${price}</td>
      <td className="text-center">{status}</td>
    </tr>
  );
};

export default InstructorClassesCard;
