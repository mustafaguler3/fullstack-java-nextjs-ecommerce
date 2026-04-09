pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node20'
    }

    environment {
        DOCKER_COMPOSE = 'docker-compose'
        DOCKER_COMPOSE_DEV = '-f docker-compose.dev.yml'
        DOCKER_IMAGE_BACKEND = 'mustafaguler4/ecommerce-app-backend:latest'
        DOCKER_IMAGE_FRONTEND = 'mustafaguler4/ecommerce-app-frontend:latest'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
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
                        sh "${DOCKER_COMPOSE} ${DOCKER_COMPOSE_DEV} build"
                    }
                }
            }
        }

        stage('Tests (Parallel)') {
            parallel {

                stage('Backend Tests') {
                    steps {
                        sh "docker-compose ${DOCKER_COMPOSE_DEV} run --rm --no-deps backend ./mvnw test"
                    }
                }

                stage('Frontend Build') {
                    steps {
                        sh "docker-compose ${DOCKER_COMPOSE_DEV} run --rm frontend sh -c 'npm ci && npm run build'"
                    }
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${DOCKER_IMAGE_BACKEND}
                    docker push ${DOCKER_IMAGE_FRONTEND}
                    """
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'server-ssh',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {

                    sh """
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SSH_USER@${SERVER_IP} '
                        docker pull ${DOCKER_IMAGE_BACKEND}
                        docker pull ${DOCKER_IMAGE_FRONTEND}
                        docker-compose ${DOCKER_COMPOSE_PROD} down
                        docker-compose ${DOCKER_COMPOSE_PROD} up -d
                    '
                    """
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                for i in {1..10}; do
                    curl -f http://localhost:8080/api/health && exit 0
                    echo "Waiting for backend..."
                    sleep 5
                done
                echo "Health check failed!"
                exit 1
                '''
             }
        }

            stage('Sync to GitLab') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'gitlab-creds', passwordVariable: 'GITLAB_TOKEN', usernameVariable: 'GITLAB_USER')]) {
            sh """
                CURRENT_BRANCH=\$(git rev-parse --abbrev-ref HEAD)
                
                git remote add gitlab https://${GITLAB_USER}:${GITLAB_TOKEN}@gitlab.com/mustafaguler3/fullstack-java-nextjs-ecommerce.git || true
                
                git push gitlab HEAD:refs/heads/\$CURRENT_BRANCH --force
            """
        }
    }
}
}

    post {
        always {
            sh "docker compose ${DOCKER_COMPOSE_DEV} down || true"
            sh "docker image prune -f"
        }

        success {
            echo '🚀 SUCCESS: Deployment completed successfully!'
        }

        failure {
            echo '❌ FAILURE: Check logs!'
        }
    }
}