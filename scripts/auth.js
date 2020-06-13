(async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        await db.collection("guides").onSnapshot((snapshot) => {
          setupGuides(snapshot.docs);
          setupUI(user);
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setupUI();
      setupGuides([]);
    }
  });
})();

const createForm = document.getElementById("create-form");
createForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = createForm["title"].value;
  const content = createForm["content"].value;

  try {
    await db.collection("guides").add({
      title,
      content,
    });

    const modal = document.getElementById("modal-create");
    M.Modal.getInstance(modal).close();
    createForm.reset();
  } catch (error) {
    console.log(error.message);
  }
});

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  try {
    await auth.createUserWithEmailAndPassword(email, password);

    const modal = document.getElementById("modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  } catch (error) {
    console.log(error.message);
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    await auth.signOut();
  } catch (error) {
    console.log(error.message);
  }
});

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  try {
    await auth.signInWithEmailAndPassword(email, password);

    const modal = document.getElementById("modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  } catch (error) {
    console.log(error.message);
  }
});
