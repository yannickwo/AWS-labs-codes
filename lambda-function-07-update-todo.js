const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const id = event.pathParameters.id
    
    const body = JSON.parse(event.body)

    var params = {
      TableName : 'todos',
      Item: body
    };

    /*Update item */    
    const result = await dynamo.put(params).promise();
    
    const statusCode = 200
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body:'', headers };

    return response;
};
