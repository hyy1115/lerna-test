'use strict';

import packTestA from 'pack-test-a';

module.exports = packTestB;

function packTestB() {
    console.log('pack-test-b');
    return packTestA();
}

packTestB();