pipeline {
    agent any

    tools {
        maven 'maven'
        nodejs 'node20'
    }

    environment {
        DOCKER_API_VERSION = '1.44'
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
                        sh "export DOCKER_API_VERSION=1.44 && docker build -t ${BACKEND_IMAGE}:${TAG} ./backend/my-app"
                        sh "export DOCKER_API_VERSION=1.44 && docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend/my-app"
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    docker.withTool('docker') {
                        docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIAL}") {
                            sh "export DOCKER_API_VERSION=1.44 && docker push ${BACKEND_IMAGE}:${TAG}"
                            sh "export DOCKER_API_VERSION=1.44 && docker push ${FRONTEND_IMAGE}:${TAG}"
                        }
                    }
                }
            }
        }

        stage('Push to GitLab') {
    steps {
        script {
            withCredentials([usernamePassword(credentialsId: 'gitlab-creds', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                sh """
                    git remote add gitlab https://${GIT_USERNAME}:${GIT_PASSWORD}@gitlab.com:mustafaguler3/fullstack-java-nextjs-ecommerce.git || true
                    git checkout master
                    git push gitlab master
                """
            }
        }
    }
}
    }

    post {
        success {
            echo "Finally! Images have been uploaded: ${TAG}"
        }
    }
}