/*global zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.physics
     */
    z.createNamespace('zicht.physics');

    z.physics.Point = z.lang.Class.createClass({
        /**
         * @param {Number} x
         * @param {Number} y
         * @constructor
         */
        initialize: function (x, y) {
            this.x = x;
            this.y = y;
        },

        /**
         * @returns {zicht.physics.Point}
         */
        copy: function () {
            return new z.physics.Point(this.x, this.y);
        },

        /**
         * @returns {string}
         */
        toString: function () {
            return 'x: ' + this.x + '; y: ' + this.y;
        }
    });
}(zicht));