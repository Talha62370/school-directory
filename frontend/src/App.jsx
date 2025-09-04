import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSchool from "./pages/Addschool";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/addschool" element={<AddSchool />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
