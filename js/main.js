function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  const tabLinks = document.getElementsByClassName("tab-link");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }

  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add("active");
  }
  evt.currentTarget.classList.add("active");

  const container = document.querySelector(".container");
  if (container) {
    if (tabName === "home") {
      container.classList.remove("single-column");
    } else {
      container.classList.add("single-column");
    }
  }
}
