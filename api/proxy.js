export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    // CORS preflight
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  try {
    // گرفتن متن کلیپبرد از body
    const clipboardText = req.body.url; // فرض می‌کنیم فرانت URLSearchParams یا JSON می‌فرسته
    console.log("Clipboard text received:", clipboardText);

    // ارسال POST به سرور مقصد با همان متن کلیپبرد
    const response = await fetch("https://snapins.ai/action.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ url: clipboardText }) // ارسال به صورت فرم
    });

    const data = await response.json();
    console.log(data)
    console.log("Response from snapins.ai:", data);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
