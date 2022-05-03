import { useAppSelector } from "app/hooks";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCreateroomMutation } from "services/api";

import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Chatting() {
  const [chattings, setchattings]: any = useState([]);
  const [chat, setchat] = useState("");
  const myUserId = useAppSelector(
    (state) => state.persistedReducer.myinfo.user.id
  );
  let location = useLocation();
  const roomdata: any = location.state;
  const [createroom] = useCreateroomMutation();
  console.log(roomdata);

  useEffect(() => {
    socket.emit("join", { room_id: roomdata.room_id });
    const serchchat = async () => {
      const user = await createroom({
        user_id1: myUserId,
        user_id2: roomdata.user_id2,
        post_id: roomdata.post_id,
      }).unwrap();
      setchattings(user.data.chatings);
    };
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
      room_id: roomdata.room_id,
      user_id2: roomdata.user_id2,
    });
    setchat("");
  };

  return (
    <div>
      <h1>{roomdata.title}</h1>
      <div>{roomdata.user_id2}</div>
      <button>{roomdata.island ? "대여중" : "대여중 아님"}</button>

      <div>채팅창</div>
      <div>
        {chattings.map(({ user_id, content }: any, index: any) => {
          return (
            <div key={index}>
              <div>
                {user_id === myUserId ? "나" : "상대"}:<span>{content}</span>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={onMessageSubmit}>
        <div>
          <input
            name="content"
            onChange={(e) => onTextChange(e)}
            value={chat}
          />
        </div>
        <button>Send Message</button>
      </form>
    </div>
  );
}
