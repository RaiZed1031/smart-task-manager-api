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
                bat 'docker rm -f smart-task-manager-api || exit 0'
                bat 'docker run -d -p 3000:3000 --name smart-task-manager-api smart-task-manager-api'
            }
        }

        stage('Release') {
            steps {
                bat 'docker tag smart-task-manager-api smart-task-manager-api:v1.0'
            }
        }

        stage('Monitoring') {
            steps {
                bat 'curl http://localhost:3000/health'
            }
        }
    }
}
