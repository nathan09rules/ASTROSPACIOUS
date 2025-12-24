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

import TextEdit from "./Dev-Stuff/text-edit.tsx";


export default function App() {
  return (
    <BrowserRouter>
      <style>{`
      Route {
height: "100vh" , width: "100vw", background: "black"
      }
    `}</style>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Select" element={<Select />} />
        <Route path="/Galaxy" element={<div style={{ height: "100vh", width: "100vw", background: "black" }}><Galaxy /></div>} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/About" element={<About />} />
        <Route path="/Topic/:subject/:subtopic" element={<Topic />} />

        <Route path="/Write" element={<TextEdit />} />
        <Route path="*" element={<div style={{ height: "100vh", width: "100vw", background: "linear-gradient(to bottom, #000000, #1a1a2e)", padding: "50px" }}><h1 style={{ textAlign: "center" }}>404 Not Found</h1></div>} />
      </Routes>
      <div style={{ zIndex: 1 }}><Footer /></div>
    </BrowserRouter>
  );
}
