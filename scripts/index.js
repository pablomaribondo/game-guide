const guideList = document.querySelector(".guides");

const setupGuides = (data) => {
  let html = "";
  data.forEach((document) => {
    const guide = document.data();
    const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white"><span>${guide.content}</span></div>
      </li>
    `;
    html += li;
  });

  guideList.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  const items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
