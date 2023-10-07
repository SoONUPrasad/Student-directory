import StudentList from "./Components/StudentList";
import AddStudentModal from "./Components/AddStudent";
import MyState from "./Context/MyState";

function App() {
  return (
    <MyState>
      <AddStudentModal />
      <StudentList />
    </MyState>
  );
}

export default App;
