const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  try {
    await auth.createUserWithEmailAndPassword(email, password);

    const modal = document.getElementById('modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  } catch (error) {
    console.log(error);
  }
});

const logout = document.getElementById('logout');
logout.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    await auth.signOut();
  } catch (error) {
    console.log(error)
  }
})