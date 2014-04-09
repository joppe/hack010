/*global */

/*global window, Util, Backbone*/

(function (win) {
    'use strict';

    /**
     * @namespace model
     */
    Util.createNamespace('model');

    win.model.Position = Backbone.Model.extend({

    });

    win.model.Positions = Backbone.Collection.extend({
        model: win.model.Position,

        initialize: function (models, options) {
            this.baseUrl = options.baseUrl;
        },

        url: function () {
            return this.baseUrl + '/data/hackaton.gpx.json';
        },

        parse: function (response) {
            return response.trk.trkseg.trkpt;
        }
    });
}(window));