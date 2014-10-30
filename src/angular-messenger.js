/* global angular, console */

'use strict';

angular.module('ngMessenger', [])
  .provider('ngMessenger', function() {
    //Config variables
    var messageTheme,
    extraClasses,
    maxMessages= 3,
    parentLocations,
    messageDefaults,
    messageLocation,
    showCloseButton = true,
    closeButtonText = 'x';

    //Set theme
    this.messageTheme = function(val) {
        messageTheme = val;
        return true;
    };

    this.extraClasses = function(val) {
        extraClasses = val;
        return true;
    };

    this.maxMessages = function(val) {
        maxMessages = val;
        return true;
    };

    this.parentLocations = function(val) {
        parentLocations = val;
        return true;
    };

    this.messageDefaults = function(val) {
        messageDefaults = val;
        return true;
    };

    this.messageLocation = function(val) {
        messageLocation = val;
        return true;
    };

    this.showCloseButton = function(val) {
        showCloseButton = val;
        return true;
    };

    this.closeButtonText = function(val) {
        closeButtonText = val;
        return true;
    };

     this.$get = [function() {

        // private methods
        function postNewMessage(messageConfig){
            setThemeClasses(messageLocation);

            Messenger({
                extraClasses: extraClasses,
                parentLocations: parentLocations
            });
            messageConfig = getFormattedMessageConfig(messageConfig);

            Messenger().post({
            //message specific settings
            message: messageConfig.text,
            type: messageConfig.type,
            showCloseButton: showCloseButton,
            closeButtonText: closeButtonText,

            //global settings
            theme: messageTheme
            })
        }

        function getFormattedMessageConfig(messageConfig) {
             //set up config options

            messageConfig.text = messageConfig.text || {};
            messageConfig.type = messageConfig.type || 'info';
            messageConfig.id = messageConfig.id || {};
            messageConfig.singleton = messageConfig.singleton || false;
            messageConfig.hideAfter = messageConfig.hideAfter || {};
            messageConfig.actions = messageConfig.actions || {};

            return messageConfig;
        }

        function setThemeClasses(location) {
            if(location === 'TopLeft') {
                extraClasses += ' messenger-on-top messenger-on-left';
            } else if(location === 'TopRight') {
                extraClasses += ' messenger-on-top messenger-on-right';
            } else if(location === 'BottomLeft') {
                extraClasses += ' messenger-on-bottom messenger-on-left';
            } else {
                extraClasses += ' messenger-on-bottom messenger-on-right';
            }
        }

        // public functions
        return {
            displayInfoMessage: function(messageText) {
                postNewMessage({
                    text: messageText,
                    type: 'info'
                });
            },
            displayErrorMessage: function(messageText) {
                postNewMessage({
                    text: messageText,
                    type: 'error'
                });
            },
            displaySuccessMessage: function(messageText) {
                postNewMessage({
                    text: messageText,
                    type: 'success'
                });
            },
            displayCustomMessage: function(messageText, themeName) {
                postNewMessage({
                    text: messageText,
                    type: themeName
                });
            },
            hideAllMessages: function(){
                Messenger().hideAll();
            }
        };
    }];
});
