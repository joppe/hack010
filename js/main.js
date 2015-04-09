/*global window, presentation, Backbone*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (win, $) {
    'use strict';

    $(function () {
        var state = new presentation.model.Presentation();

        new presentation.view.Navigation({
            model: state,
            el: $('.js-slide-navigation')
        });

        new presentation.Router({
            model: state,
            $container: $('.js-watch-views')
        });

        Backbone.history.start();
    });
}(window, jQuery));