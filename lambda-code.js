const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (sqsEvent) => {
    
    console.log(" sqsEvent : " + JSON.stringify(sqsEvent))

    var s3Event = JSON.parse(sqsEvent.Records[0].body)

    console.log("s3Event: " + JSON.stringify(s3Event))    
    
    const srcBucket = s3Event.Records[0].s3.bucket.name;
    const srcKey = s3Event.Records[0].s3.object.key;
    
    const params = {
              Bucket: srcBucket,
              Key: srcKey
          };
    
    var s3content = await s3.getObject(params).promise();
    var s3body = s3content.Body.toString();
    
    const item = JSON.parse(s3body)
    
    //Generate a Random ID
    item.id = Math.random() * Math.pow(10, 16) + ''

    var dynamoParams = {
        TableName: 'ProcessedItemsTable',
        Item: item
    };

    const result = await dynamo.put(dynamoParams).promise();

    return result;
};