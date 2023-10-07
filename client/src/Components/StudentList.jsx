import { useState, useEffect, useContext } from "react";
import MyContext from "../Context/context";

const StudentList = () => {
  const context = useContext(MyContext);
  const { students, handleDeleteStudent, handleSearch } = context;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, handleSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search By Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md mb-4 ml-6"
      />
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="p-2">Student Name</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Phone Number</th>
            <th className="p-2">Email Id</th>
            <th className="p-2">Father Name</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="p-2 flex">
                <img
                  src="https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png"
                  alt="student"
                  className="w-8"
                />{" "}
                {student.name}
              </td>
              <td className="p-2">{student.dob}</td>
              <td className="p-2">{student.phoneNumber}</td>
              <td className="p-2">{student.email}</td>
              <td className="p-2">{student.fatherName}</td>
              <td className="p-2">{student.gender}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
