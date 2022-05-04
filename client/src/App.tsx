import "./App.css";
import { Route, Switch, useParams } from "react-router-dom";
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
import { setLogin } from "feature/login/loginSlice";
import PostLogin from "feature/post/PostLogin";
import Main from "feature/home/Main";
import { getPosts } from "feature/post/postSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import Room from "feature/chat/Room";
import Chatting from "feature/chat/Chatting";
import Post from "feature/post/Post";
import { usePostsMutation } from "services/api";
import Carousel from "feature/post/carousel";

function App() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(state => state.persistedReducer.login.isLogin)
  // const allData = useAppSelector(state => state.persistedReducer)

  // console.log(isLogin)


  useEffect(() => {

    const a:any = localStorage.getItem('user')
    const b:any = localStorage.getItem('posts')
    const c:any = localStorage.getItem('persist:root')
    // console.log(JSON.parse(c))
    if (a) {
      dispatch(setCredentials(JSON.parse(a)))
      dispatch(setLogin(true))
    }
    if (b) {
      dispatch(getPosts(JSON.parse(b)))
    }
    // if (c) {
    //   dispatch(getMyinfo(JSON.parse(c)))
    // }
  }, [])


  return (
    <div className="App">
        <Navbar />
      <Switch>
        <Route exact path='/'>
          { !isLogin ? <Main /> : <PostLogin /> }
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path='/mypage'>
          <Mypage />
        </Route>
        <Route path='/posting'>
          <Posting />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/room">
          <Room />
        </Route>
        <Route path="/chatting">
          <Chatting />
        </Route>
        <Route path="/post/:post_id">
          <Post />
        </Route>
        <Route path="/carousel">
          <Carousel />
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
