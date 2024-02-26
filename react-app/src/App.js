//import './styles/css/main.css';
import Aside from './components/aside';
// import NavBar from './components/NavBar';
// // // import Content from './components/content';
// import Footer from './components/Footer';
import chinguLogo from './images/chingo-logo.png';
function App() {
  return (
    <div className="App">
      <Aside />
      {/* <NavBar /> */}
      <h1>Testing 1234</h1>
      <img src={chinguLogo} alt="Chingu Logo" />
       {/* <Content /> */}
     {/* <Footer /> */}
    </div>
  );
}

export default App;