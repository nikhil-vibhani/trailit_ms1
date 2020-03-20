function trailitFileExist() {
    const resObj = {
        "result": "Trailit file aleady exist.",
        "statusCode": 400
    };

    return resObj;
};

function trailitFileNotExist() {
    const resObj = {
        "result": "Trailit file not found",
        "statusCode": 404
    };

    return resObj;
};

function trailitFileNotCreated() {
    const resObj = {
        "result": "Trailit file not created",
        "statusCode": 404
    };

    return resObj;
};

function trailitFileNotUpdated() {
    const resObj = {
        "result": "Trailit file not updated",
        "statusCode": 404
    };

    return resObj;
};

function trailitFileNotDeleted() {
    const resObj = {
        "result": "Trailit file not deleted",
        "statusCode": 404
    };

    return resObj;
};

function trailitNotAddedToSort() {
    const resObj = {
        "result": "Trailit file not added to sort table",
        "statusCode": 404
    };
};

module.exports = {
    trailitFileExist,
    trailitFileNotExist,
    trailitFileNotCreated,
    trailitFileNotUpdated,
    trailitFileNotDeleted,
    trailitNotAddedToSort
};