pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "saravanan6221/jenkins-cicd-app"
        EC2_HOST = "172.31.3.101"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Downloading source code from GitHub'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing application dependencies'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing application'
                sh 'npm test'
            }
        }

        stage('Docker Image Build') {
            steps {
                echo 'Building Docker image'
                sh '''
                    docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .
                    docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest
                '''
            }
        }

        stage('Docker Image Push') {
            steps {
                echo 'Pushing image to Docker Hub'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_TOKEN" | docker login \
                        -u "$DOCKER_USER" --password-stdin

                        docker push $DOCKER_IMAGE:$BUILD_NUMBER
                        docker push $DOCKER_IMAGE:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Deploying application to AWS EC2'

                sshagent(credentials: ['ec2-ssh-key']) {

                    sh '''
                        ssh -o StrictHostKeyChecking=no \
                        ubuntu@$EC2_HOST "
                            docker pull $DOCKER_IMAGE:$BUILD_NUMBER &&
                            (docker rm -f sample-app || true) &&
                            docker run -d \
                            --name sample-app \
                            --restart unless-stopped \
                            -p 3000:3000 \
                            $DOCKER_IMAGE:$BUILD_NUMBER
                        "
                    '''
                }
            }
        }

        stage('Deployment Verification') {
            steps {
                echo 'Checking deployed application'

                sshagent(credentials: ['ec2-ssh-key']) {

                    sh '''
                        ssh -o StrictHostKeyChecking=no \
                        ubuntu@$EC2_HOST \
                        "curl -f http://localhost:3000/"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed. Check Jenkins console output.'
        }
    }
}
