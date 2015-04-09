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
    z.createNamespace('presentation.view');

    presentation.view.Navigation = Backbone.View.extend({
        events: {
            'click': 'onClick'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:slide', this.update);
        },

        update: function () {
            var slide = this.model.get('slide');

            this.$el.find('.active').removeClass('active');
            this.$el.find('[data-slide="' + slide + '"]').addClass('active');
        },

        onClick: function (event) {
            var $el = $(event.target);

            this.model.set('slide', $el.data('slide'));
        }
    });
}(zicht, jQuery));