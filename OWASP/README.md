# OWASP Dependency-Check (Jenkins Plugin Integration)

OWASP Dependency-Check is a tool that identifies known vulnerabilities (CVEs) in project dependencies. When used in a Jenkins DevSecOps pipeline, it enables automatic vulnerability scanning during CI/CD.


## Jenkins Plugin Setup

1. Install the Plugin

```
Go to:
Jenkins → Manage Jenkins → Plugin Manager → Available
Search: OWASP Dependency-Check Plugin
Install and restart Jenkins
```


2. Configure the Dependency-Check Tool

```
Go to:
Jenkins → Manage Jenkins → Global Tool Configuration
Scroll to Dependency-Check
Click Add Dependency-Check
Name: OWASP
Check Install automatically
Save configuration.
```

3. Syntax

```
stages {
    stage("OWASP Dependency Check") {
        steps {
            dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP'
            dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
        }
    }
}
```

