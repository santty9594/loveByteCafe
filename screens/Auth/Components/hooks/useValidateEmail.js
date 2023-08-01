export default function useValidateEmail() {
  const isValidEmail = email =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );

  function handleEmailValidation(email) {

    const isValid = isValidEmail(email);

    const validityChanged = (email && isValid) || (!email && !isValid);
    if (validityChanged) {
      console.log('Fire tracker with', isValid ? 'Valid' : 'Invalid');
    }

    return isValid;
  }

  return {
    handleEmailValidation,
  };
}

