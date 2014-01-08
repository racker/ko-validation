ko-validation [![Build Status](https://travis-ci.org/racker/ko-validation.png?branch=master)](https://travis-ci.org/racker/ko-validation)
=============

Knockout Validation Plugin for the Rackspace Control Panel.

## Getting Started

Just hook up validation to your knockout observables:

View Model:
```javascript
myViewModel = function () {
  this['name'] = ko.observable('John Doe').extend({
    'required': ['Name is required.'], // will show the message "Name is required."
    'maxLength': [30, 'Name cannot be longer than 30 characters.'] // the last item is the message that will be shown
  });

  this['phone'] = ko.observable().extend({
    'regex': [/[0-9]/, 'Must contain numbers.']
  });
};
```

Template:
```html
<div>
  <input type="text" data-bind="value: name">
  <input type="text" data-bind="value: phone">
</div>
```

By default, the plugin will insert a span in the parent element of the input that is bound to that observable, and show the validation messages there.

## Validation Rules

Currently the following rules are supported:

* Required `required`
* Maximum Length `maxLength`
* Integer `integer`
* Range `range`
* Regex `regex`
* Email `email`
* Invalid Charachters `invalidChars`
* Required Only If `onlyIf`
* Custom `custom`

### Deprecated validators

* Equal To Field Value `equalToFieldValue`
* Greater Than Or Equal To Field Value `greaterThanOrEqualToFieldValue`
* Less Than Or Equal To Field Value `lessThanOrEqualToFieldValue`

Please refer to [integration specs for examples](https://github.com/racker/ko-validation/blob/master/spec/integration-spec.js)

## Validating Computed Observables

Sometimes we want to have multiple fields behave as a single field for validation purposes.

You can add an observable for each field and a computed observable with the final value, and have the computed observable be validated.

One example is if you have a text field alongside a select drop-down to select a time range, allowing the user to enter a number in the text field, and an option out of "Minutes, Hours, Days" in the select.

That would look like:

View Model:
```javascript
this['time'] = ko.observable();

this['timeUnit'] = ko.observable('minutes');

this['timeInMinutes'] = ko.computed(function () {
  return convertToMinutes(this['time'](), this['timeUnit']());
}, this).extend({
  'validatesAfter': [this['time'], this['timeUnit']],
  'required': ['Time is required.'],
  'range': [0, (60 * 24), 'Cooldown must be between 0 minutes and 1 day.']
});
```

And, on the template:
```html
<div>
  <input type="text" data-bind="value: time">
  <select data-bind="value: timeUnit">
</div>
```

Notice the `validationAfter` extension passed to `timeInMinutes`. That means that observable will be validated after changes on both `time` and `timeUnit`, and the error message will be shown by the input fields associated to each of them.

## Validating Checkboxes

Validating that at least one checkbox is checked in a checkbox group is as easy as extending an observable array with the checkboxes values to be required.
One problem that this solution could cause is that a validation message would be inserted after *each* checkbox.
To ensure only one validation message is inserted somewhere, use the `validationMessage` binding:

View Model:
```javascript
this['reasonsToCancelAccount'] = ko.observableArray([]).extend({
  'required': ['Choose at least one please']
});
```

Template:
```html
<div>
  <ul>
    <li><input type="checkbox" data-bind="checked: reasonsToCancelAccount" value="reason1"/>R1</li>
    <li><input type="checkbox" data-bind="checked: reasonsToCancelAccount" value="reason2"/>R2</li>
    <li><input type="checkbox" data-bind="checked: reasonsToCancelAccount" value="reason3"/>R3</li>
  </ul>
  <span data-bind="validationMessage: reasonsToCancelAccount"></span>
</div>
```

When an element with `validationMessage` binding exists, new elements for displaying validation messages will not be automatically inserted in the DOM.

## Contributing

If you want to contribute to ko-validation, you will need npm and grunt-cli.

After installing the dependencies with npm, run `grunt watch` to start the test watcher, which will run the tests in both Chrome and Firefox every time a file is modified. You can also use `grunt karma:ci` to run all the tests with PhantomJS.

When submitting a pull request, do not forget to add unit tests, and if you are introducing a new validator, please also add integration tests for it.

To create a new distribution file with a patch version, run `npm version patch -m "Upgrade to %s for reasons"` (with whatever is the most appropriate message), then run `grunt dist` to generate the minified concatenated dist file. You can then `npm publish` the new version to npm.

## When creating a new version

The rules are:

- Follow [semantic versioning](http://semver.org/).
- Create separate pull requests to create new versions. Don't put extra code change in those PRs.
- Use `npm version [major | minor | patch]`. It creates a tagged commit with a proper change to `package.json`.
- Don't foget to push a tag to github using `git push --tags`.
- After the PR with the new version is merged, execute `rm dist/*.js`, `grunt dist`, and `npm publish`.
