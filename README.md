# Jenkins Docker CI/CD Project

## Project Overview

This project demonstrates automated application
deployment using Jenkins, Docker, GitHub and AWS EC2.

## Technologies Used

- Node.js
- GitHub
- Jenkins
- Docker
- Docker Hub
- AWS EC2

## Application Port

3000

## Run Locally

npm install
npm start

## Run Tests

npm test

## Docker Build

docker build -t jenkins-cicd-app .

## Docker Run

docker run -d -p 3000:3000 jenkins-cicd-app

## Deployment Workflow

Developer → GitHub → Jenkins → Docker Hub → AWS EC2
