# kafka-nodejs

Kafka broker to collect currency rates with nodejs

## Getting Started

> docker-compose up -d

See the kafdrop UI in localhost:9000

Install the packages  
> npm install  

Run the api server
>npm run start:dev

## Running Cronjob  

- Start cronjob to receive [currency rates](https://www.tcmb.gov.tr/kurlar/today.xml)  and push into kafka
    > curl -X POST <http://localhost:3000/api/v1/job/start>
- Stop cronjob </br>
    > curl -X POST <http://localhost:3000/api/v1/job/start>
