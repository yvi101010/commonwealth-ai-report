const layers = [
  {
    title: "價值創造：已明顯改變",
    body: "AI Hub 改變資料整理、採訪彙整、內容優化、標題生成與 AEO 建議，讓內容供給流程更接近可擴張的協作系統。"
  },
  {
    title: "價值交付：已開始改變",
    body: "SEO／AEO 與 AI 搜尋入口被放進採編流程，媒體競爭不再只看 Google 搜尋排名，也要看答案引擎能否辨識與引用內容。"
  },
  {
    title: "價值擷取：尚未證明重組",
    body: "現有資料不足以證明 AI Hub 已改寫主要收入結構。廣告、訂閱、會員、課程與活動仍需要分開檢驗。"
  }
];

function initBusinessLayers() {
  const buttons = document.querySelector("#business-layer-buttons");
  const detail = document.querySelector("#business-layer-detail");
  if (!buttons || !detail) return;

  function update(index) {
    [...buttons.children].forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    detail.innerHTML = `<strong>${layers[index].title}</strong>${layers[index].body}`;
  }

  layers.forEach((layer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = layer.title;
    button.addEventListener("click", () => update(index));
    buttons.appendChild(button);
  });

  update(0);
}

document.addEventListener("DOMContentLoaded", initBusinessLayers);
