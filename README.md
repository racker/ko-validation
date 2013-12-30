ko-validation [![Build Status](https://travis-ci.org/racker/ko-validation.png?branch=master)](https://travis-ci.org/racker/ko-validation)
=============

Knockout Validation Plugin for the Rackspace Control Panel.

##Getting Started

Just hook up validation to your knockout observables:

View Model:
```javascript
myViewModel = function () {
  this['myField'] = ko.observable('defaultValue').extend({
    'required': ['FieldName'], // will show the message "FieldName is required."
    'length': ['FieldName', 30] // will show the message "FieldName cannot be longer than 30 characters."
  });

  this['name'] = ko.observable().extend({
    'required': ['', 'Please enter your name.'] // will show "Please enter your name."
  });
};
```

Template:
```html
<div>
  <input type="text" data-bind="value: myField">
</div>
```

By default, the plugin will insert a span in the parent element of the input that is bound to that observable, and show the validation messages there.

##Validation Rules

Currently the following rules are supported:

* Greater Than `greaterThan`
* Greater Than Or Equal To Field Value `greaterThanOrEqualToFieldValue`
* Equal To Field Value `equalToFieldValue`
* Less Than Or Equal To Field Value `lessThanOrEqualToFieldValue`
* Invalid Charachters `invalidChars`
* Length `length`
* Min Length `minLength`
* Range `range`
* Required `required`
* Required Only If `onlyIf`
* Integer `integer`
* Regex `regex`
* Custom `custom`


Please refer to [integration specs for examples](https://github.com/racker/ko-validation/blob/master/spec/integration-spec.js)

##Validating Computed Observables

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
  'required': ['Time'],
  'range': ['Time', 0, (60 * 24), gettext('Cooldown must be between 0 minutes and 1 day.')]
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

##Validating Checkboxes

Validating that at least one checkbox is checked in a checkbox group is as easy as extending an observable array with the checkboxes values to be required.
One problem that this solution could cause is that a validation message would be inserted after *each* checkbox.
To ensure only one validation message is inserted somewhere, use the `validationMessage` binding:

View Model:
```javascript
this['reasonsToCancelAccount'] = ko.observableArray([]).extend({
  'required': ['', 'Choose at least one please']
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
