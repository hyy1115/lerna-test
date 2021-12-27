'use strict';

import hyyPackA from 'hyy-pack-a';

module.exports = hyyPackB;

function hyyPackB() {
    return hyyPackA();
}

hyyPackB();
