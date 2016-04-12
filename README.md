**About Opine:**

Opine is my first 100% original full-stack project (not done as part of a course or tutorial). It was built with the MERN (MongoDB, Express.js, ReactJS, and Node.js) stack. It is a proof-of-concept deal, and not a production project.

I have used Redux to handle trickier parts of the application state, and React-Router to serve content client-side. All MongoDB data is retrieved by AJAX requests to the server, handled in Express and passed along in JSON format.

All passwords are stored securely with bcrypt, an old encryption method that remains very powerful. Session is maintained securely with Mozilla's "client-sessions" encryption. Security is not perfect, but it is sufficient for an application that lacks any sensitive data.

Users can do one of two things on Opine: 

1. Solicit opinions. Do you have a radio show, a blog, a YouTube video, or even a personal question that you'd like to receive some comment on? Post your opinion request on Opine for the world to see.

2. Browse the opinion-seeking posts on the site and answer their questions if you are so inclined.

Internet commenters get a bad rap, but Opine provides an opportunity for them to redeem themselves. It's a friendly ear for opinionated loudmouths!

The app has been deployed with Heroku and runs a cron job daily to remove old posts, defined as being more than 24 hours past their response deadline.

I'll revisit this project, especially if my job hunt goes poorly, to better demonstrate my skills.

**Future to-do list:**

1. Enable password resetting via email
2. Enable nested comment threads
2. Add web socket functionality, integrated with Redux, to load new questions and comments without having to refresh
3. Comprehensive security testing (sanitization, etc).

