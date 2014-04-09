/*global window, _, jQuery, google*/

/*global window, Util, Backbone*/

(function (win, $) {
    'use strict';

    /**
     * @namespace view
     */
    Util.createNamespace('view');

    win.view.Glass = Backbone.View.extend({
        initialize: function () {
            this.model.on('change:notify', _.bind(this.notify, this));
            this.model.on('change:app', _.bind(this.app, this));
        },

        notify: function () {
            console.log('notify');
            var notifier = this.model.get('notify');

            this.$el.append(notifier.$el);
            this.app.hide();
            notifier.show();

            win.setTimeout(_.bind(function () {
                notifier.hide();
                this.app.show();
            }, this), 1000);
        },

        app: function () {
            this.app = this.model.get('app');

            this.$el.empty();
            this.app.$el.appendTo(this.$el);
            this.app.show();
        }
    });
}(window, jQuery));