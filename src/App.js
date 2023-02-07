import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateVote from "./pages/CreateVote";
import Home from "./pages/Home";
import TopicsAll from "./pages/TopicsAll";
import TopicsDetails from "./pages/TopicsDetails";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/topics" element={<TopicsAll />}></Route>
          <Route path="/topics/:topicid" element={<TopicsDetails />}></Route>
          <Route path="/createvote" element={<CreateVote />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
