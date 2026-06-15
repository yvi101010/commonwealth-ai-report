const fallbackAgents = [
  {
    step: "資料蒐集",
    agent: "採訪全紀鹿",
    role: "協助整理訪談逐字稿、萃取重點與建立可回查的採訪材料。"
  },
  {
    step: "準備題目方向",
    agent: "議題發想雞",
    role: "協助延伸題目角度、補足可能盲點，讓選題不只依賴個人直覺。"
  },
  {
    step: "寫稿",
    agent: "論點分析獅",
    role: "檢查論點是否清楚、段落是否連貫，但不取代記者的採訪判斷。"
  },
  {
    step: "核稿",
    agent: "數據檢查猿",
    role: "協助檢查數字、引用與資料一致性，降低初步錯漏。"
  },
  {
    step: "改稿",
    agent: "標題超吸鯨",
    role: "提供標題、開場與摘要方向，讓內容更容易被讀者理解。"
  },
  {
    step: "審稿",
    agent: "人工審核閘門",
    role: "編輯與記者仍需查證、修整、決定是否發布，這是治理底線。"
  },
  {
    step: "發通路",
    agent: "AEO 流量密馬",
    role: "協助檢查 AI 搜尋與答案引擎可能辨識的關鍵訊號。"
  }
];

async function loadWorkflowData() {
  try {
    const response = await fetch("data/ai_hub_agents_map.json");
    if (!response.ok) throw new Error("Cannot load agent map");
    return await response.json();
  } catch (_error) {
    return fallbackAgents;
  }
}

function renderWorkflow(agents) {
  const stepper = document.querySelector("#workflow-stepper");
  const detail = document.querySelector("#workflow-detail");
  const prev = document.querySelector("#workflow-prev");
  const next = document.querySelector("#workflow-next");
  if (!stepper || !detail || !agents.length) return;

  let activeIndex = 0;

  function update(index) {
    activeIndex = (index + agents.length) % agents.length;
    [...stepper.children].forEach((button, buttonIndex) => {
      const isActive = buttonIndex === activeIndex;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    const active = agents[activeIndex];
    detail.innerHTML = `<strong>${active.step}：${active.agent}</strong>${active.role}`;
  }

  agents.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${index + 1}. ${item.step}`;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => update(index));
    stepper.appendChild(button);
  });

  prev?.addEventListener("click", () => update(activeIndex - 1));
  next?.addEventListener("click", () => update(activeIndex + 1));
  update(0);
}

document.addEventListener("DOMContentLoaded", async () => {
  const agents = await loadWorkflowData();
  renderWorkflow(agents);
});
