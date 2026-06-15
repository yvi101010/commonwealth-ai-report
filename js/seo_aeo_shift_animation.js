function initAeoSlider() {
  const slider = document.querySelector("#aeo-slider");
  const value = document.querySelector("#aeo-value");
  const readout = document.querySelector("#aeo-readout");
  if (!slider || !value || !readout) return;

  function update() {
    const percent = Number(slider.value);
    value.textContent = `${percent}%`;

    if (percent < 30) {
      readout.textContent =
        "傳統搜尋仍是主要入口，媒體較容易把使用者帶回網站，但仍需要維持 SEO 與品牌信任。";
    } else if (percent < 70) {
      readout.textContent =
        "AI 搜尋正在成為新入口，內容可見度變得重要；但媒體必須同時追蹤點擊、停留與訂閱轉換。";
    } else {
      readout.textContent =
        "答案引擎占比愈高，零點擊風險愈明顯。AEO 能帶來曝光，卻不保證流量與收入會同步增加。";
    }

    document.documentElement.style.setProperty("--aeo-weight", `${percent}%`);
  }

  slider.addEventListener("input", update);
  update();
}

document.addEventListener("DOMContentLoaded", initAeoSlider);
