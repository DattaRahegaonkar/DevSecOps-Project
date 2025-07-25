
# SonarQube

SonarQube is an open-source platform used to continuously inspect the quality, security, and maintainability of source code. It helps developers and teams identify bugs, vulnerabilities, code smells, and technical debt early in the development lifecycle.

With its rich dashboards and customizable quality gates, SonarQube enables teams to maintain high code quality, reduce risks, and ship secure, maintainable applications.

To use SonarQube with Jenkins in your DevSecOps pipeline, you need to install and configure SonarQube on your local machine or server.

## Prerequisites

- Java 17 installed
- At least 2 GB RAM
- Linux or Windows system

1. Install Java

```
sudo apt update
sudo apt install openjdk-17-jdk -y
java -version
```

2. Download and Extract SonarQube

```
cd ~ wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.4.1.88267.zip
unzip sonarqube-10.4.1.88267.zip
mv sonarqube-10.4.1.88267 sonarqube
```

3. Start SonarQube

```
cd ~/sonarqube/bin/linux-x86-64
./sonar.sh start
./sonar.sh status
```

4. Visit

```
http://localhost:9000
```

## SonarQube With Jenkins

1. Login
Default credentials:
```
Username: admin
Password: admin
```

2: Generate Token

```
Go to "My Account" ---> "Security" ---> "Generate Tokens"
give a name like jenkins-token.
Click Generate.
Copy the token immediately
```


3: Add SonarQube to Jenkins

```
Go to Manage Jenkins ---> Configure System ---> SonarQube Server ---> Add SonarQube
Name: Sonar
Server URL: http://localhost:9000
Server Authentication Token ---> Add 
Select "Secret text"
Paste the token that generated above
Give it Unique ID
```

## Add SonarQube Scanner in Jenkins

```
Go to Manage Jenkins → Global Tool Configuration
Under SonarQube Scanner, click Add SonarQube Scanner

Name: Sonar
Set installation path
```

## Webhook (for Quality Gate status)

```
To enable waitForQualityGate():
In SonarQube, go to:
Administration → Configuration → Webhooks

Click Create
Name: jenkins
URL: http://<jenkins-url>/sonarqube-webhook/

Save
```


### In JenkinsFile

```
withSonarQubeEnv('Sonar') {
    // sonar-scanner command
}
```

