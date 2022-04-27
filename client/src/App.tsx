import './App.css';
import { Route, Switch } from "react-router-dom";
import Navbar from './feature/navbar/Navbar';
import Login from './feature/login/login';
import Mypage from './feature/mypage/Mypage';
function App() {

  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/Mypage'>
          <Mypage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

      // <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
      //   <h1 className="text-9xl font-black text-white text-center">
      //     <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
      //       Lentool
      //     </span>
      //   </h1>
      // </div>