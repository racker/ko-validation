ko.validators.emailValidator = function () {
  return ko.validators.regexValidator(
    /^[+a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,6}$/,
    'Email address is not valid.'
  );
};

