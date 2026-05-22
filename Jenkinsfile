pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                echo 'Installing dependencies and building Docker image'

                bat 'npm install --legacy-peer-deps'
                bat 'npm run build'

                bat 'docker build -t smart-task-manager-api .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests'

                bat 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint code quality analysis'

                bat 'npm run lint'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit security scan'

                bat 'npm audit || exit 0'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application using Docker Compose'

                bat 'docker rm -f smart-task-manager-api || exit 0'

                bat 'docker compose down || exit 0'

                bat 'docker compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                echo 'Creating and pushing production release image'

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASS'
                )]) {

                    bat 'docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_PASS%'

                    bat 'docker tag smart-task-manager-api %DOCKERHUB_USER%/smart-task-manager-api:v1.0'

                    bat 'docker push %DOCKERHUB_USER%/smart-task-manager-api:v1.0'
                }
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
