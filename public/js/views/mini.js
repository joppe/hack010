/*global window, _, jQuery, google*/

/*global window, Util, Backbone*/

(function (win, $) {
    'use strict';

    /**
     * @namespace view
     */
    Util.createNamespace('view');

    win.view.Mini = Backbone.View.extend({
        initialize: function () {
            this.model.on('change:pano', _.bind(this.update, this));
        },

        update: function () {
            var pano = this.model.get('pano'),
                src = 'http://maps.googleapis.com/maps/api/streetview?size=384x250&pano=' + pano + '&pitch=0&zoom=1&sensor=false';

            this.$el.css({
                backgroundImage: 'url("' + src + '")'
            });
        }
    });
}(window, jQuery));