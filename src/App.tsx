// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Extra/Nav.tsx";
import Footer from "./Extra/Footer.tsx";

import Select from "./Select.tsx";
import Topic from "./Topic.tsx";
import Galaxy from "./Extra/Galaxy.tsx";
import Subject from "./Subject.tsx";
import Home from "./Home.tsx";
import About from "./About.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Select" element={<Select />} />
        <Route path="/Galaxy" element={<div style={{height: "100vh" , width: "100vw", background: "black"}}><Galaxy /></div>} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/About" element={<About />} />
        <Route path="/Topic/:subject/:subtopic" element={<Topic />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
