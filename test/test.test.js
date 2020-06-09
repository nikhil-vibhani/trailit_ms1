// const trailitFileTest = require('../src/trailit_files/trailit_file.test');
// const trailitDetailTest = require('../src/trailit_detail/trailit_detail.test');

const trailitUserTest = require('../src/trailit_user/trail_user.test');
const tooltipTrailDataTest = require('../src/trailit_trail_data/tooltip_trail_data.test');

describe('Trailit Test', () => {

    // // Call all test from trailit file folder
    // trailitFileTest();

    // // Call all test from trailit detail folder
    // trailitDetailTest();

    // Call All test from trailit_trail_data folder
    trailitUserTest();

    // // Call All test from trailit_trail_data folder
    // tooltipTrailDataTest();
});