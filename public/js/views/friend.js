/*global window, _, jQuery, google*/

/*global window, Util, Backbone*/

(function (win, $) {
    'use strict';

    /**
     * @namespace view
     */
    Util.createNamespace('view');

    win.view.Friend = Backbone.View.extend({
        initialize: function (options) {
            var template = _.template(options.template.html());
            this.$el = $(template({}));
        },

        show: function () {
            this.$el.css({
                display: 'block'
            });

            return this;
        },

        hide: function () {
            this.$el.css({
                display: 'none'
            });

            return this;
        },

        render: function () {
            return this.$el;
        }
    });
}(window, jQuery));