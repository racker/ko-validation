ko.validators.emailValidator = function (message) {
  return ko.validators.regexValidator(
    /^[+a-zA-Z0-9_.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,12}$/,
    message
  );
};
