**About Opine:**

Opine is my first 100% independent project (not done as an assignment for a course or tutorial). It was built with the MERN (MongoDB, Express.js, ReactJS, and Node.js) stack. It is a proof-of-concept deal, and not a production project.

Users can do one of two things on Opine: 

1. Solicit opinions. Do you have a radio show, a blog, a YouTube video, or even a personal question that you'd like to receive some comment on? Post your opinion request on Opine for the world to see.

2. Browse the opinion-seeking posts on the site and answer their questions if you are so inclined.

Internet commenters get a bad rap, but Opine provides an opportunity for them to redeem themselves. It's a friendly ear for opinionated loudmouths!

The app has been deployed with Heroku and runs a cron job daily to remove old posts, defined as being more than 24 hours past their response deadline.

**Current to-do list:**
1. Refactor to use ReactRouter at the server, using browserHistory instead of hashHistory. hashHistory is the reason that the URLs are janky.

2. Refactor to use the Flux pattern for managing application state. Redux seems like the trendy choice.

