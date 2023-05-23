import Home from 'pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutMovie from 'components/AboutMovie';
import RequestsAxios from 'components/RequisicaoAxios';

function App() {
  return (
    <main className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/:id" element={<AboutMovie />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
