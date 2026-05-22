pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'npm install --legacy-peer-deps'
                bat 'npm run build'
                bat 'docker build -t smart-task-manager-api .'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Security') {
            steps {
                bat 'npm audit'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application using Docker Compose'
                bat 'docker compose down || exit 0'
                bat 'docker compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                echo 'Creating production release image'
                bat 'docker tag smart-task-manager-api smart-task-manager-api:v1.0'
                bat 'docker tag smart-task-manager-api railey1031/smart-task-manager-api:v1.0'
                bat 'docker push railey1031/smart-task-manager-api:v1.0'
                bat 'docker images smart-task-manager-api'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking deployed application health endpoint'
                bat 'curl http://localhost:3000/health'

                echo 'Checking Docker container status'
                bat 'docker ps'

                echo 'New Relic APM monitoring enabled for Smart Task Manager API'
            }
        }
    }
}
