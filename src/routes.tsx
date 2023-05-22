import Home from 'pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutMovie from 'components/AboutMovie';

function App() {
  return (
    <main className="container">
      <Header />
      {/* <Home /> */}
      <AboutMovie />
    </main>
  );
}

export default App;
