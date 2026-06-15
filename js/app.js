const mythCopy = {
  writer:
    "這是最常見的誤解。AI Hub 可以協助整理資料、檢查結構與優化標題，但訪談與公開原則都指出，採訪、查證、判斷與發布責任仍由人負責。",
  efficiency:
    "這個說法有一半正確。AI Hub 的確提升前處理效率，但它不只是省時間的工具，也把採編流程拆成可以治理、可以協作的節點。",
  platform:
    "這是本頁採用的核心定位。AI Hub 更像智慧採編協作平台，把資料整理、議題發想、論點檢查、SEO／AEO 建議放進新聞工作流。",
  revenue:
    "目前證據不足。AI Hub 已影響內容供給效率與 AEO 可見度，但還不能證明它已成為新的主要收入來源。"
};

const governanceCopy = {
  official:
    "官方模板適合建立格式、資料邊界與可管理的流程，但不會自動取代每位記者原本的工作習慣。",
  personal:
    "個人工具的優勢是彈性、熟悉度與觀點刺激；風險則是資料邊界、責任歸屬與一致性比較難管理。",
  review:
    "人工審核是 AI 流程的最後閘門。AI 可以協助，但發布前仍需要查證、編輯、判斷與責任歸屬。"
};

const fallbackQuiz = [
  {
    question: "AI Hub 對《天下》最明確的影響是什麼？",
    options: ["立刻取代記者", "加速前處理與中介工序", "直接改寫主要收入來源"],
    answer: 1,
    explain: "目前最有證據的是工作流程改變，特別是資料整理、逐字稿處理、題目發想與結構檢查。"
  },
  {
    question: "公司官方 AI 與個人 AI 並存，最適合怎麼解讀？",
    options: ["官方工具完全失敗", "組織仍在治理與工作習慣之間調整", "員工應完全禁止使用個人工具"],
    answer: 1,
    explain: "這是過渡期現象：公司需要標準化，知識工作者也需要彈性與熟悉的工作手感。"
  },
  {
    question: "AEO 可見度提高，為什麼不能直接等於商業成功？",
    options: ["因為 AEO 與搜尋無關", "因為被引用不一定帶來點擊與收入", "因為 SEO 已經完全消失"],
    answer: 1,
    explain: "AI 答案引擎可能引用媒體內容，但使用者未必回到原站，因此曝光、點擊與收入必須分開檢驗。"
  },
  {
    question: "最審慎的商業模式結論是什麼？",
    options: ["AI Hub 已成熟為新的主要營收產品", "AI Hub 已改變底層運作邏輯，但尚未證明收入結構重組", "AI Hub 對商業模式完全沒有影響"],
    answer: 1,
    explain: "價值創造與價值交付已有變化；價值擷取端還沒有足夠證據證明主要收入結構被重寫。"
  }
];

function updateProgress() {
  const bar = document.querySelector(".scroll-progress span");
  if (!bar) return;

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max <= 0 ? 0 : (window.scrollY / max) * 100;
  bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

function initNavObserver() {
  const links = [...document.querySelectorAll(".section-nav a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
}

function initMythCards() {
  const feedback = document.querySelector("#myth-feedback");
  const cards = [...document.querySelectorAll(".myth-card")];
  if (!feedback || !cards.length) return;

  cards.forEach((button) => {
    button.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      feedback.textContent = mythCopy[button.dataset.myth] || "";
    });
  });
}

function initGovernanceTabs() {
  const feedback = document.querySelector("#governance-feedback");
  const tabs = [...document.querySelectorAll("[data-governance]")];
  if (!feedback || !tabs.length) return;

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.setAttribute("aria-selected", String(item === button));
      });
      feedback.textContent = governanceCopy[button.dataset.governance] || "";
    });
  });
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Cannot load ${path}`);
    return await response.json();
  } catch (_error) {
    return fallback;
  }
}

function renderQuiz(items) {
  const root = document.querySelector("#quiz-root");
  const score = document.querySelector("#quiz-score");
  if (!root || !score) return;

  const state = new Map();
  root.innerHTML = "";

  items.forEach((item, index) => {
    const wrap = document.createElement("div");
    wrap.className = "quiz-question";

    const question = document.createElement("p");
    question.textContent = `${index + 1}. ${item.question}`;
    wrap.appendChild(question);

    const options = document.createElement("div");
    options.className = "quiz-options";

    item.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;
      button.addEventListener("click", () => {
        state.set(index, optionIndex);

        [...options.children].forEach((child, childIndex) => {
          child.classList.toggle("selected", childIndex === optionIndex);
          child.classList.toggle("correct", childIndex === item.answer);
          child.classList.toggle("wrong", childIndex === optionIndex && optionIndex !== item.answer);
        });

        const correct = [...state.entries()].filter(
          ([questionIndex, answer]) => items[questionIndex].answer === answer
        ).length;
        score.textContent = `目前答對 ${correct} / ${items.length} 題。${item.explain}`;
      });
      options.appendChild(button);
    });

    wrap.appendChild(options);
    root.appendChild(wrap);
  });
}

async function initQuiz() {
  const items = await loadJson("data/ai_hub_quiz_items.json", fallbackQuiz);
  renderQuiz(items);
}

document.addEventListener("DOMContentLoaded", () => {
  updateProgress();
  initNavObserver();
  initMythCards();
  initGovernanceTabs();
  initQuiz();
  window.addEventListener("scroll", updateProgress, { passive: true });
});
