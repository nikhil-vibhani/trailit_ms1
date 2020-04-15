function trailitFollowExist() {
    const resObj = {
        "result": "Trailit follow aleady exist.",
        "statusCode": 400
    };

    return resObj; 
};

function notTrailFound() {
    const resObj = {
        "result": "Not trails found of preview user.",
        "statusCode": 400
    };

    return resObj; 
}

function trailitFollowNotExist() {
    const resObj = {
        "result": "Trailit follow not found",
        "statusCode": 404
    };

    return resObj;
};

function trailitFollowNotCreated() {
    const resObj = {
        "result": "Trailit follow not created",
        "statusCode": 404
    };

    return resObj;
};

function trailitFollowNotDeleted() {
    const resObj = {
        "result": "Trailit follow not deleted",
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
    notTrailFound,
    trailitFollowExist,
    trailitFollowNotExist,
    trailitFollowNotCreated,
    trailitFollowNotDeleted,
    trailitNotAddedToSort
};