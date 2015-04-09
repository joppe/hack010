/*global zicht, presentation, Backbone*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z) {
    'use strict';

    /**
     * @namespace presentation.model
     */
    z.createNamespace('presentation.model');

    presentation.model.Presentation = Backbone.Model.extend({
        defaults: {
            slide: null
        }
    });
}(zicht));