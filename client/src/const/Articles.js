import {Grid, Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import { Link } from "react-router-dom";

//this is a terrible solution but I just want to finish this project I know how to actually make this work

import VS from '../images/VotingSystems.png'
import GVS from '../images/GoodVotingSystem.png'
import SW from '../images/SpoilerWall.png'
import PRvsSTV from '../images/STV vs PR.png'
import TCA from '../images/TheCaseAgainst.png'
import M from '../images/Methodology.png'
import P from '../images/Proposals.png'

//About Us articles
export const METHODOLOGY = "methodology"
export const PROPOSALS = "proposals"


//ID articles
export const VOTING_SYSTEMS = "1"
export const GOOD_VOTING_SYSTEM = "2"
export const SPOILER_WALL = "3"
export const PR_VS_STV = "4"
export const CASE_AGAINST = "5"

export const ARTICLE_COUNT = 5

export const generateArticlePreview = (articleData, classes, id) => {

    var articleComponent = null
    try {
        articleComponent = (
            <Grid key= {articleData.title} item md={4} xs={6}>
                <Card className={classes.smallCard}>
                    <CardActionArea component={Link} to={`/articles/${id}`} >
                        <CardMedia className={classes.media} image={articleData.image} title={articleData.title} />
                        <CardContent backgroundColor="red" >
                            <Typography align="center" variant="h5">{articleData.title}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
    catch {
        articleData = getArticleData("ERROR")
        articleComponent = (
            <Grid item md={4} xs={12}>
                <Card className={classes.smallCard}>
                    <CardActionArea component={Link} to={`/articles/${id}`} >
                        <CardMedia className={classes.media} image={articleData.image} title={articleData.title} />
                        <CardContent backgroundColor="red" >
                            <Typography align="center" variant="h5">{articleData.title}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
    return articleComponent
}

export const getArticleCount = () => {
    return ARTICLE_COUNT
}

export const getArticleData = (aID) => {
    if (typeof(aID) == "number") {
        aID = `${aID}`
    }
    
    switch (aID) {
        case VOTING_SYSTEMS:
            return votingSystemsArticle
        case  GOOD_VOTING_SYSTEM:
            return goodVotingSystemArticle
        case SPOILER_WALL:
            return spoilerWallArticle
        case PR_VS_STV:
            return PRvsSTVArticle
        case CASE_AGAINST:
            return CaseAgainstArticle
        case METHODOLOGY:
            return MethodologyArticle
        case PROPOSALS:
            return ProposalsArticle
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
    title: "What's a good Voting System?",
    image: GVS,
    body: "So this website is very clearly biased against the First Past the Post system. So instead of just raging blindly about how the system sucks, let’s actually define what a good electoral system is, by looking at the problems and strengths of the First Past the Post system."
    +
    "\n \n Firstly, voters in the First Past the Post system are reduced to “tactical voting”, where the average voter votes to keep someone they don’t like out. This is a strong weakness of the system, as it essentially forces compromise onto the voters, even though the purpose of a democracy is to give the overall group sentiment to direct the ship. This system instead states that there are 2 rigid options. Left or Right. Oh but sometimes its right ahead or to the right, or maybe to the left and to the far left. You don’t decide the bearings, you just get two options and must pick. The point is that a system should force the compromise onto the macro scale instead of the micro scale. If a majority of people support a party, then thats fine for them to have absolute control, but otherwise, these parties must negotiate where they want to steer the ship to best represent how the people voted."
    +
    "\n \nSo that’s our first point "
    +
    "\n \n - The voters should have the ability to vote for any party or candidate without worries, and forces the compromise onto the people who make decisions. "
    +
    "\n \n Another issue in the First Past the Post system, and by extension, the Alternative Vote, is that the way people vote don’t seem to have a big sway in the end result of the election. You can read more about why this is in the [Spoiler Wall] article, where different measurements of “sway” are tabled. But the importance here is that a system should ideally give the people the power to sway elections. How much this is done is the main point of contention when it comes to this kind of discussion. How much should the people sway an election? In my opinion, the people should have as much say as possible, and if 1% of people decide “Conservatives aren’t my style”, then 1% of the power the Conservatives have should disappear. Many systems achieve this with “proportionality”, and it’s pretty effective. So ideally, our system should be as close to the “1% loss, 1% defeat” rule as possible."
    +
    "\n \n So that’s the second point."
    +
    "\n \n - The system should let changes in how the people think determine the fate of elections proportionally."
    +
    "\n \n And finally, one of the strengths of the First Past the Post system, which is that there is local representation, that an area’s identity is always represented in some ways. This is an important part of a representative democracy, because with smaller and more numerous constituencies, comes more and more closer links to individual places and micro cultures. In an ideal electoral system, we attempt to preserve the local ties to a politician in westminister, so that everyone feels represented. However, even in First Past the Post, this isn’t entirely preserved. How your particular Conservative MP acts doesn’t matter if Party Whips exist. Unless you vote for an independent, which is very difficult under this system, it’s very likely you’re voting for someone who will vote with their party. Maybe they’ll challenge the internal policies of the party, but it’s not as impactful as an Independent who votes based on their individual beliefs. So instead, we should reangle this focus. Currently, our two big parties mainly campaign in marginal seats, as these are what tend to win elections. Every other constituency tends to get ignored, and therefore, campaign promises that would interest the safe constituencies are less prioritized. By ensuring that a system forces the parties to consider as many different constituencies as possible in their electoral strategy, we make it so they try to benefit the most people in order to win an election."
    +
    "\n \n That’s our final point."
    +
    "\n \n - The system should provide local ties to the national state of politics, and every area should have parties campaigning at them if the parties are relevant to said areas. "
    +
    "\n \n For this, we can quickly rank each of these three categories for different voting systems that can be modeled using the simulation page of this site. These rankings are entirely personal but I’ll attempt to justify them."
    +
    "\n \n First Past the Post" +
    "\n\n A: 1/5"+
    "\n B: 1/5" +
    "\n C: 2/5"
    +
    "\n\nI already picked this apart, so consider it a nice benchmark for further analysis."
    +
    "\n\nAlternative Vote:" +
    "\n\nA: 5/5" +
    "\nB: 2/5" +
    "\nC: 4/5"
    +
    "\n\nThe Alternative Vote was what the United Kingdom nearly settled on in the 2011 referendum. Thankfully, we didn’t do so, as the Alternative Vote is only good for voter choice and ensuring that they don’t have to compromise. The AV system still trends towards two significant parties, because it’s not aiming for proportionality, it’s simply eliminating the Spoiler Effect and that’s all that it's doing. Now this does give a bigger sway to the voters in how representatives are elected, but compared to other systems, it's not much, and is kinda subpar. It also does have a stronger incentive for more campaigning, as it essentially makes more seats `marginal`, so more campaigning needs to be done for a majority, but its still not the best it could be, as many seats are still safe under AV. It’s a direct upgrade to First Past the Post, but it’s not the best option."
    +
    "\n\nParty-List Proportional Representation: Regional (Regions as declared by official government data)" +
    "\n\nA: 4/5" +
    "\nB: 4/5" +
    "\nC: 3/5"
    +
    "\n\nParty-List Proportional Representation: Country" +
    "\n\nA: 4/5" +
    "\nB: 5/5" +
    "\nC: 2/5" 
    +
    "\n\nParty-List Proportional Representation: Nationwide" +
    "\n\nA: 5/5" +
    "\nB: 5/5"  +
    "\nC: 1/5" 
    +
    "\n\nThese are all the same system, the scope of them simply varies. Proportional Representation as a system is where seats within a “constituency” (because that term is doing ALOT of legwork for this) are awarded proportionally based on the votes that a party receives. For that reason, it’s a pretty easy 4/5 or 5/5 in the proportionality aspect. It’s a 4/5 for regionality because the smaller scope makes it slightly less proportional, but this isn’t that bad in practice. However, as we zoom out with this system, the ties to local areas become lessened, and instead appeals to popularity and ideology become more relevant. Campaigning isn’t done based on local issues, more about blanket policies and ideologies. This is fine in a federal system because the local government would be appealing to local issues and the nationwide authority would be appealing to the common ideas of all. But in the UK, we don’t have such a system, only devolved assemblies that have limited power. So this system doesn't really make much sense for the UK in my opinion where we have a centralized government. It’d still be fantastic, and a major improvement compared to First Past the Post, but compared to the Single Transferrable Vote… It’s close, but I believe that STV is better.."
    +
    "\n\nThe Single Transferrable Vote (Of which, joins 4/5 adjacent constituencies together for 4/5 MPs)" +
    "\n\nA: 5/5" + 
    "\nB: 4/5" +
    "\nC: 5/5"
    +
    "\n\nTo put it simply, the STV system is both proportional and local, and it also gives the most say to individual voters on how their vote is counted. It is, in my opinion, the best system for electing representatives. It does what Proportional Representation aims to achieve, and yet maintains the local link to a constituency alongside individuality of candidates from the parties they belong to."
    +
    "\n\nIt’s the strengths of the Alternative Vote, with the proportionality of Proportional Representation. "
    +
    "\n\n\nIn short, for any position with multiple winners, STV is the best choice, hands down. And for individual candidates, AV is the best choice, because AV’s flaw was lack of proportionality and sway, but in a single option vote, AV doesn’t need to care about this. This means it’s ideal for electing positions such as Mayors. (It’s also good in constituencies that need to be single member for certain reasons, like Isle of Wight, or for constituencies that would be too big if joined together with other ones.)"
    
}

export const spoilerWallArticle = {
    title: "The Spoiler Wall",
    image: SW,
    body: "In elections under the First Past the Post system, there is a very well documented phenomena where parties of a similar ideology cannibalise each others votes. That is to say, two left wing parties existing in the same place, makes it easier for the right wing parties to win, because the left wing vote is split. This happens with the right wing too, as famously documented in the 2015 General Election, where UKIPs 13% vote led to the conservatives being unable to form a strong majority government, and UKIP only getting 2 seats out of that whole mess. "
    +
    "\n\nFirst Past the Post is a terrible system for many reasons, but the Spoiler Effect as it is called, is the biggest reason. If you vote how you truly feel and it isn’t one of the big 2 parties in your area, then the party you most hate benefits from that split vote. So any sane person would vote tactically, to ensure the party they most hate loses to the party they hate less but still don’t like. This eventually leads to a 2 party system like in the US, but the UK is special in the sense we have a 2.5 party system as some of my friends have called it. We still have smaller parties, its just that they never win power (besides that one time in 2010), and that is something to be proud of."
    +
    "\n\nBut there is a grim and truly upsetting truth of the Spoiler Effect. According to statistics published by YouGov, [20% of people tactically voted in the 2019 General Election](https://yougov.co.uk/topics/politics/articles-reports/2019/12/10/whos-tactically-voting-and-why). 20% of people were voting in a way that was not aligned with their interests or how they truly believe, and the system told them in a way, that if they voted for who they truly believed in, then they would only be helping the “enemy”. Now why is this so bad? Surely that 20% is substantial enough to sway an election, right? If that 20% decided enough was enough with the two top parties of the constituency they lived in, how much would that sway the election?"
    +
    "\n\nThis is the leading groundwork for the main theory of this write-up. The Spoiler Wall. But first, let’s define an “electoral wall”. The Electoral Wall will be defined as the proportion of votes that must be swung from a party in order to lose 5% of the seats the party has,This is called a wall, because its to say that this much force from the electorate is needed to break it down, and show their distaste for a party. Losing just 1 seat isn’t a big deal, but losing 5% of your power in parliament shows a considerable disapproval for the largest parties in that system. "
    +
    "\n\nIn a good, representative system, the proportion for a party to lose 5% of its seats, would be 2%. It makes sense and is fair in a republic democracy, if you lose 5% of your voter base, you should lose 2% of your power as you represent less people. Realistically, this will always be a little bit off, so we’ll say the ideal goal of a democracy is that if 6% lose faith in you, then you should lose 5% of your power. That’s nicely generous!"
    +
    "\n\nSo what is that proportion in the UK? Now here’s our methodology. We’ll first be using the simulation system of this site to simulate the 2019 election as it happened, then use the “ALWAYS” functionality of the tactical voting modes to drain votes from the top two parties in each constituency. This includes the SNP in Scotland, the LibDems in some places, and Labour/Conservatives for basically everywhere else. "
    +
    "\n\nSo the Conservatives had 365 seats in the 2019 election. 5% of that is around 18 seats. How much tactical voting needs to be corrected in order for the Conservatives to lose these seats? Remember, these votes wont swing to Labour in most cases, as you can read in our Simulation methodology article, but to Reform and the LibDems, and also independents, and also that their primary opposition loses their tactical votes too, so this should be a fair comparison. So how much of the Conservative voter base need to lose faith in the Conservatives to lose 18 seats?"
    +
    "\n\n32.1%"
    +
    "\n\nLet that number sink in."
    +
    "\n\nFor the Conservative Party to lose 18 seats, both them and their opposition in the constituency they are in must lose one third of their support to third parties. One third. This is simply not acceptable in a democracy. Again, their support base collapses by 33% in most constituencies and they STILL have majority control with 347 seats! This means that until a specific point, every vote that isn’t for the big parties is entirely wasted, and means nothing. Infact, what’s even worse, with the same methodology, the Conservatives only lose their 1st seat at **8.1%. And this isn’t even accurate!** The seats oscillate back and forth between 0 and 1 seats until **16.7%**. These are being lost and regained because of the odd few constituencies where Conservatives aren’t one of the top two parties, so they win a seat in those areas, but are losing seats in those where they are winning by a thin margin.. "
    +
    "\n\n2.1% is this “Spoiler Wall”. It is the proportion of votes in First Past the Post that need to flow from the top two parties in a constituency, for the biggest party, the Conservatives, to lose 5% of their seats. 6% was our ideal goal here. The difference between that and 32.1% is astronomical, and even this isn’t enough to dethrone the top two parties in many places. Why was 5% chosen as the basis to find this wall? Surely it was more accurate to say that 16.7% is the wall, as this is when they first lost a seat and didn’t regain it? Well, it is because once this Spoiler Wall is hit, the amount of seats lost for every additional % of the votes being drained increases drastically, resulting in a Conservative minority at 34%, only 1.9% higher than what barely lost them anything. The Spoiler Wall is best defined as the *“threshold where the systematic protections of first past the post begin to fail, and the party begins to suffer defeats which become increasingly more proportional to the loss of votes”* "
    +
    "\n\nFor the sake of comparison, I tested this under the Single Transferable Vote (Runoff) with an MP mode of “LIMIT” on County’s and 5 MPs, and the Conservatives with 2019 results (no tactical voting correction) wins 312 seats. The threshold is therefore about 16 seats. The Electoral Wall was found to be 6.5%. Under Proportional Representation using a Nationwide party list system, they win 283 seats, the threshold being 14 seats, and the Electoral Wall being found to be exactly 4.9%."
    +
    "\n\nThere are advantages to First Past the Post, and I am incredibly biassed against it and do not think the advantages justify us still using it, but I can recognise why people prefer governments without coalitions and think that the people should have to compromise. But frankly, I think anyone, even the people who defend this system, cannot see these numbers, and think that this is a fair democracy. Your voice doesn’t matter unless you live in marginal constituencies, where your vote counts, but even if you live in such places, if you like one of the smaller parties, then your voice still doesn’t matter. The truth is, that this system makes only a handful of people sway the elections, and even those people can’t express how they truly feel, because in these marginal seats, tactical voting is even more important."
    +
    "\n\nThe point of all of this is, the system we choose is so much more impactful on our voice than plenty of people think. Most people know voting for a smaller party is a waste individually, but to actually know how much of a strongarm tactical voting has over our politics is very scary. It boils down elections to simple competitions of Labour vs Conservatives, and who can scare the most voters into tactically voting against the other, and how to make the opponent look awful enough to make voters too apathetic to vote tactically. "
    
}

export const PRvsSTVArticle = {
    title: "Party List versus the Single Transferrable Vote",
    image: PRvsSTV,
    body: "EMPTY"
}

export const CaseAgainstArticle = {
    title: "The Case against Electoral Reform",
    image: TCA,
    body: "EMPTY"
}

export const MethodologyArticle = {
    title: "Methodology and Development",
    image: M,
    body: "EMPTY"
}

export const ProposalsArticle = {
    title: "Proposals of the Project",
    image: P,
    body: "EMPTY"
}