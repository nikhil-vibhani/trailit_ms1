const trailitFileTest = require('../src/trailit_files/trailit_file.test');
const trailitDetailTest = require('../src/trailit_detail/trailit_detail.test');

describe('Trailit Test', () => {

    // Call all test from trailit file folder
    trailitFileTest();

    // Call all test from trailit detail folder
    trailitDetailTest();
});