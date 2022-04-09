import logo from './logo.svg';
import './App.css';

function App() {
  const url = 'http://localhost:8080/api/images'
  return (
    <div className="App">
     hello sarah
      <img src={"https://sarahgracedesignsbucket.s3.amazonaws.com/blueBucketHat.png"} alt="" className="testimg"/>
      <img src={"http://localhost:8080/api/images/blueBucketHat.png"} alt="" className="testimg"/>
  
    </div>
  );
}

export default App;
