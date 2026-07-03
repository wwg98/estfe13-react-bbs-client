import BoardList from "./components/BoardList";
import Write from "./components/Write";
import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>React BBS</h1>
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/write" element={<Write />} />
        {/* <Route path="/view/:id" element={<View />} /> */}
      </Routes>
    </div>
  );
}

export default App;
