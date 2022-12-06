pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs('node-17.3.0') {
                    sh 'npm install && CI=false npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf www/build'
                sh 'cp -R build /www'
            }
        }
    }
}