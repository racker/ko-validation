ko.validation.config = {
  i18n: function (string, args) {
    for (var i in args) {
      if (args.hasOwnProperty(i)) {
        var regex = new RegExp('\\{\\$' + i + '\\}', 'g');
        string = string.replace(regex, args[i]);
      }
    }
    return string;
  }
};
