import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Write from './components/Write';
import Read from './components/Read';
import UpdateRead from "./components/UpdateRead";
import UpdateWrite from "./components/UpdateWrite";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/home" element={ <Home />} />
          <Route path="/" element={ <Write />} />
          <Route path="/write" element={ <Write />} />
          <Route path="/read" element={ <Read />} />
          <Route path="/updateread" element={ <UpdateRead />} />
          <Route path="/updatewrite/:firebaseId" element={ <UpdateWrite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;