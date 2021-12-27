'use strict';
import isDate from 'lodash/isDate';

module.exports = packTestA;

function packTestA() {
    const time = new Date();
    console.log('is Date-------', isDate(time));
}
