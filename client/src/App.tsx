import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from './feature/navbar/Navbar';
import Login from './feature/login/login';
import Mypage from './feature/mypage/Mypage';
import Posting from 'feature/post/posting';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setCredentials } from 'feature/login/authSlice';
import Signup from "feature/signup/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch()
  // let user = useAppSelector(state => state.auth)
  // console.log(user)
//   const d =
//   {
//     "message": "ok",
//     "data": {
//         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBuYXZlci5jb20iLCJuaWNrbmFtZSI6InRlc3QxIiwidXNlcl9hZGRyZXNzIjoi7J247LKc6rSR7Jet7IucIiwidXNlcl9waG90byI6ImR1bW15ZGF0YSIsInNhbHQiOiIxMzg0NTA3ODUyNDAwIiwibGF0aXR1ZGUiOiIzNy41Mjc3MjQxMjkzMTkxOTYiLCJsb25naXR1ZGUiOiIxMjYuNjMxMzczMTA2NTY2NjgiLCJjcmVhdGVkQXQiOiIyMDIyLTA0LTI4VDEzOjEwOjQwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA0LTI4VDEzOjEwOjQwLjAwMFoiLCJpYXQiOjE2NTExNzQwMjgsImV4cCI6MTY1MTI2MDQyOH0.XfME7k4S4Fk1H0k8GrjQTU8cslyanbGXImaAOaVqNK0",
//         "userInfo": {
//             "id": 1,
//             "email": "test1@naver.com",
//             "nickname": "test1",
//             "user_address": "인천광역시",
//             "user_photo": "dummydata",
//             "salt": "1384507852400",
//             "latitude": "37.527724129319196",
//             "longitude": "126.63137310656668",
//             "createdAt": "2022-04-28T13:10:40.000Z",
//             "updatedAt": "2022-04-28T13:10:40.000Z"
//         }
//     }
// }
//   useEffect(() => {
//     console.log('effective')
//     if (!d) return
     
//     dispatch(setCredentials(d))
//   }, [])


  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path='/mypage'>
          <Mypage />
        </Route>
        <Route exact path='/posting'>
          <Posting />
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

