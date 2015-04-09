/*global zicht, Backbone, presentation, _*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z) {
    'use strict';

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation.view');

    presentation.view.Abstract = Backbone.View.extend({
        render: function () {
            return this;
        },

        remove: function () {
            this.$el.remove();
            this.stopListening();
        }
    });
}(zicht));
