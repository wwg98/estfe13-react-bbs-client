import BoardList from "./components/BoardList";
import Write from "./components/Write";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>React BBS</h1>
      <BoardList />
      <hr />
      <Write />
    </div>
  );
}

export default App;
