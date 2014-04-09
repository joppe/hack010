/*global window, jQuery*/

(function (win) {
    'use strict';

    var BASE_URL = 'http://localhost/hack010/';

    jQuery(function ($) {
        var state,
            positions,
            panorama,
            glass,
            app;

        state = new win.model.State({
            status: 'idle',
            interval: 2000
        });

        positions = new win.model.Positions([], {
            baseUrl: BASE_URL,
            state: state
        });

        airQuality = new win.model.AirQuality([], {
            baseUrl: BASE_URL,
            state: state
        });

        panorama = new win.view.Panorama({
            model: state,
            el: $('#streetview')
        }).render();

        glass = new win.view.Glass({
            model: state,
            el: $('.glass')
        }).render();

        app = (function () {
            var index = -1,
                friend,
                end,
                weather,
                heart,
                air,
                calories;

            end = new win.view.Notification({
                template: $('#end-tpl')
            }).hide();

            heart = new win.view.Notification({
                template: $('#heart-tpl')
            }).hide();

            air = new win.view.Notification({
                template: $('#air-tpl')
            }).hide();

            calories = new win.view.Notification({
                template: $('#calories-tpl')
            }).hide();

            friend = new win.view.Notification({
                template: $('#friend-tpl')
            }).hide();

            weather = new win.view.Notification({
                template: $('#weather-tpl')
            }).hide();

            function move() {
                var position;

                if (index === -1) {
                    index = 0;
                } else {
                    index += 1;
                }

                position = positions.at(index);

                if (position) {
                    state.set({
                        position: position
                    });
                } else {
                    state.set({
                        app: end
                    });
                }
            }

            return {
                run: function () {
                    state.on('change:state', function () {
                        if (state.get('state') === 'idle') {
                            win.setTimeout(move, state.get('interval'));
                        }
                    });

                    state.set({
                        app: friend
                    });

                    win.setInterval(function () {
                        state.set({
                            notify: calories
                        });
                    }, 6000);

                    win.setInterval(function () {
                        state.set({
                            notify: heart
                        });
                    }, 5000);

                    win.setTimeout(function () {
                        state.set({
                            notify: weather
                        });
                    }, 10000);
                    win.setTimeout(function () {
                        state.set({
                            notify: air
                        });
                    }, 11000);

                    move();
                }
            };
        }());

        positions.fetch({
            success: function () {
                app.run();
            }
        });

    });
}(window));