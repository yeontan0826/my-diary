# my-diary
Firebase를 활용한 간단한 다이어리

<br>

|Google 로그인|다이어리 추가|비밀번호 설정|
|:----------------:|:----------------:|:----------------:|
|![googleLogin](https://github.com/yeontan0826/my-diary/blob/master/assets/screenshots/google_login.gif)|![addDiary](https://github.com/yeontan0826/my-diary/blob/master/assets/screenshots/add_diary.gif)|![addPassword](https://github.com/yeontan0826/my-diary/blob/master/assets/screenshots/add_password.gif)|

<br>

<hr>

### 사용방법

[Firebase](https://firebase.google.com/?hl=ko)에 접속하여 프로젝트를 생성합니다.

<br>

**Authentication**과 **Storage**를 설정하고 `google-services.json`과 `GoogleService-Info.plist` 파일을 다운받습니다.

다운받은 파일을 프로젝트 최상단 폴더에 넣어줍니다.

<br>

> 패키지명이 `com.mydiary`이 아닌 다른 패키지명이라면 아래와 같이 수정해줍니다.

`app.json`
```
{
  "expo": {
    ...,
    "ios": {
      ...,
      "bundleIdentifier": "com.mydiary"  // 수정할 부분(iOS 번들명)
    },
    "android": {
      ...,
      "package": "com.mydiary"  // 수정할 부분(AOS 패키지명)
    },
    ...
  }
}
```

<br>

`expo prebuild`를 os 파일들을 생성해줍니다.

<br>

그 후, `expo run:ios` 또는 `expo run:android`를 통해 앱을 빌드합니다.
