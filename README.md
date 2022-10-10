# CoinNow Backend App

Welcome to the backend of CoinNow, a crypto app that allows users to view CryptoCurrencies and potentially buy them.

The development was solely done by me - Nash Vador. And the project's purpose was meant to showcase my knowledge with backend applications.

I completed this app from June 9, 2022 - October 15, 2022 and I developed this project after work while I was employed as a tester.

# Live Link

Here is the live [link](https://backend-coinnow.herokuapp.com/) to the backend API. Note that most of the endpoints are set up to respond to post requests instead of get requests.

# Why I chose these technologies

- Github Actions for CI/CD - Github Actions is one of my first introductions to the realm of CI/CD. I chose it because it is extremely convenient - you can develop workflows right in the repository.

- TypeScript - As I was using JavaScript in my earlier practice applications, I noticed I was constantly getting TypeErrors that would take hours to fix. Typescript was introduced to prevent these errors before they even occured.

# My struggles and What I learned

- Deployment - Deployment to Heroku was an absolute terror! As I dove deeper into the steps of deployment, I kept on getting a `Module not found: Error: Can't resolve 'fs' in` error. That error sent me down a huge rabbit hole which forced me to add scripts to the package.json file and to remove some scripts. Finally, I discovered that Heroku does not support native TypeScript and I had to create a build step in between for deployment.

- Typescript - Since I had no experience with Object Oriented languages, coming from JavaScript to TypeScript was a huge struggle. Stack Overflow and Google were my best bets when assigning types.
