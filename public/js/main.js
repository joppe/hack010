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
                interval;

            end = new win.view.End({
                template: $('#end-tpl')
            }).hide();

            friend = new win.view.Friend({
                template: $('#friend-tpl')
            }).hide();

            weather = new win.view.Weather({
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

                    win.setTimeout(function () {
                        state.set({
                            notify: weather
                        });
                    }, 8000);

                    win.setTimeout(function () {
                        state.set({
                            notify: end
                        });
                    }, 10000);

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