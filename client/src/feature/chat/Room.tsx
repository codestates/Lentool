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
  // console.log(data)
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-left mb-8">채팅 목록</h1>
      <div className="border-2 rounded-lg">

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
              <div key={room.room_id} className="flex border-b-2 py-4 px-4 last:border-b">
                <div>
                  {
                    !room.user_photo ? <img src={`http://localhost:80${room.user_photo}`} alt='user_profile' />
                    : <img src='https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png' alt='user_profile' className='w-12 h-12 rounded-full'/>
                  }
                </div>
                <div className='text-left px-4'>
                  <span className='pr-2'>유저명</span>
                  <span className='text-sm text-gray-700'>{room.address}</span>
                  <p className=''>{room.content}</p>
                </div> 
              </div>
            </Link>
          );
        })}
        </div>
    </div>
  );
}
