/*global zicht, presentation, Backbone*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z) {
    'use strict';

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation');

    presentation.Router = Backbone.Router.extend({
        routes: {
            'splash': 'splash',
            'start': 'start'
        },

        initialize: function (options) {
            this.model = options.model;
            this.$container = options.$container;
        },

        splash: function () {
            this.model.set('slide', 'splash');

            new presentation.view.Splash();
        },

        start: function () {
            this.model.set('slide', 'start');
        }
    });
}(zicht));