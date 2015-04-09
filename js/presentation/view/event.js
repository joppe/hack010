/*global zicht, Backbone, presentation, _*/

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

    presentation.view.Event = presentation.view.Abstract.extend({
        events: {
            'click a': 'onClick',
            'click img': 'proceed'
        },

        initialize: function (options) {
            presentation.view.Abstract.prototype.initialize.call(this, options);

            this.listenTo(this.model, 'change:event', this.update);
        },

        update: function () {
            var event = this.model.get('event');

            this.$el.find('.' + ACTIVE_CLASS).removeClass(ACTIVE_CLASS);
            this.$el.find('[href="#' + event + '"]').parent().addClass(ACTIVE_CLASS);
        },

        /**
         * @param {Event} event
         */
        onClick: function (event) {
            event.preventDefault();

            var $el = $(event.target);

            if ($el.get(0).tagName.toLowerCase() !== 'a') {
                $el = $el.closest('a');
            }

            this.model.set('event', $el.attr('href').replace('#', ''));
        },

        proceed: function () {
            window.document.location.hash = 'map';
        }
    });
}(zicht, jQuery));