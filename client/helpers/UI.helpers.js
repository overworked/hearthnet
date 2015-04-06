UI.registerHelper('isNotEmpty', function (array, options) {
    if (array) {
        if (array.count) {
            return array.count();
        } else if (array.length) {
            return array.length;
        }
    }

    return false;
});

UI.registerHelper('exists', function (object, options) {
    return !!object;
});
