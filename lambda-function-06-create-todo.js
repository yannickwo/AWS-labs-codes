const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    const todo = JSON.parse(event.body)
    
    /*Calculate (random) and set id for todo */
    if(!todo.id || todo.id === '-1') 
        todo.id = Math.random() * Math.pow(10,16) + ''

    var params = {
      TableName : 'todos',
      Item: todo
    };

    /*Insert todo */    
    const result = await dynamo.put(params).promise();
    
    const statusCode = 200
    
    const headers = { "Access-Control-Allow-Origin":"*" }
    
    const response = { statusCode, body:'', headers };

    return response;
};