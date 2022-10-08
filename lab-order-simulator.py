import boto3
import os
import random
import json

sqs = boto3.client('sqs')
orders_queue_url = os.environ['ORDERS_QUEUE_URL']
orders_count = 20 # count of orders to be simulated

def lambda_handler(event, context):
    for x in range(orders_count):
        # Generating some random values to simulate customer orders
        order_number = random.randint(100000000001, 200000000002)
        item_description = random.choice(['zMobile', 'zTablet', 'zTV', 'zWatch', 'zPen']) # Randomly pick one item from a selection of items sold by the ecommerce company
        num_items = random.randint(1, 5)
        # An incorrect value - 'err' - has been added below to randomly inject badly formatted data into the orders SQS queue
        # This is meant for simulating the case for using dead-letter-queues
        price_per_item = random.choice([110.0, 115.0, 120.0, 125.0, 130.0, 135.0, 140.0, 145.0, 150.0, 'err'])

        order = {
                    "order_number": order_number,
                    "num_items": num_items,
                    "price_per_item": price_per_item,
                    "item_description": item_description
                }

        # Send message to SQS queue
        response = sqs.send_message(
            QueueUrl = orders_queue_url,
            MessageBody = json.dumps(order)
        )
        print(response)



