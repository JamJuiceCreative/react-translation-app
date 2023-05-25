import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ImageReader from './components/ImageReader';
import Header from './components/Header';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navbar />
       
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/image" element={<ImageReader />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
