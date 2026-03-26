# Backend - npm run dev
- npm init -y
- npm i express@4.21.2 mongoose@8.10.1 jsonwebtoken@9.0.2 bcryptjs@2.4.3


 ``` express to define routes like /login, /register, /messages
 mongoose to model users and messages in MongoDB
 jsonwebtoken to issue tokens after login and protect private routes
 bcryptjs to hash passwords before storing them
``` 
- npm i dotenv@16.4.7 cookie-parser@1.4.7
```
Use dotenv to store secrets like JWT_SECRET, DB_URI, or PORT

Use cookie-parser to read JWTs or session tokens stored in cookies for    user authentication
```

- npm i nodemon -D

-npm i cors




# Frontend

=> npm create vite@latest .
=> npm run bulid
=>
=>npm install -D tailwindcss@3 postcss autoprefixer
    npx tailwindcss init

=>https://daisyui.com/ -Tailwind CSS development
=>npm i -D daisyui@4.12.24
=>npm i react-router
=>npm install axios

=>npm install zustand - a small, fast, and scalable state management library for React

=>npm i lucide-react
=>npm i react-hot-toast -used for a notification like save,error in screen
=>
=>
=>
=>
=>


# chtify-app

- npm init -y

- npm run build

- feature: double-click any shared chat image to open a fullscreen preview


# mongodb - database
-https://cloud.mongodb.com/

testing - 
- postman


email-
https://resend.com/emails

-under backend
npm install resend


updateProfile:-
-https://console.cloudinary.com/ 
<p> Cloudinary is a powerful media management service that helps you handle image and video uploads, transformations, optimizations, and delivery. Here are some common use cases, especially relevant for full-stack apps like the real-time chat app<p>

- npm i cloudinary

<h6>Rate limiting helps with</h6>
<p>
    . Preventing abuse (e.g., stopping someone from making 1000 login   attempts in a minute)
    .Protecting servers from getting overwhelmed
    . status code 429 for too many requests
<p>

https://app.arcjet.com/  - for rate limiting
- npm i @arcjet/node @arcjet/inspect


# socket.io
## what is socket.io ?
.Socket.io is a powerful real-time communcation library for web applications.
.it enables instant, bi-directional communication between web clients and servers.
.it allows data to be pushed to client in real-time , without the need for the client to request it.

## why socket.io ?

. Simplifies building a real-time application.
. it handles complex networking issues behind the scenes.
. which allows developers to focus on building features rather than managing low-level communication protocols.

## application of socket.io
. chat app
. real time dashboards
. collaborative tools
. games


backend:- 
. npm i socket.io

frontend:-
. npm i socket.io-client

