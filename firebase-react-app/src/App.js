import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Write from './components/Write';
import Read from './components/Read';
import UpdateRead from "./components/UpdateRead";
import UpdateWrite from "./components/UpdateWrite";
import { ProtectedRoute } from "./components/protectedRoute";

import { Home } from "./pages/Home";
import { Private } from "./pages/Private";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });

    return () => unsubscribe();
  });

  if(isFetching) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/home" element={ <Home user={user}/>} />
          <Route path="/private" element={ <ProtectedRoute user={user}><Private></Private></ProtectedRoute>}></Route>
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