pipeline {
  agent any

  environment {
    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
    PATH = "${env.HOME}/.local/bin:${env.PATH}"
  }

  stages {
    stage('Semgrep-Scan') {
      steps {
        sh 'pip3 install semgrep --break-system-packages'
        sh 'semgrep ci'
      }
    }
  }
}