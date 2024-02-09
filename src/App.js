import './App.css';
import Body from './components/body/Body';
import Navbar from './components/navbar/Navbar';
import BlogPage from './components/blogPage/BlogPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Body />} />
        <Route exact path="/body" element={<Body />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes >
    </Router>

  );
}

export default App;
