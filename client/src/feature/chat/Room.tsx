import { Route, Switch, Link } from "react-router-dom";
import { useCreateroomMutation, useSearchRoomsQuery } from "services/api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import NoChat from "feature/indicator/NoChat";
import Loading from "feature/indicator/Loading";

export default function Room() {
  const myUserId = useAppSelector(
    (state) => state.persistedReducer.myinfo.user.id
  );

  const { data, isLoading, isSuccess } = useSearchRoomsQuery({
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-left mb-8">채팅 목록</h1>
      <div className="border rounded-lg">
        {!data ? (
          <Loading />
        ) : data.data.length !== 0 ? (
          data.data.map((room: any) => {
            return (
              <div key={room.id} className="">
                <Link
                  to={{
                    pathname: "/chatting",
                    state: {
                      user_id2: room.user_id,
                      post_id: room.post_id,
                      title: room.title,
                      islend: room.islend,
                      nickname: room.nickname,
                      photo: room.user_photo,
                      owner: room.owner,
                    },
                  }}
                >
                  <div
                    key={room.room_id}
                    className="flex border-b rounded-lg py-4 px-4 "
                  >
                    <div>
                      {room.user_photo !== "empty" ? (
                        <img
                          src={`${process.env.REACT_APP_SERVER_URL}${room.user_photo}`}
                          alt="user_profile"
                        />
                      ) : (
                        <img
                          src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                          alt="user_profile"
                          className="w-12 h-12 rounded-full"
                        />
                      )}
                    </div>
                    <div className="text-left px-4">
                      <span className="pr-2">{room.nickname}</span>
                      <span className="text-xs text-gray-700">
                        {room.address}
                      </span>
                      <p className="text-gray-900">
                        {room.content.slice(0, 40)}...
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <NoChat />
        )}
      </div>
    </div>
  );
}
