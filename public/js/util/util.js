/*global window, _*/

(function (win) {
    'use strict';

    var Util = win.Util = {};

    Util.createNamespace = function (namespace) {
        var target = win;

        _.each(namespace.split('.'), function (part) {
            if (target[part] === undefined) {
                target[part] = {};
            }
            target=target[part];
        });
    };
}(window));