exports.handler = async (event, context) => {
    
    console.log(context.functionName);
    console.log(context.memoryLimitInMB);
    console.log(context.getRemainingTimeInMillis());
        
    let statusCode = 200;
    
    let todo = {
      "id": 100,
      "description": "Become AWS Certified v8",
      "isDone": false
    };
    
    let headers = {
        "Content-Type" : "application/json"
    }
    
    let body = JSON.stringify(todo);
    
    const response = {
        statusCode,
        body,
        headers
    };
    
    return response;
};
