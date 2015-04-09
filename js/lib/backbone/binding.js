/*global Zicht, Backbone, _*/

(function (z) {
    'use strict';

    var bindings = {};

    z.createNamespace('zicht.backbone');

    z.backbone.Binding = z.lang.Class.createClass({
        initialize: function ($element, model, property, events) {
            this.$element = $element;
            this.model = model;
            this.property = property;

            events = events || [];

            this.listenTo(this.model, 'change:' + this.property, this.write);
            _.each(events, function (event) {
                this.$element.on(event, _.bind(this.read, this));
            }, this);
        },

        read: function () {

        },

        write: function () {

        }
    });
    _.extend(z.backbone.Binding.prototype, Backbone.Events);

    z.backbone.Bindings = {
        register: function (name, binding) {
            bindings[name] = binding;
        },

        has: function (name) {
            return undefined !== bindings[name];
        },

        get: function (name) {
            var binding;

            if (this.has(name)) {
                binding = bindings[name];
            }

            return binding;
        }
    };

}(Zicht));