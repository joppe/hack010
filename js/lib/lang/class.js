/*global _, zicht*/

(function (win, z) {
    'use strict';

    /**
     * @namespace zicht.lang
     */
    z.createNamespace('zicht.lang');

    z.lang.Class = {
        /**
         * @param {Object} namespace
         * @param {string} className
         * @returns {Object}
         */
        resolveClass: function (namespace, className) {
            return _.reduce(className.split('.'), function (target, part) {
                return target[part];
            }, namespace);
        },

        /**
         * @param {Object} className
         * @param {string} method
         * @param {Array} args
         * @param {Object} context
         */
        callSuper: function (className, method, args, context) {
            return className.prototype[method].apply(context, args);
        },

        /**
         * @param {Object} proto
         * @returns {Class}
         */
        createClass: function (proto) {
            var Class;

            Class = function () {
                if (undefined !== this.initialize) {
                    this.initialize.apply(this, arguments);
                }
            };

            _.extend(Class.prototype, proto);

            return Class;
        }
    };
}(window, zicht));