/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'

import {Profile} from "../script.js"

describe("Profile class", () => {
    const avatar = "avatar"
    const webpage = "https://www.yayme.com"
    const name = "Cool Person"
    const username = "cool-person"
    const bio = "I am very cool"
    const repo = 4
    const followers = 20
    const following = 100


    const profile = new Profile(avatar, webpage, name, username, bio, repo, followers, following)

    test("define printProfile() type", () => {
        expect(typeof profile.printProfile).toBe("function")
    })

    test("define Profile attributes' types", () => {
        expect(typeof profile.avatar).toBe("string")
        expect(typeof profile.webpage).toBe("string")
        expect(typeof profile.name).toBe("string")
        expect(typeof profile.username).toBe("string")
        expect(typeof profile.bio).toBe("string")
        expect(typeof profile.repo).toBe("number")
        expect(typeof profile.followers).toBe("number")
        expect(typeof profile.following).toBe("number")
    })

    test("printProfile() is called with example object", () => {
        const printProfileSpy = jest.spyOn(profile, "printProfile")

        const result = profile.printProfile()

        expect(result).toBeUndefined()

        expect(printProfileSpy).toHaveBeenCalledTimes(1)
        printProfileSpy.mockClear()
    })

    test("printProfile() outputs the expected result", () => {
        const logSpy = jest.spyOn(global.console, "log")

        profile.printProfile()

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledTimes(1)

        expect(logSpy).toHaveBeenCalledWith(`
        Avatar: ${profile.avatar}
        URL = ${profile.webpage}
        Name: ${profile.name}
        Username: ${profile.username}
        Bio: ${profile.bio}
        Number of Repos: ${profile.repo}
        Number of Followers: ${profile.followers}
        Number Following: ${profile.following}
        `)
        expect(logSpy.mock.calls).toContainEqual([`
        Avatar: avatar
        URL = https://www.yayme.com
        Name: Cool Person
        Username: cool-person
        Bio: I am very cool
        Number of Repos: 4
        Number of Followers: 20
        Number Following: 100
        `])


        logSpy.mockRestore()
    })


})