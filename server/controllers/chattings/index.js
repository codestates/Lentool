const {
  room: roomModel,
  user_room: user_roomModel,
  post: postModel,
  chat: chatModel,
  user: userModel,
} = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = {
  rooms: async (req, res) => {
    const userInfo = isAuthorized(req);

    try {
      if (!userInfo) {
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const dataInfo = await user_roomModel.findAll({
        where: { user_id1: userInfo.id },
        attributes: ["user_id2"],
        include: [
          {
            model: userModel,
            attributes: ["user_photo", "nickname"],
          },
          {
            model: roomModel,
            attributes: ["id"],
            include: [
              {
                model: chatModel,
                attributes: ["content"],
                limit: 1,
                order: [["createdAt", "DESC"]],
              },
              {
                model: postModel,
                attributes: ["address", "id", "title", "islend"],
              },
            ],
          },
        ],
      });
      const update = await userModel.update(
        { newchat: false },
        { where: { id: userInfo.id } }
      );
      const roomdata = [];
      for (let i = 0; i < dataInfo.length; i++) {
        const data = {
          user_id: dataInfo[i].dataValues.user_id2,
          user_photo: dataInfo[i].dataValues.user.user_photo,
          address: dataInfo[i].dataValues.room.post.address,
          room_id: dataInfo[i].dataValues.room.id,
          content: dataInfo[i].dataValues.room.chats[0]
            ? dataInfo[i].dataValues.room.chats[0].dataValues.content
            : "",
          post_id: dataInfo[i].dataValues.room.post.id,
          title: dataInfo[i].dataValues.room.post.title,
          islend: dataInfo[i].dataValues.room.post.islend,
          nickname: dataInfo[i].dataValues.user.nickname,
        };
        roomdata.push(data);
      }
      return res.status(200).json({ data: roomdata, message: "ok" });
    } catch (err) {
      console.log(err);
      console.log("채팅 오류");
      return res.status(500).json({ data: null, message: "채팅오류" });
    }
  },
  createroom: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        return res.status(400).json({
          data: null,
          message: "invalid access token",
        });
      }
      const { user_id1, user_id2, post_id } = req.body;
      if (!user_id1 || !user_id2 || !post_id) {
        return res.status(400).json({
          data: null,
          message: "요청사항 누락",
        });
      }
      const room = await roomModel.findOne({
        where: { post_id },
        attributes: ["id"],
        include: [
          {
            model: user_roomModel,
            where: { user_id1, user_id2 },
          },
        ],
      });

      const postInfo = await postModel.findOne({
        where: { id: post_id },
        attributes: ["title"],
      });

      if (room) {
        const chatingInfo = await chatModel.findAll({
          where: { room_id: room.dataValues.id },
          attributes: ["user_id", "room_id", "content", "createdAt"],
        });
        const chatings = [];
        for (let i = 0; i < chatingInfo.length; i++) {
          chatings.push(chatingInfo[i].dataValues);
        }

        return res.status(200).json({
          data: {
            title: postInfo.dataValues.title,
            chatings,
            room_id: room.dataValues.id,
          },
          message: "ok",
        });
      } else if (!room) {
        const createdroom = await roomModel.create({
          flag: true,
          post_id,
        });
        const createduser_room1 = await user_roomModel.create({
          user_id1,
          user_id2,
          room_id: createdroom.dataValues.id,
        });
        const createduser_room2 = await user_roomModel.create({
          user_id1: user_id2,
          user_id2: user_id1,
          room_id: createdroom.dataValues.id,
        });

        return res.status(200).json({
          data: {
            title: postInfo.dataValues.title,
            room_id: createdroom.dataValues.id,
            chatings: [],
          },
          message: "ok",
        });
      }
    } catch (err) {
      console.log(err);
      console.log("채팅 오류");
      return res.status(500).json({ data: null, message: "채팅오류" });
    }
  },
};
