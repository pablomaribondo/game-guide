const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

const setupGuides = (data) => {
  if (data.length) {
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
  } else {
    guideList.innerHTML = "<h5>Login to view guides</h5>";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  const items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
