pipeline {
    agent any

    tools {
        maven 'maven'
        nodejs 'node20'
    }

    environment {
        BACKEND_IMAGE = "mustafaguler4/ecommerce-app-backend"
        FRONTEND_IMAGE = "mustafaguler4/ecommerce-app-frontend"
        TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIAL = "dockerhub-creds"
    }

    stages {
        stage('Checkout') {
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.withTool('docker') {
                        // Backend build
                        sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./backend/my-app"
                        // Frontend build
                        sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend/my-app"
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    docker.withTool('docker') {
                        docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIAL}") {
                            sh "docker push ${BACKEND_IMAGE}:${TAG}"
                            sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Congratulations Mustafa! Backend and frontend were successfully installed."
        }
        failure {
            echo "Something went wrong, check the logs."
        }
    }
}