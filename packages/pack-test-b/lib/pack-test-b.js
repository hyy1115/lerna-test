'use strict';

import packTestA from 'pack-test-a';

module.exports = packTestB;

function packTestB() {
    return packTestA();
}

packTestB();