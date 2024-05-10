import { ThemeProvider } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import theme from "./ui/Theme";

function App() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          value={value}
          setValue={setValue}
        />

        <Routes>
          <Route
            path="/"
            element={<div style={{ height: "2000px" }}>Home</div>}
          />
          <Route path="/services" element={<div>services</div>} />
          <Route path="/customSoftware" element={<div>customSoftware</div>} />
          <Route path="/mobileApps" element={<div>mobileApps</div>} />
          <Route path="/websites" element={<div>websites</div>} />
          <Route path="/revolution" element={<div>revolution</div>} />
          <Route path="/about" element={<div>about</div>} />
          <Route path="/contact" element={<div>contact</div>} />
          <Route path="/estimate" element={<div>estimate</div>} />
        </Routes>
        <Footer setSelectedIndex={setSelectedIndex} setValue={setValue} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
