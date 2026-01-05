const items = document.querySelectorAll(".accordion-item");

items.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    items.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".accordion-body").style.height = "0px";
    });

    if (!isOpen) {
      item.classList.add("active");
      body.style.height = body.scrollHeight + "px";
    }
  });
});
