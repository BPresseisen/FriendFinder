# findYour1
  
This is a 10 question survey to demonstrate the interoperability between node.JS and express servers. The survey is geared towards users finding their one (1). The person for them. All of the data in the survey is test data. 
  
It was important to build, test, and deploy a Minimum Viable Product (MVP) and that is what is released in this first version.

After a new user enters their responses in the survey, the data file, findYour1.js is evaluated to determine the perfect match from among the existing users in the application.
  
The survey contains 10 questions with an answer scoring range 1-5. Each existing user's answers are compared to the answers from the new user. Per question/answer choice differences are tabulated between existing users and the new user. 
  
These differences are summed and the lowest-difference is presented in name and photo as the new user's match: Your 1 Found!
  

## Deployment

Git clone the files to a local directory of your choice. Make sure to run the npm installations!

Find Your 1 is also deployed in Heroku and can be reached via this link: https://findyour1.herokuapp.com/

## Built With

* [node.js](https://nodejs.org/en/) 
* [express](https://www.npmjs.com/package/express) - web server
* [path](https://www.npmjs.com/package/path) - routing tool
* [heroku](https://www.heroku.com/home) - hosting service
  
## Authors

* **Ben Presseisen** - *Initial work* - [Precise Insights](https://bpresseisen.github.io/Bootstrap-Portfolio/)
