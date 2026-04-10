pipeline {
    agent any

    tools {
        maven 'maven3'
        nodejs 'node20'
    }

    environment {
        BACKEND_IMAGE = "mustafaguler4/ecommerce-app-backend"
        FRONTEND_IMAGE = "mustafaguler4/ecommerce-app-frontend"
        TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIAL = "dockerhub-creds"
        SONAR_TOKEN = credentials('sonar-token-id')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ---------------- BACKEND ----------------
        stage('Build Backend') {
            steps {
                dir('backend/my-app') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        // ---------------- FRONTEND ----------------
        stage('Build Frontend') {
            steps {
                dir('frontend/my-app') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        // ---------------- DOCKER BUILD ----------------
        stage('Docker Build') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./backend/my-app"
                sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend/my-app"
            }
        }

        // ---------------- DOCKER PUSH ----------------
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKER_CREDENTIAL,
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh "echo \$PASS | docker login -u \$USER --password-stdin"
                }

                sh "docker push ${BACKEND_IMAGE}:${TAG}"
                sh "docker push ${FRONTEND_IMAGE}:${TAG}"
            }
        }

        // ---------------- TEST WITH DOCKER COMPOSE ----------------
        stage('Integration Test (Compose)') {
            steps {
                sh "docker-compose -f docker-compose.dev.yml up -d"
                sh "sleep 15"
                sh "curl -f http://localhost:8080/api/health"
            }
        }

        // ---------------- SONAR ----------------
        stage('SonarQube Analysis') {
            steps {
                dir('backend/my-app') {
                    sh """
                    mvn sonar:sonar \
                      -Dsonar.host.url=http://localhost:9000 \
                      -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }
    }

    post {
        always {
            sh "docker-compose -f docker-compose.dev.yml down || true"
            sh "docker image prune -f"
        }

        success {
            echo "🚀 SUCCESS: Pipeline completed"
        }

        failure {
            echo "❌ FAILURE: Pipeline failed"
        }
    }
}