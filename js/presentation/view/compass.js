/*global zicht, Backbone, presentation, _*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z, $) {
    'use strict';

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation.view');

    presentation.view.Compass = presentation.view.Abstract.extend({
        /**
         * @param {Object} options
         */
        initialize: function (options) {
            presentation.view.Abstract.prototype.initialize.call(this, options);

            this.$needle = this.$el.find('.js-needle');

            this.start = 0;
            this.animate();
        },

        animate: function () {
            var self = this,
                end = _.random(30, 60);

            $({
                deg: self.start
            }).animate({
                deg: end
            }, {
                duration: 400,
                step: function (now) {
                    // in the step-callback (that is fired each step of the animation),
                    // you can use the `now` paramter which contains the current
                    // animation-position (`0` up to `angle`)
                    self.start = now;
                    self.$needle.css({
                        transform: 'rotate(' + now + 'deg)'
                    });
                },

                complete: function () {
                    window.setTimeout(function () {
                        self.animate();
                    }, 400);
                }
            });
        }
    });
}(zicht, jQuery));
