module.exports = {
  tools: (req, res) => {
    console.log(req.files);
    return res.status(200).json({ data: req.files[0].filename, messege: "ok" });
  },
};
