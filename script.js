window.addEventListener("load", async () => {
  try {
    // گرفتن متن از کلیپبرد
    const text = await navigator.clipboard.readText();
    console.log("Clipboard:", text);

    // ساخت Body با URLSearchParams
    const bodyContent = new URLSearchParams();
    bodyContent.append("url", text);

    // ارسال مستقیم به پروکسی
    const response = await fetch("/api/proxy", {
      method: "POST",
      body: bodyContent,
    });

    if (!response.ok) throw new Error("API error");

    const result = await response.json();
    document.getElementById("result").textContent = result;
    console.log(result)


  } catch (err) {
    console.error(err);
    document.getElementById("result").textContent = "Error: " + err.message;
  }
});
