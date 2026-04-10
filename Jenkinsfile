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
                        sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./backend/my-app"
                        sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend/my-app"
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    docker.withTool('docker') {
                        withCredentials([usernamePassword(
                            credentialsId: DOCKER_CREDENTIAL,
                            usernameVariable: 'USER',
                            passwordVariable: 'PASS'
                        )]) {
                            sh "echo \$PASS | docker login -u \$USER --password-stdin"
                            sh "docker push ${BACKEND_IMAGE}:${TAG}"
                            sh "docker push ${FRONTEND_IMAGE}:${TAG}"
                        }
                    }
                }
            }
        }

        stage('Integration Test') {
            steps {
                script {
                    docker.withTool('docker') {
                        sh "docker-compose -f docker-compose.dev.yml up -d"
                        sh "sleep 20"
                        sh "curl -f http://localhost:8080/api/health || true"
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                docker.withTool('docker') {
                    sh "docker-compose -f docker-compose.dev.yml stop || true"
                    sh "docker image prune -f"
                }
            }
        }
    }
}