/*global window, _, jQuery*/

/*global window, Util, Backbone*/

(function (win, $) {
    'use strict';

    /**
     * @namespace streetview
     */
    Util.createNamespace('view');

    win.view.Panorama = Backbone.View.extend({
        initialize: function () {
            this.model.on('change:position', _.bind(this.update, this));
        },

        update: function () {
            var position = this.model.get('position'),
                lat = position.get('@lat'),
                lon = position.get('@lon'),
                src = 'http://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + lat + ',' + lon + '&sensor=false',
                $img = $('<img>');

            this.model.set({
                state: 'preloading'
            });

            $img.on({
                load: _.bind(function () {
                    this.$el.html($img);
                    this.model.set({
                        state: 'idle'
                    });
                    console.log(this.model.attributes);
                }, this)
            });

            $img.attr('src', src);
            console.log(src, 'set');
        }
    });
}(window, jQuery));