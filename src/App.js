import {Route, Routes} from 'react-router-dom';
import './font.css';
import './global.css';
import About from './pages/About';
import Home from './pages/Home';
import Game from './pages/Game';
import NotFound from "./pages/NotFound";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
