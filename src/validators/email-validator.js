ko.validators.emailValidator = function (customMessage) {
  var message, utils;

  utils = ko.validators.utilities;
  message = customMessage || 'Invalid email address.';

  return ko.validators.customValidator(
    utils.validateWithMessage(
      function (email) {
        var filter;

        filter = /^[+a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,6}$/;

        return filter.test(email);
      },
      message
    )
  );
};

