import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar.js';
import MovieList from './components/MovieList.js';


function App() {
  sessionStorage.setItem("search", "");
  return (
    <div>
      <NavigationBar/>
      <MovieList />
    </div>
  );
}

export default App;
