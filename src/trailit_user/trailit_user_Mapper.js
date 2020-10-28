/**
 * This file will have request and response object mappings.
 *
 * Created by Trailit
 */


function registerMapping(params) {
    var respObj = {
        "responseMessage": "Successfully registered.",
            "responseCode" : 200,
            "userProfile":{
                id:params
                }
            };

    return respObj;
}

function trailitExist() {
    const resObj = {
        "result": "Trail Title aleady exist.",
        "statusCode": 400
    };

    return resObj;
};

module.exports = {
    registerMapping,
    trailitExist
};
