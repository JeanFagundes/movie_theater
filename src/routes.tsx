import Home from 'pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutMovie from 'components/AboutMovie';
import { RequisicaoProvider } from 'context/RequisicaoAxios';
import Login from 'pages/Login';
import { AuthProvider } from 'context/AuthContext';

function App() {
  return (
    <RequisicaoProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/:id" element={<AboutMovie />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </RequisicaoProvider>
  );
}

export default App;
