/*global window, jQuery*/

(function (win) {
    'use strict';

    var BASE_URL = 'http://localhost/hack010/';

    jQuery(function ($) {
        var state,
            positions,
            panorama,
            runner;

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
        });

        runner = (function () {
            var index = -1;

            function run() {
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
                            win.setTimeout(run, state.get('interval'));
                        }
                    });

                    run();
                }
            };
        }());

        positions.fetch({
            success: function () {
                console.log(positions);
                runner.run();
            }
        });

    });
}(window));