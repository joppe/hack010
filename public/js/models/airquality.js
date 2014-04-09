/*global window, Util, _, Backbone*/

(function (win) {
    'use strict';

    /**
     * @namespace model
     */
    Util.createNamespace('model');

    win.model.Position = Backbone.Model.extend({

    });

    win.model.AirQuality = Backbone.Collection.extend({
        model: win.model.Position,

        initialize: function (models, options) {
            this.baseUrl = options.baseUrl;
            this.state = options.state;

            this.state.on('change:position', _.bind(function () {
                console.log('change:position');
                this.position = this.state.get('position');
                this.fetch();
            }, this));
        },

        url: function () {
            var lat = parseFloat(position.get('@lat')),
                lon = parseFloat(position.get('@lon'));
            return this.baseUrl + '/AirQuality.php?lat=' + lat + '&lon=' + lon;
        },

        parse: function (response) {
            return response.trk.trkseg.trkpt;
        }
    });
}(window));