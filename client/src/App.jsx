import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import ContactPage from "./contact.jsx";
import AboutPage from "./About.jsx";
import './Home.css'
import './contact1.css'
import  './About1.css'
import PhotoStudioPackages from "./packages.jsx";
import './packages2.css'
import Client from "./client.jsx";
import './client.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<PhotoStudioPackages />} />
      <Route path="/Gallery" element={<Client/>} />
    </Routes>
  );
}

export default App;
