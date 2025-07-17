pipeline {
    agent any
    
    stages {
        stage("Code Cloning") {
            steps {
                git branch: 'main', url: 'https://github.com/DattaRahegaonkar/Climate-Cast.git'
            }
        }
        
        stage("Build Image") {
            steps {
                sh 'docker build -t climate-cast-image .'
            }
        }
        
        stage("Pushing the Image on Docker Hub Repository") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "docker-hub-cred",
                    usernameVariable: "docker_hub_user",
                    passwordVariable: "docker_hub_password"
                    )]) {
                        sh "docker login -u ${docker_hub_user} -p ${docker_hub_password}"
                        sh "docker tag climate-cast-image ${docker_hub_user}/climate-cast-image"
                        sh "docker push ${docker_hub_user}/climate-cast-image"
                    }
            }
        }
        
        stage("Deploying the Application") {
            steps {
                sh "docker-compose up -d"
            }
        }
    }
}
