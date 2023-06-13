# BooKaro
<a name = "readme-top"></a>
### Contributors
* <a href = "https://github.com/siddiki002">Ammar Siddiqui</a>
* <a href = "https://github.com/AE186">Saad Imran</a>

### Introduction

BooKaro is an online ticket booking application. The application currently handles tickets of Buses and Cricket matches. It is scalable and will be scaled to handle multiple forms of tickets.

### Tech stack
* <img src = "https://img.shields.io/badge/-JS-lemon?logo=javascript&style=for-the-badge" />
* <img src = "https://img.shields.io/badge/-React-white?logo=react&style=for-the-badge" />
* <img src = "https://img.shields.io/badge/-Node-white?logo=nodedotjs&style=for-the-badge" />
* <img src = "https://img.shields.io/badge/-Express-black?logo=express&style=for-the-badge" />
* <img src = "https://img.shields.io/badge/-MongoDB-black?logo=mongodb&style=for-the-badge" />
* <img src = "https://img.shields.io/badge/-Selenium-black?logo=selenium&style=for-the-badge" />
<p align = "right"><a href = "#readme-top">Back to top</a></p>

### Getting started

In order to run this project you need to have following installed in your local machine

#### Pre-requisites

* Node Package Manager (npm) ( _could be installed by clicking <a href = "https://nodejs.org/en/download" >here</a> )_

#### Installation and Working
1. Fork the repository
2. open the server folder in the terminal/powershell/command prompt and write <br>
  ```
  npm install
  ```
3. Do the same with client 
4. open server folder and run the index.js file by executing following command <br>
  ```
  node index.js
  ```
  This will run the server <br>
5. Do the same with client by opening client folder in a different window and executing the following command
  ```
  npm start
  ```
Following above steps you could easily run the application
<p align = "right"><a href = "#readme-top">Back to top</a></p>

#### Database Connection
The database used in this application is MongoDB. To connect the database you need to follow following steps
1. Go to <a href = "https://www.mongodb.com/atlas/database">MongoDB atlas</a> and create an account
2. Create a .env file in server folder. You can easily create it by making an empty notepad file and click _Save as_ option. For saving use the name **.env** and it will create .env file
3. Inside the file write following lines of code 
```
MongoDB_Key = mongodb+srv://user_name:password@collection_name.xkiebui.mongodb.net/collection_name?retryWrites=true&w=majority
EMAIL = your_email
PASSWORD = your_password
```
Here the MongoDB_Key is the link you will get by the MongoDB atlas. **Email** is the email you are willing to use to send authorization emails and **Password** is the password of your email account so that the <a href = "https://nodemailer.com/about/">Node mailer</a> could login to the account.
