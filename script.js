

//05/28/2024 - I opened my code editor and have completed my task for the day

// 06/08/24 - will try to use Octokit without api key to see if it works. If not, will regenerate key

// 06-15-2024: will learn API calls and use octokit to retrieve user from github
// follow this link: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user

//06-19-2024: Learned some more: https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/main/docs/users/getByUsername.md

// 06/21 - I tried running the code a few days ago with no api key, but that didn't work, so I will need the api key. I tried running just `script.js` using node, but it didn't like how I imported Octokit and App, so I will need to run it on the web. I am worried my key will be compromised, but it is only running on my local host, so no one will see it, unless they hacked my computer. And even then, I can just generate a new key.

//06-21-2024: API call works, but can't get data to populate properly. Will have to debug tomorrow

//-6-26-2024 API call works, and I can extract data now. Next I will start using Jest, then refactor code

//07/19/2024 Didn't add any code, but created a new file for updateUI testing and learned how I can test HTML changes via Jest: https://dev.to/snowleo208/things-i-learned-after-writing-tests-for-js-and-html-page-4lja#:~:text=I%20found%20most%20tutorials%20are,Yes!

// 08/05/2024 Finally coding again! I added a route in api.js, but trying to figure out how to use it in this file. Also, my token expired which was why my code wasn't working before. I regenerated it, so it will last til September 4th 2024. Will code again tomorrow! Great job Winona!!!

/*
08/06/2024: We are going to follow this formula:
- Write code that doesn't work for a task you want to do
- See if it works, and if not, see why it doesn't work
- Stop when you want to

Today, I want to write failing code for one task:
- Calling my api in the api.js file in my script.js file
*/

/*
08/07/2024: I experimented with the .env folder with environmental variables and learned about middleman API from Chris Ferdinandi! Yay!
*/

/**
 * 08/08/2024:
 * Used Lean Web Club and spent over an hour learning about CloudFlare and Serverless functions. I learned how to make an example API and I'm testing my example API here.
 * 
 * - Ran into an issue where even though I added my environmental variable on CloudFlare, I can't use it in my code, which is strange. Will have to ask Chris for help again
 */

/**
 * 08/12/2024:
 * Today was amazing!!! I figured out my issue with the env variables on Cloudflare, configured the restricted domain correctly, and now my middleman API works!! And I don't need to save my env variable in my client facing code anymore!! Yes yes yes yes yes!!!!!
 * 
 * Will want to clean up my Cloudflare API to be structured better and handle all kinds of requests, and then can push the project to Github!!! Yay!!
 */

/**
 * 08/15/2024:
 * Edited API I made on Cloudflare so that I can only access the API from a particular domain, and that is it!! The error message is not what I like, but we will improve my code tomorrow!
 */

/**
 * 08/16/2024:
 * Added JSDoc strings in order to make this file make more sense.
 */



//Is there a better way to group these commands together? We can see what is standards compliant, best practice, and clean
const avatarEl = document.getElementById("avatar")
const webPageLinkEl = document.getElementById("webpage")
const nameEl = document.getElementById("name")
const usernameEl = document.getElementById("username")
const bioEl = document.getElementById("bio")
const repoNumEl = document.getElementById("repo-num")
const followerNumEl = document.getElementById("follower-num")
const followingNumEl = document.getElementById("following-num")

//Should put this with the HTML commands. Basically, categorizes all the necessary info for a User into a profile. To be standards compliant, I can make a UserProfile interface so that the type is a User Profile. Is that a thing in Javascript?

/** Class representing a user profile 
*/
class Profile{

    /**
     * 
     * @param {String} avatar - link to user's profile picture
     * @param {String} webpage - link to user's github page
     * @param {String} name - name of user
     * @param {String} username - username of user
     * @param {String} bio - short bio of the user
     * @param {Number} repo - user's number of repos
     * @param {Number} followers - user's number of followers
     * @param {Number} following - user's number of followed repos
     */
    constructor(avatar, webpage, name, username, bio, repo, followers, following){
        this.avatar = avatar
        this.webpage = webpage
        this.name = name
        this.username = username
        this.bio = bio
        this.repo = repo
        this.followers = followers
        this.following = following
    }

    /**
     * Print out details of user profile
     * @return 
     */
    printProfile(){
        console.log(`
        Avatar: ${this.avatar}
        URL = ${this.webpage}
        Name: ${this.name}
        Username: ${this.username}
        Bio: ${this.bio}
        Number of Repos: ${this.repo}
        Number of Followers: ${this.followers}
        Number Following: ${this.following}
        `)
    }
}


//Is it possible to condense this, like I want to do with the HTML commands?
//We can look that up

/**
 * Updates the webpage with the current searched user's profile
 * @param {*} userProfile 
 */
function updateUI(userProfile){
    avatarEl.src = userProfile.avatar
    webPageLinkEl.href = userProfile.webpage
    nameEl.textContent = userProfile.name
    usernameEl.textContent = "@"+userProfile.username
    bioEl.textContent = userProfile.bio
    repoNumEl.textContent = userProfile.repo
    followerNumEl.textContent = userProfile.followers
    followingNumEl.textContent = userProfile.following
}

/**
 * Fetches user profile info from Github in order to update the UI
 * @param {String} username 
 */
async function retrieveUser(username){
    fetch(`https://github-middleman-api.wviolinm.workers.dev?username=${username}`)
.then(function (response){
    if (response.ok){
        return response.json()
    }
    throw `Something went wrong: Status Code ${response.status}`
}).then(function (data){
    console.log("Console:", data)
    console.log("Console:", data.name)
    console.log("Console:", data.login)
    console.log("Console:", data.followers)
    console.log("Console:", data.following)
    const currentProfile = new Profile(data.avatar_url, data.html_url, data.name, data.login, data.bio, data.public_repos, data.followers, data.following)
    currentProfile.printProfile()
    updateUI(currentProfile)
}).catch(function (err){
    console.warn(err)
})

}

retrieveUser("wmurphy-collabstar")


export {Profile, updateUI}