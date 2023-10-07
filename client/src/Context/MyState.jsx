import { useState } from "react";
import MyContext from "./context";
// eslint-disable-next-line react/prop-types
const MyState = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    setStudents(updatedStudents);
  };

  const handleSearch = (searchTerm) => {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStudents(filteredStudents);
  };
  return (
    <>
      <MyContext.Provider
        value={{
          students,
          isModalOpen,
          openModal,
          closeModal,
          handleAddStudent,
          handleDeleteStudent,
          handleSearch,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
};

export default MyState;
