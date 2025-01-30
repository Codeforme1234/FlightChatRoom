# Acko Clinic App 

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
2. Intsall expo cli

   ```bash
   npm install -g expo-cli
   ```
3. you check installation using

   ```bash 
   expo --version
   ```

4. you can run the app in web, ios, anroid using the flag which shows after installing the app.

5. Start the app

   ```bash
    npx expo start
   ```

6. Run the app in expo client -> 
  1. download expo client application using playstore for android and app store for ios. 
  2. if your phone and laptop is on same wifi then you can simply scan the QR shown after running the app using expo scanner shown in expo app. 
  3. if phone and laptop is not on same wifi then we need to install open vpn
     1. point open vpn to your ip using the ackodev or ackoprod vpn using the link <a link="https://vpn-staging.acko.in/login">https://vpn-staging.acko.in/login</a>
     2. login and click "show more" and download profile zip file 
     3. share the extraced file to phone and import in open vpn 
     4. create account and login and use the authenticator for code (code should be added for the vpn profile which you downloaded)
  4. In the expo app select "Enter URL manually" enter -> exp://192.168.239.___:8081 the last 3 number will be the ip address of vpn connected to. 
  
7. Code changes: 
   1. open app/useChat.tsx line 34 update the current ip address to the vpn ip address. 
   2. open lib/socket-io.ts line 2 update the current ip address to the vpn ip address.

8. Now we will be able to access backend from app running on mobile



