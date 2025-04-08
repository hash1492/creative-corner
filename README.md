# creative-corner

## Project setup
1. Run
```
npm install
```
2. Create a `.env` file in the project roo and add the following values to it:
```
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_AUTH_DOMAIN=
VUE_APP_FIREBASE_DATABASE_URL=
VUE_APP_FIREBASE_PROJECT_ID=
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=
VUE_APP_FIREBASE_APP_ID=
```
and update the values with the Firebase project config. This can be found in the Firebase Console.

## Run
To run the project, use
```
npm run serve
```

## Build and Deploy
1. Run `npm run build-local` to clean the public folder, generate build, and copy build files to public folder
2. Run `firebase deploy`
