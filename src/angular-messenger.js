/* global angular, console */

'use strict';

angular.module('ngMessenger', [])
  .provider('ngMessenger', function() {
    //Config variables
    var messageTheme;

    //Set theme
    this.messageTheme = function(val) {
        messageTheme = val;
        return true;
    };

     this.$get = [function() {

        // private methods
        function postNewMessage(messageConfig){
            messageConfig = getFormattedMessageConfig(messageConfig);

            console.log(messageConfig);

            Messenger().post({
            //message specific settings
            message: messageConfig.text,
            type: messageConfig.type,
            /*id: messageConfig.id,
            singleton: messageConfig.singleton,
            showCloseButton: messageConfig.showCloseButton,
            closeButtonText: messageConfig.closeButtonText,
            hideAfter: messageConfig.hideAfter,

            //global settings
            theme: messageTheme*/
            })
        }

        function getFormattedMessageConfig(messageConfig) {
             //set up config options

            messageConfig.text = messageConfig.text || {};
            messageConfig.type = messageConfig.type || 'info';
            messageConfig.id = messageConfig.id || {};
            messageConfig.singleton = messageConfig.singleton || false;
            messageConfig.showCloseButton = messageConfig.showCloseButton || false;
            messageConfig.closeButtonText = messageConfig.closeButtonText || {};
            messageConfig.hideAfter = messageConfig.hideAfter || {};
            messageConfig.actions = messageConfig.actions || {};

            return messageConfig;
        }

        // public functions
        return {
            displayInfoMessage: function(messageText) {
                postNewMessage({
                    text: messageText,
                    type: 'info'
                });
            }
        };
    }];
});
