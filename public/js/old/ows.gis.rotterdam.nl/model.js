/*global window, Util, Backbone*/

(function (win) {
    'use strict';

    /**
     * @namespace ows.gis.rotterdam.nl
     */
    Util.createNamespace('ows.gis.rotterdam.nl');

    win.ows.gis.rotterdam.nl.Collection = Backbone.Collection.extend({
        initialize: function (models, options) {
            this.baseUrl = options.baseUrl;
        },

        url: function () {
            return this.baseUrl + '/data/ows.gis.rotterdam.nl.json';
        },

        parse: function (response) {
            console.log(response);
        }
    });
}(window));