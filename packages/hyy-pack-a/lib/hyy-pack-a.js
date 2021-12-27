'use strict';

import isDate from 'lodash/isDate';

module.exports = hyyPackA;

function hyyPackA() {
    // TODO
    const time = new Date();
    console.log('is Date-------', isDate(time));
}
