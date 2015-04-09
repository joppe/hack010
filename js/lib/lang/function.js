/*global zicht, _*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.lang
     */
    z.createNamespace('zicht.lang');

    z.lang.Function = {
        args: (function () {
            var ARGS = /^function[^\(]*\(([^\)]*)\)/m;

            /**
             * @param {Function} func
             * @returns {Array}
             */
            return function (func) {
                var str = func.toString(),
                    matches = str.match(ARGS),
                    args = [];

                if (1 <= matches.length && '' !== z.lang.String.trim(matches[1])) {
                    args = _.map(matches[1].split(','), function (arg) {
                        return z.lang.String.trim(arg);
                    });
                }

                return args;
            };
        }()),

        /**
         * @param {Function} func
         * @returns {Function}
         */
        cache: function (func) {
            var result;

            return function () {
                if (undefined === result) {
                    result = func.apply(func, arguments);
                }

                return result;
            };
        }
    };
}(zicht));