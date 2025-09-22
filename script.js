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

    const resultText = await response.text();
    document.getElementById("result").textContent = resultText;
    console.log(resultText);

    // فرض می‌کنیم سرور JSON برمی‌گردونه با فیلد downloadUrl
    const result = JSON.parse(resultText);

    if (result.downloadUrl) {
      // ایجاد لینک دانلود و trigger
      const a = document.createElement("a");
      a.href = result.downloadUrl;
      a.download = ""; // خالی بذار خود فایل نام خودش رو بگیره
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log("Downloading file from:", result.downloadUrl);
    }

  } catch (err) {
    console.error(err);
    document.getElementById("result").textContent = "Error: " + err.message;
  }
});
