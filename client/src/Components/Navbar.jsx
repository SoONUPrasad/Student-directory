import { useContext } from "react";
import MyContext from "../Context/context";

const Navbar = () => {
  const context = useContext(MyContext);
  const { openModal } = context;
  return (
    <div className="App flex justify-between py-4 px-10">
      <h1 className="text-2xl font-semibold mb-4">Student Directories</h1>
      <button
        onClick={openModal}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4"
      >
        + Add Student
      </button>
    </div>
  );
};

export default Navbar;
