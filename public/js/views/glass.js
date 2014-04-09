/*global window, _, jQuery, google*/

/*global window, Util, Backbone*/

(function (win, $) {
    'use strict';

    /**
     * @namespace view
     */
    Util.createNamespace('view');

    win.view.Glass = Backbone.View.extend({
        notifiers: {},

        initialize: function () {
            this.model.on('change:notify', _.bind(this.notify, this));
            this.model.on('change:app', _.bind(this.app, this));
        },

        notify: function () {
            var notifier = this.model.get('notify');

            if (notifier !== null) {
                this.model.set({
                    notify: null
                });

                if (this.notifiers[notifier.cid] === undefined) {
                    this.notifiers[notifier.cid] = notifier;
                    this.$el.append(notifier.$el);
                }

                this.app.hide();
                notifier.show();

                win.setTimeout(_.bind(function () {
                    notifier.hide();
                    this.app.show();
                }, this), 1000);
            }
        },

        app: function () {
            this.notifiers = {};
            this.app = this.model.get('app');

            this.$el.empty();
            this.app.$el.appendTo(this.$el);
            this.app.show();
        }
    });
}(window, jQuery));