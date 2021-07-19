export const validation = (input) => {
  let errors = {};
  //   const regExp = \b([A-ZÀ-ÿ][-,a-z.']+[ ]*)+\b;
  const regExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
  if (!input.name) {
    errors.name = 'Recipe name is required.';
  } else if (!regExp.test(input.name)) {
    errors.name = 'Recipe name must be alphanumeric.';
  }

  if (!input.summary) {
    errors.summary = 'Summary is required.';
  } else if (!regExp.test(input.summary)) {
    errors.summary = 'Summary must be alphanumeric.';
  }
};
