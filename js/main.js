/*global window, presentation, Backbone, google*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (win, $) {
    'use strict';

    $(function () {
        var initialize,
            state = new presentation.model.Presentation();

        new presentation.view.Navigation({
            model: state,
            el: $('.js-slide-navigation')
        });

        new presentation.Router({
            model: state,
            $container: $('.js-watch-views')
        });

        Backbone.history.start();

        initialize = function () {
            win.setTimeout(function () {
                win.document.location.hash = 'compass';
            }, 2000);
        };

        win.document.location.hash = 'splash';

        google.maps.event.addDomListener(window, 'load', initialize);
    });
}(window, jQuery));