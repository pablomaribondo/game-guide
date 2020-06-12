(async () => {
  try {
    const guidesSnapshot = await db.collection("guides").get();
    setupGuides(guidesSnapshot.docs);
  } catch (error) {
    console.log(error);
  }
})();

auth.onAuthStateChanged((user) => {
  console.log(user);
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
    console.log(error);
  }
});

const logout = document.getElementById("logout");
logout.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
});
