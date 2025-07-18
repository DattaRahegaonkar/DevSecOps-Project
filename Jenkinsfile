pipeline {
    agent any
    environment{
        SONAR_HOME = tool "Sonar"
    }

    stages {
        stage("Code Clone From Github") {
            steps {
                git url: "https://github.com/DattaRahegaonkar/Climate-Cast.git", branch: "main"
            }
        }
        stage("Sonarqube Code Quality Analysis") {
            steps {
                withSonarQubeEnv("Sonar") {
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=Climate-Cast-App -Dsonar.projectKey=Climate-Cast-App"
                }
            }
        }
        stage("OWASP Dependency Cheack") {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage("Trivy File System Scan") {
            steps {
                sh "trivy fs . --format table -o trivy-fs-report-.html"
            }
        }
        stage("Trivy Docker Image Scan") {
            steps {
                sh 'docker build -t climate-app .'
                sh 'trivy image climate-app --format table -o trivy-image-report.html || true'
            }
        }
        stage("Deploy Using Docker Compose") {
            steps {
                sh "docker rm -f climate-app || true"
                sh "docker-compose up -d"
            }
        }
    }
}