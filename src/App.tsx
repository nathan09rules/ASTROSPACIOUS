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
    <BrowserRouter><div style={{minHeight: "100vh",display: "flex",flexDirection: "column"}}>
        <Nav />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Select" element={<Select />} />
            <Route path="/Galaxy" element={<Galaxy />} />
            <Route path="/Subject" element={<Subject />} />
            <Route path="/About" element={<About />} />
            <Route path="/Topic/:subject/:subtopic" element={<Topic />} />
            <Route path="/Write" element={<TextEdit />} />
            <Route path="*" element={<h1 style={{ textAlign: "center" }}>404</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
