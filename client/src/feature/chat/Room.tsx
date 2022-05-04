import { Route, Switch, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateroomMutation } from "services/api";
import { useAppDispatch, useAppSelector } from "app/hooks";

export default function Room() {
  const dispatch = useAppDispatch()

  const myUserId = useAppSelector(
    (state) => state.persistedReducer.myinfo.user.id
  );
  const data = useAppSelector((state) => state.persistedReducer.rooms);

  return (
    <div>
      <h1>채팅 목록</h1>
      {data.rooms &&
        data.rooms.map((room: any) => {
          return (
            <Link
              to={{
                pathname: "/chatting",
                state: {
                  user_id2: room.user_id,
                  post_id: room.post_id,
                  title: room.title,
                  islend: room.islend,
                },
              }}
            >
              <div key={room.room_id} className="border-2">
                <div>{room.content}</div>
                <div>{room.address}</div>
                <img src={`http://localhost:4000${room.user_photo}`} />
              </div>
            </Link>
          );
        })}
    </div>
  );
}
