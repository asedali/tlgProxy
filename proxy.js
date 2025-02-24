module.exports = async (req, res) => {
  try {
    const response = await fetch('https://api.telegram.org' + req.url);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error connecting to Telegram API", details: error.message });
  }
};
