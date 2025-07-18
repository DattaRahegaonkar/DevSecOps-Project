# Trivy Vulnerability Scanner in Jenkins Pipeline

Trivy is a simple and comprehensive vulnerability scanner for:
OS packages
Application dependencies
Container images
File systems

Trivy is widely used in DevSecOps pipelines to catch known CVEs before deployment.

### Install Trivy

```
### Install dependencies
sudo apt-get install wget apt-transport-https gnupg lsb-release -y

### Add Trivy's GPG key securely
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | \
  gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null

### Add Trivy's APT repository using signed key
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb \
$(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list > /dev/null

sudo apt-get update

sudo apt-get install trivy -y

trivy --version
```

### File System Scan

```
trivy fs . --format table -o trivy-fs-report.html
```

### Docker Image Scan

```
trivy image climate-app --format table -o trivy-image-report.html
```


### Syntax

```
 stages {
    stage("Trivy File System Scan") {
        steps {
            sh 'trivy fs . --format table -o trivy-fs-report.html || true'
        }
    }

    stage("Trivy Docker Image Scan") {
        steps {
            sh 'docker build -t climate-app .'
            sh 'trivy image climate-app --format table -o trivy-image-report.html || true'
        }
    }
}
```