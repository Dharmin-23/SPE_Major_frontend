pipeline {
     environment{
        dockerimage=""
    }
    agent any
    stages {
        stage('Git clone') {
            steps {
            git branch: 'main',credentialsId:'Github-credentials',url: 'https://github.com/Dharmin-23/SPE_Major_frontend'
            }
        }
        stage('Docker Build Image') {
            steps {
                script{
                    dockerimage=docker.build "dharmin23/swapsie-frontend:latest"   
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script{
                    docker.withRegistry('','DockerHubCred'){
                    dockerimage.push()
                    }
                }
            }
        }

        stage('Ansible pull docker image') {
            steps {
                ansiblePlaybook colorized: true,
                credentialsId: 'shubham',
                disableHostKeyChecking: true,
                inventory: 'inventory',
                playbook: 'ansible-playbook.yml'
            }
        }
      
    }
}