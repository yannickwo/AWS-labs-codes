#!/bin/bash
yum update -y
yum install httpd -y
systemctl start httpd
systemctl enable httpd
cd /var/www/html
curl https://YOURBUCKETNAMEHERE.amazonaws.com/index.txt --output index.txt
EC2AZ=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone) 
sed "s/INSTANCEID/$EC2AZ/" index.txt > index.html