function trailitNotifiNotExist() {
    const resObj = {
        "result": "Trailit notification not found",
        "statusCode": 404
    };

    return resObj;
};

function trailitNotifiNotUpdated() {
    const resObj = {
        "result": "Trailit notification not updated",
        "statusCode": 404
    };

    return resObj;
};

module.exports = {
    trailitNotifiNotExist,
    trailitNotifiNotUpdated
};