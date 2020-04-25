import Application from './Application.js';

$(function() {
    let app = new Application();
    app.init();

    $('[data-toggle="tooltip"]').tooltip();
});
