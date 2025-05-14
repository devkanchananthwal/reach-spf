# Project:
reach-spf

# Description:
This projet requirement is to find the shortest path that exists between 2 nodes

# Source Code Includes:

- Added npm install winston-daily-rotate-file to create daily log file
- Added a folder 'graph' which has the business logic to fetch shortest path first of startNode and endNode


# Instruction to run the code:

- RUN "npm install" to install the dependencies
- RUN  "npm run start" to start the service
- RUN  "npm run test" to perform unit testing
- RUN  "npm run test:e2e" to perform end to end testing
- Execute Curl command to fetch the shortest path with provided startNode and endNode "curl --location 'http://localhost:3000/graph/shortest-path?startNode=T%2F2345&endNode=T%2F0031'"
- RUN "npm run build" to create a build (Optional)


# Deployment Instructions:

- Install Docker locally and create a DockerFile, must be wokring locally.
- Create a repository on Bibucket or any hosting plaftform
- Create a server on cloud AWS/Azure to run your bundled code.
- Create pipline file (bitbucket-pipelines.yml- depending upon the hosting platform chosen)
- Add SSH keys to buckets
- Setup environment variables


# Improvements:

- env file to support alpha and dev environment
- Formatting error response
- Adding security middleware :- Helmet, Rate Limitting, Audit Dependencies
- Docker compose file for multi service setup
