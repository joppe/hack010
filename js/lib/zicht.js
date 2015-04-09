/*global _*/

(function (win) {
    'use strict';

    /**
     * @namespace zicht
     */
    win.zicht = {
        /**
         * @param {string} namespace
         * @returns {Object}
         */
        createNamespace: function (namespace) {
            var target = win;

            _.each(namespace.split('.'), function (part) {
                if (undefined === target[part]) {
                    target[part] = {};
                }

                target = target[part];
            });

            return target;
        }
    };
}(window));