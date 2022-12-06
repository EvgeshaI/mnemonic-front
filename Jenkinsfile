pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs('node-17.3.0') {
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf /usr/local/var/www/build'
                sh 'cp -R build /usr/local/var/www'
            }
        }
    }
}