/*global zicht, presentation, Backbone*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z, $) {
    'use strict';

    var ACTIVE_CLASS = 'is-active';

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation.view');

    presentation.view.Navigation = Backbone.View.extend({
        events: {
            'click a': 'onClick'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:slide', this.update);
        },

        update: function () {
            var slide = this.model.get('slide');

            this.$el.find('.' + ACTIVE_CLASS).removeClass(ACTIVE_CLASS);
            this.$el.find('[href="#' + slide + '"]').addClass(ACTIVE_CLASS);
        },

        onClick: function (event) {
            var $el = $(event.target);

            this.model.set('slide', $el.attr('href').replace('#', ''));
        }
    });
}(zicht, jQuery));