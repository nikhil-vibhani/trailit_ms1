const IBMCOS = require('ibm-cos-sdk');

// // IBM CLOUD configuration
// const config = {
//     useHmac: false,
//     bucketName: 'trailit_files',
//     defaultEndPoint: 's3.jp-tok.cloud-object-storage.appdomain.cloud',
//     serviceCredential: {
//         apikey: "ruZgHg12tAqq3YxVSbLmEKZPZVehPESV_8nLlRwyrIo5",
//         endpoints: "https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
//         iam_apikey_description: "Auto-generated for key 50123212-126f-4f8b-bedd-8cb7fd080787",
//         iam_apikey_name: "trailit-files",
//         iam_role_crn: "crn:v1:bluemix:public:iam::::serviceRole:Writer",
//         iam_serviceid_crn: "crn:v1:bluemix:public:iam-identity::a/0d4d455c8a9844c8ab3deff5ba5201ae::serviceid:ServiceId-47f4f345-9d14-4341-a157-d505535a4c60",
//         resource_instance_id: "crn:v1:bluemix:public:cloud-object-storage:global:a/0d4d455c8a9844c8ab3deff5ba5201ae:ff4fe10d-b952-4e23-ad1b-36081a359900::"
//     }    
// };

const bucketName = 'trailit-files';
const defaultConfig = {
    apiKeyId: 'ruZgHg12tAqq3YxVSbLmEKZPZVehPESV_8nLlRwyrIo5',
    endpoint: 's3.jp-tok.cloud-object-storage.appdomain.cloud',
    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/0d4d455c8a9844c8ab3deff5ba5201ae:ff4fe10d-b952-4e23-ad1b-36081a359900::'
};

// S3 configuration
const s3Config = async () => {
    // let s3Option;

    // const { serviceCredential, defaultEndPoint } = config;

    // // Get token
    // const res = await axios.post('https://iam.cloud.ibm.com/identity/token', {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': 'application/json'
    //     },
    //     body: {
    //         grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    //         apikey: "47f4f345-9d14-4341-a157-d505535a4c60"
    //     }
    // });

    // console.log('line:', res);

    try {
        // if (serviceCredential.apikey) {
        //     s3Option = {
        //         apiKeyId: serviceCredential.apikey,
        //         serviceInstanceId: serviceCredential.resource_instance_id,
        //         endpoints: new IBMCOS.Endpoint(defaultEndPoint)
        //     }            
        // } else {
        //     throw Error('IAM ApiKey required to create S3 Client');
        // }

        // Get s3 client
        return await new IBMCOS.S3(defaultConfig);

    } catch (err) {
        console.log(err);
    }

};

class S3COS {
    constructor() {
        s3Config()
            .then(data => {
                this.s3 = data;
            })
            .catch(err => console.log(err));
    };

    // Post file in bucket
    async createObjectInBucket(file) {
        let fileName = `${new Date().getTime()}_${file.originalname.replace(/\s/g, '_')}`;

        try {
            const fileObject = {
                Bucket: bucketName,
                Key: fileName,
                Body: Buffer.from(file.buffer)
            };

            const res = await this.s3.putObject(fileObject).promise();

            if (!res) {
                return {
                    result: 'File uploading filed.',
                    statusCode: '400'
                };
            }

            const fileUrl = `https://${bucketName}.${defaultConfig.endpoint}/${fileName}`;

            return {
                res,
                fileUrl
            };

        } catch (err) {
            console.log(err);
        }
    };  
    
    // Get all buckets lists
    async listAllBuckets() {
        try {
            const data = await this.s3.listBuckets().promise();

            return data.Buckets;
        } catch (err) {
            console.log(err);
        }
    };

    // Get perticular file from bucket
    async itemObject() {
        try {
            const data = await this.s3.getObject({
                Bucket: bucketName,
                Key: 'SampleVideo_720x480_10mb.mkv'
            }).promise();

            return data;
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = S3COS;