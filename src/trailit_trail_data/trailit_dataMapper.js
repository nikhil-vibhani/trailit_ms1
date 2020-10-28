function trailitNotCreated() {
    const resObj = {
        "result": "Trailit not created.",
        "statusCode": 400
    };

    return resObj;
};

function trailitDataExist() {
    const resObj = {
        "result": "Trailit data aleady exist.",
        "statusCode": 400
    };

    return resObj;
};

function trailitDataNotExist() {
    const resObj = {
        "result": "Trailit data not found",
        "statusCode": 404
    };

    return resObj;
};

function trailitDataNotCreated() {
    const resObj = {
        "result": "Trailit data not created",
        "statusCode": 404
    };

    return resObj;
};

function trailitDataNotUpdated() {
    const resObj = {
        "result": "Trailit data not updated",
        "statusCode": 404
    };

    return resObj;
};

function trailitDataNotDeleted() {
    const resObj = {
        "result": "Trailit data not deleted",
        "statusCode": 404
    };

    return resObj;
};

function trailitMainTableDataNotDeleted() {
    const resObj = {
        "result": "Trailit main table data not deleted",
        "statusCode": 404
    };

    return resObj;
};

function trailitNotAddedToSort() {
    const resObj = {
        "result": "Trailit data not added to sort table",
        "statusCode": 404
    };
};

function trailitNotRemovedFromSort() {
    const resObj = {
        "result": "Trailit data not removed from sort table",
        "statusCode": 404
    };
};

function trailitFollowNotDeleted() {
    const resObj = {
        "result": "Trailit follow not removed from follow table",
        "statusCode": 404
    };
};

function trailitNotifiNotAdded() {
    const resObj = {
        "result": "Trail create notification not added",
        "statusCode": 404
    };
};

function trailitExist() {
    const resObj = {
        "result": "Trailit name exist",
        "statusCode": 404
    };
    return resObj;
};

module.exports = {
    trailitNotCreated,
    trailitDataExist,
    trailitDataNotExist,
    trailitDataNotCreated,
    trailitDataNotUpdated,
    trailitDataNotDeleted,
    trailitMainTableDataNotDeleted,
    trailitNotAddedToSort,
    trailitFollowNotDeleted,
    trailitNotifiNotAdded,
    trailitNotRemovedFromSort,
    trailitExist
};