/*global window, _, jQuery, google*/

/*global window, Util, Backbone*/

(function (win, $) {
    'use strict';

    /**
     * @namespace view
     */
    Util.createNamespace('view');

    win.view.Panorama = Backbone.View.extend({
        point: null,

        initialize: function () {
            this.model.on('change:position', _.bind(this.update, this));
        },

        render: function () {
            var oldHeading;

            this.streetview = new google.maps.StreetViewPanorama(
                this.$el.get(0),
                {
                    disableDefaultUI: true,
                    pov: {
                        heading: 165,
                        pitch: 0
                    },
                    zoom: 1
                });

            google.maps.event.addListener(this.streetview, 'position_changed', _.bind(function () {
                this.model.set({
                    state: 'idle'
                });
            }, this));

//            google.maps.event.addListener(this.streetview, 'links_changed', _.bind(function() {
//                var links = this.streetview.getLinks(),
//                    heading = _.find(links, function (link) {
//                        var ret = false;
//
//                        if (oldHeading !== link.heading) {
//                            oldHeading = link.heading;
//                            ret = true;
//                        }
//
//                        return ret;
//                    });
//
//
//                console.log(links);
//                this.streetview.setPov({
//                    heading: links[0].heading,
//                    pitch: 0,
//                    zoom: 1
//                });
//            }, this));

            return this;
        },

        update: function () {
            var position = this.model.get('position'),
                lat = parseFloat(position.get('@lat')),
                lon = parseFloat(position.get('@lon'));

            this.model.set({
                state: 'preloading'
            });
            this.streetview.setPosition({
                lat: lat,
                lng: lon
            });
            this.streetview.setVisible(true);

            return this;
        }
    });
}(window, jQuery));