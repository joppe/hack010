/*global zicht, Backbone, presentation, _*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z, $) {
    'use strict';

    var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(51.921019, 4.479429)
        };

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation.view');

    presentation.view.Map = presentation.view.Abstract.extend({
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

            this.map = new google.maps.Map(this.el, mapOptions);
        }
    });
}(zicht, jQuery));
