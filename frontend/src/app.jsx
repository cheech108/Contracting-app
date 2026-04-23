import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Dash from "./dash"
import Signup from "./signup";
import Form from "./form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form/:jobId" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;