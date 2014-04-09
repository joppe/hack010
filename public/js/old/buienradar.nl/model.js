/*global window, Util, Backbone*/

(function (win) {
    'use strict';

    /**
     * @namespace buienradar.nl
     */
    Util.createNamespace('buienradar.nl');


    win.buienradar.nl.Weerstations = Backbone.Model.extend({

    });

    win.buienradar.nl.Collection = Backbone.Collection.extend({
        model: win.buienradar.nl.Weerstations,

        initialize: function (models, options) {
            this.baseUrl = options.baseUrl;
        },

        url: function () {
            return this.baseUrl + '/data/buienradar.nl.json';
        },

        parse: function (response) {
            return response.weergegevens.actueel_weer.weerstations;
        }
    });
}(window));