import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  return (
    <div>
      <div><Navbar /></div>
      <div>
        <Todo text="learn react"/>
        <Todo text="master react"/>
        <Todo text="take a shit"/>
      </div>
    </div>

  );
}

export default App;