const User = ({
  user,
  index,
  handleMakeAdmin,
  handleMakeInstructor,
  handleMakeStudent,
}) => {
  const { name, email, role } = user;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className="text-center space-x-4">
        <button
          className="bg-red-600 py-2 px-4 rounded-full text-white"
          onClick={() => handleMakeAdmin(user)}
        >
          Admin
        </button>
        <button
          className="bg-amber-600 py-2 px-4 rounded-full text-white"
          onClick={() => handleMakeInstructor(user)}
        >
          Instructor
        </button>
        <button
          className="bg-green-600 py-2 px-4 rounded-full text-white"
          onClick={() => handleMakeStudent(user)}
        >
          Student
        </button>
      </td>
    </tr>
  );
};

export default User;
