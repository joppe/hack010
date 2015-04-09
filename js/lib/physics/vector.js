/*global zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.physics
     */
    z.createNamespace('zicht.physics');

    z.physics.Vector = z.lang.Class.createClass({
        /**
         * @param {zicht.physics.Point} start
         * @param {zicht.physics.Point} end
         * @constructor
         */
        initialize: function (start, end) {
            this.start = start;
            this.end = end;
        },

        /**
         *
         * @returns {zicht.physics.Vector}
         */
        copy: function () {
            return new z.physics.Vector(this.start.copy(), this.end.copy());
        },

        /**
         * @returns {Number}
         */
        width: function () {
            return this.end.x - this.start.x;
        },

        /**
         * @returns {Number}
         */
        height: function () {
            return this.end.y - this.start.y;
        },

        /**
         * @returns {Number}
         */
        length: function () {
            var adjacent = this.width(),
                opposite = this.height();

            return Math.sqrt(adjacent * adjacent + opposite * opposite);
        },

        /**
         * @returns {Number}
         */
        angle: function () {
            return Math.atan2(this.width(), this.height());
        },

        /**
         * @param {zicht.physics.Vector} vector
         */
        add: function (vector) {
            this.end.x += vector.width();
            this.end.y += vector.height();
        },

        /**
         * @param {zicht.physics.Vector} vector
         */
        sub: function (vector) {
            this.end.x -= vector.width();
            this.end.y -= vector.height();
        },

        /**
         * @param {Number} scale
         */
        scale: function (scale) {
            this.end.x *= scale;
            this.end.y *= scale;
        },

        negate: function () {
            var start = this.start.copy(),
                end = this.end.copy();

            this.start = end;
            this.end = new z.physics.Point(start.x - end.x, start.y - end.y);
        },

        /**
         * @param {Number} angle
         */
        rotate: function (angle) {
            var width = this.width(),
                height = this.height(),
                cos = Math.cos(angle),
                sin = Math.sin(angle);

            this.end.x = width * cos - height * sin;
            this.end.y = width * sin + height * cos;
        },

        /**
         * @returns {string}
         */
        toString: function () {
            return 'start = ' + this.start.toString() + ' | ' + 'end = ' + this.end.toString();
        }
    });
}(zicht));