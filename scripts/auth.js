(async () => {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        await db.collection("guides").onSnapshot(async (snapshot) => {
          setupGuides(snapshot.docs);
          await setupUI(user);
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setupUI();
      await setupGuides([]);
    }
  });
})();

const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("admin-email").value;

  try {
    const addAdminRole = functions.httpsCallable("addAdminRole");
    const result = await addAdminRole({ email });
    console.log(result);
  } catch (error) {
    console.log(erro.message);
  }
});

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
  const bio = signupForm["signup-bio"].value;

  try {
    const credentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await db.collection("users").doc(credentials.user.uid).set({
      bio,
    });

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
