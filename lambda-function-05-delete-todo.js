const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id

    var params = {
      TableName : 'todos',
      Key: { id }
    };    
    
    const results = await dynamo.delete(params).promise();
    
    const statusCode = 200
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body:'', headers };

    return response;
};
