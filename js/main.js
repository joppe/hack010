/*global window, google*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (win, $) {
    'use strict';

    var initialize;

    initialize = function () {
        var latitude = 51.917577,
            longitude = 4.482045,
            mapOptions = {
                zoom: 8,
                center: new google.maps.LatLng(latitude, longitude)
            },
            map = new google.maps.Map($('map').get(0), mapOptions);
    };

    google.maps.event.addDomListener(win, 'load', initialize);
}(window, jQuery));
