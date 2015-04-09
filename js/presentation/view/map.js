/*global zicht, Backbone, presentation, _, google*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z, $) {
    'use strict';

    var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(51.921019, 4.479429),
            disableDefaultUI: true,

            //styles: [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]

            styles: [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
        },
        geolocations = [
            ['Maritiem Museum', 51.917387, 4.482665],
            ['Blijdorp', 51.929039, 4.464971],
            ['Euromast', 51.905444, 4.466637],
            ['Erasmusbrug', 51.909227, 4.486276]
        ],
        geoguides = [
            ['Rotterdam Centraal', 51.925093, 4.469424],
            ['Witte de With', 51.915444, 4.477043]
        ],
        geousers = [
            ['Coolsingel', 51.922406, 4.478420],
            ['Kruisplein', 51.922026, 4.471068],
            ['Markthal', 51.920065, 4.486416]
        ];

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation.view');

    presentation.view.Map = presentation.view.Abstract.extend({
        events: {
            'click a': 'onClick'
        },

        /**
         * @param {Object} options
         */
        initialize: function (options) {
            presentation.view.Abstract.prototype.initialize.call(this, options);

            this.markers = {
                locations: [],
                guides: [],
                users: []
            };
        },

        initMap: function () {
            this.map = new google.maps.Map(this.$el.find('#map-canvas').get(0), mapOptions);

            _.each(geolocations, function (geolocation) {
                this.createMarker('locations', geolocation, 'img/icon_location.png');
            }, this);

            _.each(geoguides, function (geoguide) {
                this.createMarker('guides', geoguide, 'img/icon_guide.png');
            }, this);

            _.each(geousers, function (geouser) {
                this.createMarker('users', geouser, 'img/icon_user.png');
            }, this);
        },

        /**
         * @param {string} type
         * @param {Array} properties
         * @param {string} image
         */
        createMarker: function (type, properties, image) {
            var myLatLng = new google.maps.LatLng(properties[1], properties[2]),
                icon = {
                    url: image,
                    size: new google.maps.Size(32, 32),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(0, 32)
                },
                marker = new google.maps.Marker({
                    position: myLatLng,
                    map: this.map,
                    icon: icon
                });

            google.maps.event.addListener(marker, 'click', function() {
                window.document.location.hash = 'compass';
            });

            this.markers[type].push(marker);
        },

        /**
         * @param {Event} event
         */
        onClick: function (event) {
            event.preventDefault();

            var $el = $(event.target),
                layer,
                isShowing;

            if ($el.get(0).tagName.toLowerCase() !== 'a') {
                $el = $el.closest('a');
            }

            layer = $el.attr('href').replace('#', '');
            isShowing = $el.data('is-showing');

            if (true === isShowing) {
                this.hide(layer);
            } else {
                this.show(layer);
            }

            $el.data('is-showing', !isShowing);
            $el.find('img').toggle();
        },

        /**
         * @param {string} [layer]
         */
        hide: function (layer) {
            _.each(this.markers, function (markers, markerType) {
                if (undefined === layer || markerType === layer) {
                    _.each(markers, function (marker) {
                        marker.setMap(null);
                    }, this);
                }
            }, this);
        },

        /**
         * @param {string} [layer]
         */
        show: function (layer) {
            _.each(this.markers, function (markers, markerType) {
                if (undefined === layer || markerType === layer) {
                    _.each(markers, function (marker) {
                        marker.setMap(this.map);
                    }, this);
                }
            }, this);
        }
    });
}(zicht, jQuery));
