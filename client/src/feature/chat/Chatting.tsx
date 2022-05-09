import { useAppSelector } from "app/hooks";
import Loading from "feature/indicator/Loading";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCreateroomMutation } from "services/api";

import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL);

export default function Chatting() {
  const [chattings, setchattings]: any = useState([]);
  const [chat, setchat] = useState("");
  const [roomid, setroomid] = useState(null);
  // const [isMe, setIsMe]:any = useState(true)
  const myUserId = useAppSelector(
    (state) => state.persistedReducer.myinfo.user.id
  );
  let location = useLocation();
  const roomdata: any = location.state;
  const [createroom, { isLoading }] = useCreateroomMutation();
  console.log(isLoading);

  const serchchat = async () => {
    const user = await createroom({
      user_id1: myUserId,
      user_id2: roomdata.user_id2,
      post_id: roomdata.post_id,
    }).unwrap();
    setchattings(user.data.chatings);
    socket.emit("join", { room_id: user.data.room_id });
    setroomid(user.data.room_id);
  };

  useEffect(() => {
    serchchat();
  }, []);
  socket.on("message", ({ user_id, content }) => {
    setchattings([...chattings, { user_id, content }]);
  });

  const onTextChange = (e: any) => {
    setchat(e.target.value);
  };
  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("message", {
      user_id: myUserId,
      content: chat,
      room_id: roomid,
      user_id2: roomdata.user_id2,
    });
    setchat("");
  };

  if (isLoading) return <Loading />;

  return (
    // <div className="max-w-2xl mx-auto px-4 py-10">
    // <h1 className="text-left mb-8">채팅 목록</h1>
    // <div className="border-2 rounded-lg">
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-xl">{roomdata.title}</h1>
      <div className="flex py-4">
        <div className="flex flex-1 text-left">
          <img
            src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
            alt="user_profile"
            className="w-12 h-12 rounded-full mx-4"
          />
          <span className="my-auto">유저 닉네임</span>
          {/* <div>{roomdata.user_id2}</div> */}
        </div>
        <div>
          <button className="bg-yellow-300 text-white text-right px-4 py-2 rounded-lg">
            {roomdata.island ? "대여중" : "대여 시작"}
          </button>
        </div>
      </div>

      <div className="border-2 rounded-lg my-4 py-4">
        <div>
          {chattings.map(({ user_id, content }: any, index: any) => {
            return (
              <div key={index} className="mx-4 my-4 pb-8">
                <div
                  className={user_id === myUserId ? "text-right" : "text-left"}
                >
                  <span className="py-3 px-4 bg-gray-200 rounded-lg">
                    {content}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={onMessageSubmit}
          className="border-2 rounded-lg my-8 mx-4"
        >
          <div>
            <input
              name="content"
              onChange={(e) => onTextChange(e)}
              value={chat}
              maxLength={100}
              className="py-4 w-full"
            />
          </div>
          <div className="text-right py-3">
            <span className="text-sm text-gray-700">{chat.length} / 100</span>
            <button className="bg-gray-300 py-1 px-4 rounded-lg mx-4 ">
              전송
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
