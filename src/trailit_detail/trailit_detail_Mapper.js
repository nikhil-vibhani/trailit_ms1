function trailitDetailExist() {
    const resObj = {
        "result": "Trailit detail aleady exist.",
        "statusCode": 400
    };

    return resObj;
};

function trailitDetailNotExist() {
    const resObj = {
        "result": "Trailit detail not found",
        "statusCode": 404
    };

    return resObj;
};

function trailitDetailNotCreated() {
    const resObj = {
        "result": "Trailit detail not created",
        "statusCode": 404
    };

    return resObj;
};

function trailitDetailNotUpdated() {
    const resObj = {
        "result": "Trailit Detail not updated",
        "statusCode": 404
    };

    return resObj;
};

function trailitDetailNotDeleted() {
    const resObj = {
        "result": "Trailit Detail not deleted",
        "statusCode": 404
    };

    return resObj;
};

function trailitNotAddedToSort() {
    const resObj = {
        "result": "Trailit Detail not added to sort table",
        "statusCode": 404
    };
};

module.exports = {
    trailitDetailExist,
    trailitDetailNotExist,
    trailitDetailNotCreated,
    trailitDetailNotUpdated,
    trailitDetailNotDeleted,
    trailitNotAddedToSort
};