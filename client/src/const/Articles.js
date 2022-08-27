//this is a terrible solution but I just want to finish this project I know how to actually make this work

import VS from '../images/VotingSystems.png'
import GVS from '../images/GoodVotingSystem.png'
import SW from '../images/SpoilerWall.png'

//About Us articles
export const METHODOLOGY = "methodology"
export const PROPOSALS = "proposals"


//ID articles
export const VOTING_SYSTEMS = 1
export const GOOD_VOTING_SYSTEM = 2
export const SPOILER_WALL = 3
export const PR_VS_STV = 4
export const CASE_AGAINST = 5

export const ARTICLE_COUNT = 5

export const getArticleCount = () => {
    return ARTICLE_COUNT
}

export const getArticleData = (aID) => {
    switch (aID) {
        case VOTING_SYSTEMS:
            return votingSystemsArticle
        case GOOD_VOTING_SYSTEM:
            return goodVotingSystemArticle
        case SPOILER_WALL:
            return spoilerWallArticle
        case PR_VS_STV:
            return PRvsSTVArticle
        case CASE_AGAINST:
            return CaseAgainstArticle
        default: 
            return {
                title: "404",
                image: VS,
                body: "This article could not be found!"}
    }
}

/*

{
    title:
    image:
    body:
}

*/

export const votingSystemsArticle = {
    title: "Voting Systems",
    image: VS,
    body: "**There are several voting systems that can be modeled using the simulation page on this site. This is a brief overview of them, with little opinionation.** \n" +
    " # **Plurality, or First Past the Post** \n" +
    "This is the system the UK uses. The electorate is divided into small groups by the number of seats in the elected house, in our case, 650 constituencies for 650 seats in the House of Commons. Each constituency has around 70000 eligible voters. In each of these constituencies, polls are held to determine from a list of candidates, the most popular. Whoever receives the most votes wins, and goes to the House of Commons. \n" +
    "# The Alternative Vote \n" +
    "This system is used by Australia. The electorate, like the UK, is divided into small groups, each one contributing one seat. But unlike Plurality, voters can now rank the candidates by order of preference. We then count the number of 1st preferences. If there is no clear winner (no candidate has more than 50% of the votes), then we find the biggest loser, and eliminate them. All votes that candidate has then flows to their next choice. This process repeats until a winner is declared. This system essentially simulates many elections, each new election testing to see what would have happened if a losing candidate didn’t run, only being satisfied if a candidate is elected on a majority and not a plurality. This eliminates the “Spoiler Effect”, where 2 similar candidates split the vote between each other, giving the opposing ideologies a better chance of winning. \n" +
    "# Party-List Proportional Representation. \n" +
    "This system is considered a form of Proportional Representation. It is used in many countries in Europe and around the world. The electorate is divided into much bigger regions, or not into any region at all, and each of these regions contribute a number of seats that is proportional to their population (this might not be the case, some regions may be given additional seats to give extra power to less populous regions). For the example here, we’ll assume there is only 1 region, the entirety of the UK, which has 650 seats. Unlike other systems, we don’t vote for candidates, but instead for a party. Seats are not rewarded based on who has the most votes, but instead they receive a number of seats proportional to how many votes they received. For example if Conservatives got 30% of the vote, they’d win 30% of the seats in the House of Commons. Each party has a party-list which determines the order of candidates that will be awarded a seat. So 1 on that list gets the 1st seat, then 2 gets the 2nd, etc… \n \n" +
    "This system is designed to achieve proportional representation above all else. In 2015, UKIP infamously got only 2 seats from 13% of the vote. Under this system, this would never happen, UKIP would have been awarded 13% of the seats, 84. The hope is, the exact sentiment of the electorate determines the composition of the House of Commons, rather then who’s most popular in divided areas. This system also avoided Gerrymandering. \n" +    
    "# The Single Transferrable Vote. \n" +
    "This system is considered a form of Proportional Representation. This system is used in the Republic of Ireland, and is the recommended system by the Electoral Reform Society(link here). This system works very similar to AV, but instead of 1 winner per constituency, we have several. We’ll assume 5 for this example, and also its a nice number for 650. This gives us 130 constituencies in ideal circumstances. \n \n" +
    "So instead of a winner needing to achieve a majority, they simply need to get 1/5th of the votes. If a candidate reaches this threshold, they win a seat! But their excess votes are not lost, they instead transfer to those voters’ next choices. How this is done depends, but in Ireland, they check all the next choices and flow the votes in proportion. (There is some extra stuff for votes that have this happen with additional flows but we’re gonna keep this simple). The votes that resulted in the victory of that candidate stay with that candidate, ensuring that no vote has a greater value than any other. And just like AV, if there is no clear winner that has 20% of the vote, then they’re eliminated and those votes flow to other choices. These rounds repeat, until 5 clear winners are picked. \n \n" +
    "This system is essentially a hybrid of Proportional Representation and AV, combining the proportional awarding of seats, and the ranked choice of AV. There’s a few reasons why you might consider this system over Party List Proportional Representation, and this is discussed in [this opinionated article.](PUT LINK HERE) \n"
}

export const goodVotingSystemArticle = {
    title: "What makes a good Voting System?",
    image: GVS,
    body: "EMPTY"
}

export const spoilerWallArticle = {
    title: "The Spoiler Wall",
    image: SW,
    body: "EMPTY"
}

export const PRvsSTVArticle = {
    title: "Party List Versus the Single Transferrable Vote",
    image: VS,
    body: "EMPTY"
}

export const CaseAgainstArticle = {
    title: "The Case against Electoral Reforms",
    image: VS,
    body: "EMPTY"
}