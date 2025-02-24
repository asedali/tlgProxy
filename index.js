// Simple proxy to forward requests from myapi.com to api.telegram.org
module.exports = async (req, res) => {
  const targetUrl = `https://api.telegram.org${req.url}`

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ error: "An error occurred while proxying the request" })
  }
}

