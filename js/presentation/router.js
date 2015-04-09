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
            'event': 'event',
            'map': 'map'
        },

        initialize: function (options) {
            this.active = null;

            this.model = options.model;
            this.$container = options.$container;
            this.$parent = $(this.$container.parent());
        },

        splash: function () {
            this.setActive('splash', new presentation.view.Splash({
                template: $('#splash-tpl').html(),
                model: this.model
            }));
        },

        intro: function () {
            this.setActive('intro', new presentation.view.Splash({
                template: $('#intro-tpl').html(),
                model: this.model
            }));
        },

        event: function () {
            this.setActive('event', new presentation.view.Event({
                template: $('#event-tpl').html(),
                model: this.model
            }));
        },

        map: function () {
            this.setActive('map', new presentation.view.Map({
                template: $('#map-tpl').html(),
                model: this.model
            }));
        },

        setActive: function (identifier, view) {
            var $new,
                old,
                offset;

            if (null !== this.active) {
                old = this.active;
            }

            this.model.set('slide', identifier);
            this.active = view;

            $new = this.active.render().$el;
            this.$container.append($new);

            offset = $new.position();
            this.$container.animate({
                top: -offset.top
            });
        }
    });
}(zicht, jQuery));