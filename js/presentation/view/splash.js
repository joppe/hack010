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

    presentation.view.Splash = presentation.view.Abstract.extend({
        /**
         * @param {Object} options
         */
        initialize: function (options) {
            var template = _.template(options.template);

            this.$el = $(template({}));
        }
    });
}(zicht, jQuery));
