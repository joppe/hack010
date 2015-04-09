/*global zicht, presentation, Backbone*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z, $) {
    'use strict';

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation');

    presentation.Router = Backbone.Router.extend({
        routes: {
            'splash': 'splash',
            'intro': 'intro',
            'event': 'event'
        },

        initialize: function (options) {
            this.active = null;

            this.model = options.model;
            this.$container = options.$container;
        },

        splash: function () {
            this.model.set('slide', 'splash');

            this.setActive(new presentation.view.Splash({
                template: $('#splash-tpl').html()
            }));
        },

        intro: function () {
            this.model.set('slide', 'intro');

            this.setActive(new presentation.view.Splash({
                template: $('#intro-tpl').html()
            }));
        },

        event: function () {
            this.model.set('slide', 'event');

            this.setActive(new presentation.view.Event({
                template: $('#event-tpl').html()
            }));
        },

        setActive: function (view) {
            if (null !== this.active) {
                this.active.remove();
            }

            this.active = view;
            this.$container.html(this.active.render().$el);
        }
    });
}(zicht, jQuery));