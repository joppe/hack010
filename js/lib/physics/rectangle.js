/*global zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.physics
     */
    z.createNamespace('zicht.physics');

    z.physics.Rectangle = z.lang.Class.createClass({
        /**
         * @param {zicht.physics.Point} topleft
         * @param {zicht.physics.Point} bottomright
         * @constructor
         */
        initialize: function (topleft, bottomright) {
            this.topleft = topleft;
            this.bottomright = bottomright;
        },

        /**
         * @returns {Number}
         */
        width: function () {
            return this.bottomright.x - this.topleft.x;
        },

        /**
         * @returns {Number}
         */
        height: function () {
            return this.bottomright.y - this.topleft.y;
        },

        /**
         * @returns {zicht.physics.Rectangle}
         */
        copy: function () {
            return new z.physics.Rectangle(this.topleft.copy(), this.bottomright.copy());
        },

        /**
         * @param {zicht.physics.Point} point
         * @returns {boolean}
         */
        contains: function (point) {
            var contains = false;

            if (
                point.y >= this.topleft.y &&
                point.y <= this.bottomright.y &&
                point.x >= this.topleft.x &&
                point.x >= this.bottomright.x
            ) {
                contains = true;
            }

            return contains;
        },

        /**
         * @param {zicht.physics.Rectangle} rect
         * @returns {boolean}
         */
        intersects: function (rect) {
            var contains = true;

            if (
                this.bottomright.x < rect.topleft.x ||
                this.topleft.x > rect.bottomright.x ||
                this.bottomright.y < rect.topleft.y ||
                this.topleft.y > rect.bottomright.y
            ) {
                contains = false;
            }

            return contains;
        },

        /**
         * @param {zicht.physics.Rectangle} rect
         * @returns {zicht.physics.Rectangle}
         */
        intersection: function (rect) {
            var topleft = new z.physics.Point(0, 0),
                bottomright = new z.physics.Point(0, 0);

            if (this.intersects(rect)) {
                topleft.x = Math.max(this.topleft.x, rect.topleft.x);
                topleft.y = Math.max(this.topleft.y, rect.topleft.y);

                bottomright.x = Math.min(this.bottomright.x, rect.bottomright.x);
                bottomright.y = Math.min(this.bottomright.y, rect.bottomright.y);
            }

            return new z.physics.Rectangle(topleft, bottomright);
        },

        /**
         * @returns {string}
         */
        toString: function () {
            return 'topleft = ' + this.topleft.toString() + ' | ' + 'bottomright = ' + this.bottomright.toString();
        }
    });
}(zicht));