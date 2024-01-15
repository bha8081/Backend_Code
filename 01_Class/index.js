require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;

const githubData = {
    "login": "bhavesh",
    "id": 9551,
    "node_id": "MDQ6VXNlcjk1NTE=",
    "avatar_url": "https://avatars.githubusercontent.com/u/9551?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/bhavesh",
    "html_url": "https://github.com/bhavesh",
    "followers_url": "https://api.github.com/users/bhavesh/followers",
    "following_url": "https://api.github.com/users/bhavesh/following{/other_user}",
    "gists_url": "https://api.github.com/users/bhavesh/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/bhavesh/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/bhavesh/subscriptions",
    "organizations_url": "https://api.github.com/users/bhavesh/orgs",
    "repos_url": "https://api.github.com/users/bhavesh/repos",
    "events_url": "https://api.github.com/users/bhavesh/events{/privacy}",
    "received_events_url": "https://api.github.com/users/bhavesh/received_events",
    "type": "User",
    "site_admin": false,
    "name": null,
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 6,
    "public_gists": 0,
    "followers": 4,
    "following": 4,
    "created_at": "2008-05-07T05:56:25Z",
    "updated_at": "2022-09-06T10:59:06Z"
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/youtube', (req, res) => {
    res.send('Welcome to Youtube')
});

app.get('/facebook', (req, res) => {
    res.send('This is FB page!!')
});

app.get('/about', (req, res) => {
    res.send('<h1>This is the About Page!!</h1>')
});

app.get('/github', (req, res) => {
    res.json(githubData)
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${port}`)
});