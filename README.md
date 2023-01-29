# CSC 317 Course Project
This project was crafted for the Fall 2022 semester at San Francisco State University's CSC 317 - Intro to Web Development Class by Professor Anthony Souza. 
This is an image hosting website.
You can create a new user account, login, logout, post pictures, view pictures, and comment on them!
There is a sql database that was made for this project under 
    application >> conf >> csc317.sql
if you would like to follow along and see how your progress is going!

This is my first website project, so if you have any questions, comments, or suggestions, please feel free to email me with the information under 'Student Information'.
## Purpose

The purpose of this repository is to store all the code for your web application. This also includes the history of all commits made and who made them. Only code submitted on the master branch will be graded.

Please follow the instructions below and fill in the information requested when prompted.

## Student Information

|               | Information   |
|:-------------:|:-------------:|
| Student Name  | Aleia Natividad    |
| Student ID    | 922439437       |
| Student Email | 922439437@sfsu.edu   |


## Appplications Needed to run this code - Node.js and MySQL
1. Make sure you have Node.js
    For Windows Users:
        1) Go to: https://nodejs.org/en/
        2) Download the LTS version (You can download the current experiemental version if you'd like, but it's not neccessary!)
2. Make sure you have MySQL downloaded (We'll need this to make sure we can open up the website!)
    For Windows Users:
        1) Go to https://dev.mysql.com/downloads/mysql/
        2) Click on 'Go to Download Page'
        3) Download the version that's labeled "mysql-installer-web-community-#####.msi", and it will be the smaller of the two (ex/ 5M vs 431.7M)
        4) Go to 'Custom' when asked what you would like to download
        5) Download the latest Server and Workbench (Workbench is needed to make a new database!)

## Create the database using MySQL
1. In my downloaded code, go to 'application >> conf >> csc317db.sql'
2. Copy the entire code and paste it into your MySQL Workbench Query
3. Click the lightning bolt symbol to execute the code
4. Refresh your schemas and TA DA! 

## Run Instructions
1. Open your favorite code editor
2. With your editor, open the entire folder named 'csc317-code-leileigoose-main'
3. In the code editor terminal, run 'npm install -g nodemon'
4. In the code editor terminal, run 'npm install'
1. Please make sure that in your terminal, you are in the application folder of the downloaded file
    To do so, you can do 
        cd application
2. Once in ther folder, you can type 
        npm start
3. Open your favorite browser, and type in "http://localhost:3000/"
    There will be no pictures on the home page right away, but feel free to make accounts, upload posts, and even comment on them!
    This is all on your own personal computer, so nothing will be saved or posted to the internet :)
    Have fun!
