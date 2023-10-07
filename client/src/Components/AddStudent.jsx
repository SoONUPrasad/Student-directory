import { useContext, useState } from "react";
import Modal from "react-modal";
import MyContext from "../Context/context";
import Navbar from "./Navbar";

const customModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
  },
};

Modal.setAppElement("#root"); //! Set the root element for the modal

const AddStudentModal = () => {
  const context = useContext(MyContext);
  const { isModalOpen, closeModal, handleAddStudent } = context;

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const isValidEmail = (email) => {
    //! Regular expression for a valid email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    //! Validate the form data (add your validation logic here)
    if (
      !formData.name ||
      !formData.dob ||
      !formData.gender ||
      !formData.fatherName ||
      !formData.motherName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.address
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    const age = calculateAge(formData.dob);
    if (age < 3) {
      alert("Age must be greater than 3 years.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    //! Generate a unique ID for the student
    const id = Date.now().toString();

    //! Call the onAdd function to add the student
    handleAddStudent({ id, ...formData });

    //! Clear the form
    setFormData({
      name: "",
      dob: "",
      gender: "",
      fatherName: "",
      motherName: "",
      email: "",
      phoneNumber: "",
      address: "",
    });

    // Close the modal
    closeModal();
  };

  return (
    <>
      <Navbar />
      <Modal
        // isOpen={isModalOpen}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyle}
      >
        <h2 className="text-xl font-semibold mb-4">Add Student</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Student Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Father Name:
          </label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Mother Name:
          </label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Id:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Date Of Birth:
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Address:
          </label>
          <textarea
            type="text"
            rows={4}
            cols={50}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </Modal>
    </>
  );
};

export default AddStudentModal;
