# angular-messenger

An AngularJS wrapper for the Hubspot Messenger toast notification library

##Dependencies

In order to use angular-messenger, you must install hubspot messenger and ensure that you have included:

* messenger.js (or messenger.min.js)
* messenger.css
* a theme css in messenger (for example, messenger-theme-future.css)

##Setup

In your angular application, simply add the module ngMessenger to your app.js (or similar) configuration as a module dependency. Now you can inject the ngMessenger app into your controller, directive, or service.

##Usage

Currently, this plugin has the following interfaces:

* displayInfoMessage(message) - displays a simple info message with the default messenger theme
* displayErrorMessage(message) - displays a simple error message with the default messenger theme
* displaySuccessMessage(message) - displays a simple success message with the default messenger theme
* displayCustomMessage(message, theme) - displays a custom styled message
* hideAllMessages() - hides all currently active messenger windows

##Unimplemented/Coming Soon:

The following items are not implemented but are on the roadmap:

* Action callbacks


## Licence
This module is released under the permissive [MIT license](http://revolunet.mit-license.org). Your contributions are always welcome.

