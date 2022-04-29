import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./feature/navbar/Navbar";
import Login from "./feature/login/login";
import Mypage from "./feature/mypage/Mypage";
import Signup from "feature/signup/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/Mypage">
          <Mypage />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={1520}
        // 시간
        hideProgressBar
        //시간 작대기 숨기기
        closeOnClick
        //클릭하면 닫기
        draggable
        //끌기 가능
        pauseOnHover
        //마우스 올리면 멈추기
      />
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
