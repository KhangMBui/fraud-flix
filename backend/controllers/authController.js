exports.getCurrentUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({ username: req.user.username, email: req.user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
