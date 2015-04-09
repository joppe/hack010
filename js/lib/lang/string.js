/*global zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.lang
     */
    z.createNamespace('zicht.lang');

    z.lang.String = {
        trim: (function () {
            var TRIM = /^\s+|\s+$/m;

            return function (str) {
                return str.replace(TRIM, '');
            };
        }()),

        snakeToCamelCase: (function () {
            var CHAR = /_(\w)/g;

            return function (str) {
                return str.toLowerCase().replace(CHAR, function (match, group) {
                    return group.toUpperCase();
                });
            };
        }()),

        spineToCamelCase: (function () {
            var CHAR = /-(\w)/g;

            return function (str) {
                return str.toLowerCase().replace(CHAR, function (match, group) {
                    return group.toUpperCase();
                });
            };
        }()),

        ucfirst: (function () {
            var FIRST_CHAR = /(^\w)/g;

            return function (str) {
                return str.replace(FIRST_CHAR, function (match, group) {
                    return group.toUpperCase();
                });
            };
        }())
    };
}(zicht));