pipeline {
  agent any
  stages {
    stage('git clone') {
      steps {
        git(url: 'http://127.0.0.1:8888/s.hosseini/arz2arz-user-panel.git', branch: 'master', changelog: true, poll: true)
      }
    }

  }
}