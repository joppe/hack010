/*global zicht, Backbone, presentation, _, jQuery*/

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

    presentation.view.Abstract = Backbone.View.extend({
        /**
         * @param {Object} options
         */
        initialize: function (options) {
            var template = _.template(options.template);

            this.$el = $(template({}));
        },

        render: function () {
            return this;
        },

        remove: function () {
            this.$el.remove();
            this.stopListening();
        }
    });
}(zicht, jQuery));