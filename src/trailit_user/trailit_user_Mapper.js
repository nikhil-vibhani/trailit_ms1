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

module.exports = {
    registerMapping
};
