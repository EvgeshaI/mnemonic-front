pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install && npm run build'
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