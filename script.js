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
    console.log(result.data)
    console.log(result.data[0].downloadUrl)
    if (result.data[0].downloadUrl) {
      // ایجاد لینک دانلود و trigger
      const a = document.createElement("a");
      a.href = result.data[0].downloadUrl;
      a.download = ""; // خالی بذار خود فایل نام خودش رو بگیره
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log("Downloading file from:", result.data[0].downloadUrl);
    }

  } catch (err) {
    console.error(err);
    document.getElementById("result").textContent = "Error: " + err.message;
  }
});
