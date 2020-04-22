/**
 * This file will have request and response object mappings.
 *
 * Created by Trailit
 */


function registerMapping(params) {
    const respObj = {
        "responseMessage": "Successfully registered.",
            "responseCode" : 200,
            "userProfile":{
                id:params
                }
            };

    return respObj;
}

function sortingFaild() {
    const resObj = {
        "result": "Trail sorting failed!",
        "statusCode": 404
    };

    return resObj;
};

module.exports = {
    registerMapping,
    sortingFaild
};
