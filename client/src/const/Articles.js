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
    body: "Party List Proportional Representation and the Single Transferable Vote are both the most commonly suggested forms of voting for the UK in the event of electoral reform. Both are great and do alot for making the electorate feel like they actually have a say and have had an impact in the end results of an election."
    +
    "\n\nBut there are differences between the two, and this article hopes to highlight them, and hopefully when we come to implementing such reforms, we know what we want and why."
    +
    "\n\nFor full disclosure, I do have a bias towards STV as it is the system I’d prefer to be implemented into the UK. I do think both are very good however, and STV just has a small few things I personally like over PR. "
    +
    "\n\nFor this, we will be assuming that Party-List is the nationwide variety. Personally, I believe if we get Proportional Representation, it should break up the UK in some way to provide more of a local attachment, similar to how Spain handles it. But the more local you get, the more you should just use STV, because STV is just Party-List but with a stronger focus of locality and voter choice (at the cost of slightly less proportionality)"
    +
    "\n\n## Individuals vs Parties"
    +
    "\n\nIn Proportional Representation, you vote for a party, which contrasts most other systems, which has a focus on individual candidates. This is because many democracies didn’t explicitly plan for political parties, they’re just a natural consequence of people having similar ideas and working together. PR turns this natural consequence into a hard defined rule of the system, acknowledging that this is what politics typically trends towards already."
    +
    "\n\nHowever, this does come with some interesting issues, for example, independent candidates are much harder to get elected, as they need to represent themselves as a \“party\” with a list of themselves. Previously a plurality of the vote might be enough to crown them an MP, which could be less than 35k total votes. (Remember that constituencies have roughly 70k eligible voters). In this system, they would need 70k votes, or even more if a threshold needs to be reached in order for a party to be considered \“big enough\” for parliament (this is done in Israel, where a party needs 3 seats worth of votes to enter their elected house!). This threshold also has problems where many votes can go unrepresented which conflict with the name of the system but that’s a discussion for another time."
    +
    "\n\nThis essentially eliminates independents from the system without some explicit rules put aside for them."
    +
    "\n\nThis does have some advantages, like in a closed list system, where most voters can’t decide the priority of candidates on the list, parties can ensure that their message is unified and makes the system work a bit more smoothly by ensuring a party is always conforming to the current platform. And it also conforms with how many people vote already, which is voting for the party they currently like, or the leader of a party, and they do so by voting for the individual that represents that party, not for the individual themselves. But this doesn’t feel like a strong point to me, because a lot of the current voting behaviour in our system happens purely because the system acts upon us, and we do not act upon it, we don’t really know how drastic of a change in voting behaviour will occur in the UK if we transition to a different voting system. We could very well, under STV, like to vote for individuals much more than we used to, simply because it's more viable to do so."
    +
    "\n\nAnd it also does so at the cost of electing individuals. This is somewhat fixed in an open list system, where all voters have the right to decide the priority of people on the party list, as opposed to closed list where it’s up to the party on how that is decided, so if we do adopt PR, we do need to think about how we alleviate these issues. STV on the other hand, simply does what we already have, which is voting for a person, and not a party. (But some uses of STV let you vote for parties because the ballot paper can get very big)."
    +
    "\n\n## Local vs National"
    +
    "\n\nWhen politicians campaign in First Past the Post, they campaign in marginal seats. If we retire FPTP and implement STV and PR, then they’ll need to campaign all over the country, but how they accomplish this would be different in each system. In a local system, its bottom up, every candidate attempts to win the sway of the locals and gets to the heart of their issues. In a national system, it's from the top, instead of breaking it up by localities, we break it up by groups that are nationwide. Campaigns win the attention of groups, not constituencies. So Labour would campaign primarily towards working class people, and Conservatives would campaign towards middle class people."
    +
    "\n\nThis is again, a matter of preference. Both systems would require the parties to focus on appealing to ideologies, but STV facilitates local issues more, and PR pushes the parties towards demographics more."
    +
    "\n\n## Voter Expression"
    +
    "\n\nIn PR, you still only get to vote for a specific party. Most people do not agree with only one party, they agree with a few, but have a favourite. In STV, you get to express your exact opinion on every candidate, which PR simply doesn’t allow you to do. I feel like this is important, because should a voter be able to express every nuance of their political worldview, or should they simply choose their favourite and move on? STV prevents people from feeling like they wasted their vote, but nationwide PR explicitly makes it easier that your favourite will get some representation."
    +
    "\n\n\nI feel like it’s a very tight race, and your opinion will probably come down to which point you feel strongest about, and what side of it that you prefer. If you prefer local elections vs spread out ones, or if you like ranking choices vs single favourite, or if you’d like to vote for an individual, or vote for the coalition that is a party."
    
}

export const CaseAgainstArticle = {
    title: "The Case against Electoral Reform",
    image: TCA,
    body: "Electoral Reform is very much desired by the British electorate. [According to a bi-annual YouGov poll](https://yougov.co.uk/topics/politics/trackers/should-we-change-our-current-british-voting-system?crossBreak=c2de), 44% of the population wishes for a more representative system vs 27% who feel more comfortable with First Past the Post, which the poll posited that it would be more likely to result in a majority Government. We can’t tell if that skewed the results, but it’s interesting to look at this data."
    +
    "\n\nThe only demographic to like First Past the Post more than the prospect of a more proportional system is the Conservative voter group, and people above 65, which is not that puzzling, it does benefit them the most out of any parties. Labour and Lib-Dems support the prospects of Electoral Reform strongly at around 60%."
    +
    "\n\nSo we know that support for Electoral Reform is high, especially amongst those most diminished by its effects as no one didn’t see coming. But the interest of this article is not an appeal to popularity, but rather, to ask why the 21% of those polled said that they wish to keep the system as is."
    +
    "\n\nWe are going to be looking at the many points put forward by opponents of reform and be aiming to argue against them, to hopefully settle these aspects of the debate."
    +
    "\n\nIt wont because this project is a passion project and not written by an academic in the subject or expert in electoral systems, just a very unhealthily passionate-about-electoral-reform guy, and also its not going to reach all 70 million people in the UK even if it were written by an expert, but a man can try. "
    +
    "\n\nThis article was written with the help of the folks on reddit, on the ukpolitics subreddit, who offered me arguments and concerns against Electoral Reform at my request, that I felt like was overall very well written and well put together. In the interests of summarising certain points and arguments, I’ve had to abstract away a great deal of nuance in some cases, and my bias may have been at play. For that reason, I urge you to read the thread afterwards [here](https://www.reddit.com/r/ukpolitics/comments/wtnfbh/what_are_the_biggest_concerns_that_you_have_heard/) if you feel like you want to delve deeper into the case against Electoral Reform. "
    +
    "\n\n## First Past the Post leads to stronger, more stable governments."
    +
    "\n\nThis is a common point, sprouting from a disgust of coalition-based governments and observations of other countries with unstable political situations such as Italy. This argument hinges on the premise that a coalition of parties is much more chaotic and difficult to manage than singular parties."
    +
    "\n\nHowever, this becomes dispelled by the fact that countries like Germany have exceptionally stable political situations (ignoring the global crisis’), and yet they have coalitions in power. Italy is a proportional representation based democracy, but it has some political quirks that have led to the chaos, like ridiculous levels of corruption and a leading populist party that has suffered too many resignations from its leader (which had to eventually be blocked by the Italian President at one point) that bellied up harsher and harsher from the party having contradictory views."
    +
    "\n\nThere is an element of truth to this. But it feels like its more to do with the fact that when one group has 100% of the control, they don’t really need to worry about what anyone else thinks outside of that group and won’t need to honour agreements. In a Coalition, chaos can occur if parties don’t cooperate, which might be alarming based on what we know about our mainstream parties, but Coalitions under our current system are seen as an electoral disaster, and under a different system, parties would be more willing to share power as it becomes a fundamental prerequisite to having control in parliament."
    +
    "\n\n## PR means we must remove local MPs and individual candidates!"
    +
    "\n\nThis stems from a misunderstanding that occurs due to Proportional Representation typically being conflated with Party-List Proportional Representation (great naming conventions, guys.). A system can be a Proportionally Representative system and have individual candidates that you can vote for at a local level, such as the Single Transferable Vote. "
    +
    "\n\n## The referendum on the Alternative Vote means that the Electorate does not want Electoral Reform."
    +
    "\n\nAV was not a proportionally representative system, or even a Mixed Member Proportional system. It simply removes the spoiler effect from the equation. We do not believe that this system was adequate to the needs of our country’s democracy, and we thank the British public for rejecting it. This mandate exists purely for this system, as it would have resulted in such a drastically different electoral landscape that we cannot agree that it is a mandate against Proportional Representation."
    +
    "\n\n## Under many alternative systems, the Loser can Win!"
    +
    "\n\nThis argument stems from an idea that voting is about winning, and about showing your competence well enough to convince a strong plurality of a local electorate to vote for you. "
    +
    "\n\nFirst we want to address this point made by the commenter we are basing this point off. The Single Transferrable Vote still enforces this, ensuring that any given Party must take on the test of convincing a community of people to pledge their faith into them. This commenter posited that under Proportional Representation, you can simply pander to a group and win votes that way., In a way, votes come to you, and you don’t need to fight to win the hearts of the people. I would agree if we are talking about Party List Proportional Representation, but STV, as I said, this can’t happen. Worries of people who simply keep to themselves and pandering to their ideologies that have no local consensus or debate regarding them isn’t possible in STV, as proposals for the systems tend to require 20/25% plurality in order for a seat to be won. This is enough of a plurality to recognise that the local community recognises that candidate as significant, and deserves the seat."
    +
    "\n\nHowever, the Plurality project does not agree that elections should be about “victory”. It should be about the people having a say in the way that the government is run. This is not accomplished by First Past the Post, as you only have 2 realistic options, in which neither may be how you wish to see the government be run. For example, in 2017 and 2019, there was no good centre-left or centrist option, despite these being completely valid desires for the government to be run. In a Winner Takes All system, the majority gets to be heard, and the rest forgotten. Shouldn’t the parliaments be a place of compromise and debate, where arguments contend between every nuanced take we can have? Isn’t that the essence of democracy, a compromise between opinion and putting that into action? As someone argued elsewhere in the post, the parties themselves do this already, but we have no say in how powerful the negotiative forces are, and how these parties compromise. The parties compromise on our behalfs, and then we are forced to compromise our true beliefs and choose one of two compromises set before us."
    +
    "\n\nLosers deserve a say too. Majoritarian systems essentially state that ideas that aren’t popular are inherently worthless, which can be dangerous and lead to ultimately good but electorally unpopular ideas being thrown aside, such as expensive infrastructure projects."
    +
    "\n\n## Extremists can be more easily voted in within Proportional Representation systems."
    +
    "\n\nI feel like this is an exclusionary take. I feel like it is strongly undemocratic to discount more extreme parties. Even though I fundamentally disagree with parties like Reform, I will fight for their right to be heard in parliament. In 2015, they received 13% of the vote, but only 0.2% of the seats in parliament. To me, that is a horrible flaw of our system. Even if I would have hated living under a Conservative and UKIP coalition, that was what the people were voting for, even with tactical voting in mind."
    +
    "\n\nExtremism isn’t inherently a negative thing either. Extreme ideas are merely ones that stray from the status quo and its current discussions and values. A few decades ago, you’d probably get weird looks for saying that Car Dependancy is bad, but in recent years, it has become more and more mainstream that there should be alternative means of travel and Cars shouldn’t be the primary means of getting around within cities. The merit of this ideas isn’t the important part, its just to say that the status quo itself adheres to a political ideology and set of values, and an extreme idea tends to challenge one of those values fundamentally. And sometimes an extreme idea is what needed."
    +
    "\n\nBut then this argument also glosses over the fact that if one of the two major parties go on an extremist platform, they can get elected! The two parties can simply put forward an extremist leader with extreme policies, and now you’re stuck choosing between two extremes, and even with just one extreme, many people vote in a loyalty fashion and out of fear of the other guy, so they’ll still vote for the extreme platform, and also because it might be the only platform that has anything remotely close to what they want and is viable. In a proportional system, if your party starts going absolutely insane, you can just swap to an alternative but less extreme party, and not risk wasting your vote. And in a coalition, where extreme parties may enter a coalition with other parties, they can be reigned in by the more centrist parties, and far less extreme ideas get implemented as of a result because they would have less negotiating power compared to the bigger, more appealing centrist parties."
    +
    "\n\n## New systems can be more confusing and result in First Past The Post behaviour from voter laziness"
    +
    "\n\nThis isn’t a great argument honestly, but I can see why it’s being raised as a concern. Ranked Choice Voting can be confusing due to the idea of a “runoff” requiring a bit of an explanation. Someone in the initial Reddit thread asked if having 2nd or 3rd choices would lower the chances of your first choice. It wouldn’t, it’d be the best case scenario for them if you voted them as the 1st choice. But it did illustrate to me that if the Single Transferable Vote were to become our system of choice, it’d need a proper campaign to teach the electorate how to use it, how it works, and to make it so its taught in schools so newer members of the British electorate can grasp the system."
    +
    "\n\n## Coalitions mean compromising ideas you voted for, whereas parties under First Past the Post have already compromised between different factions with their policies, that you then can vote for."
    +
    "\n\nThis was one of the most compelling points I saw that was in favour for First Past the Post. For that reason, I really want to delve deep into this person’s point, and give it a proper spotlight."
    +
    "\n\nThey let me characterise their point as such. "
    +
    "\n\n*\"In First Past the Post, coalitions are often agreed before elections in the form of a unified party, and rarely form coalitions post-election, and in a Proportional system, coalitions are rarely agreed before elections as a unified coalition of parties, and they often form coalitions post-election.\"*"
    +
    "\n\nThey stressed to me though, that I point out that it matters because of so; when this pact is formed pre-election, it lets you vote on that agreement and you know exactly, at that ballot box, what the promises are, and that they are likely to be carried out if they get into the drivers seat. But in a post-election pact, you can’t vote on that agreement (unless the Party allow its members to vote on the agreement, in which case if you’re a member you could? But I’m not sure how common that is within Multi-Party systems.)"
    +
    "\n\nThis argument came with a bigger heap of details, like parties forming coalitions with parties they should be opposed to, and how policies you voted for can be discarded in the terms and conditions of that agreement."
    +
    "\n\nThis is unfortunately true, and it is a flaw of any multi-party system. Just take a look at the Irish Republic's Greens being in coalition in the right winged parties, despite being a self-described left winged party themselves! It's a flaw I'm happy to concede in the debate for Electoral Reform, but I do believe that a multi-party system has more benefits that outweigh this flaw."
    +
    "\n\nSome coalitions in multi-party systems ARE negotiated during the lead up to elections, but also, in the case of a post-election pact, by voting for a party you believe in, you get to give them more negotiating power in that agreement if it happens post-election. "
    +
    "\n\nI like to imagine this as First Past the Post requiring voters to compromise their beliefs and values at the ballot box, and a Multi-Party system forces the parties (the actual professionals that know politics and government systems and have advisers) to do the compromise on our behalf based on our given mandate. When you phrase it like this, the flaw can be seen as a strength, and then we can characterise this as a double-edged sword of the system. Sometimes its fair and great, and sometimes, the parties just do extremely weird stuff like the Irish Greens."
    +
    "\n\nIt’s also that I feel like giving a mandate-based weight to the negotiating power of what would be factions within these parties allows us to have more fine-tuned control on how a Coalition will look at the end of it all, and that’s ultimately something I prefer, I think this is ultimately where there is no strong rebuttal, and wasn’t something I thought about before this post brought it to my attention. So I thank the user in question, LycanIndarys, for their time and well formulated arguments. I urge the reader to take some time to [read it](https://www.reddit.com/r/ukpolitics/comments/wtnfbh/comment/il5um1t/?utm_source=share&utm_medium=web2x&context=3), as I feel like I can’t summarise it in good faith as it has a good deal of nuance that will be missed by doing so."
    +
    "\n\n## People push for PR purely to spite the parties that benefit the most, and to benefit their favourite."
    +
    "\n\nThis is unfortunately true. You can’t help that unfortunately. I feel strongly that making the issue partisan overall hurts the push for these changes in our system. The Right in our country deserve a choice other than the Conservatives."
    +
    "\n\n## The party I don’t like will benefit!!!!!! And they might form coalitions with the OTHER bad people!!!!"
    +
    "\n\n***Stop.***"
    
}

export const MethodologyArticle = {
    title: "Methodology and Development",
    image: M,
    body: "In this article, the methodology used by the site’s simulation page will be explained. This is not exhaustive or complete, just a detailed account of the overarching assumptions made by me during the development of the site, and the journey of creating the site. This article assumes that you have some general idea of the frequently used terms on this site."
    +
    "\n\nFirstly, let’s talk about how we adjust the Party Polling rates on a constituency level. It just simply takes the proportion of difference, that being NewRate/OldRate, and multiplies the votes in each local constituency by that ratio. For example, changing Labour to 45% instead of 30% would mean every constituency would have Labour see an increase of 50% in their votes. As 45/30 = 1.5. This works in reverse too, ratios less than 1 will deduct votes from that party. "
    +
    "\n\nI will be frank and admit that this is not a great method, but I felt as though it was out of scope of the project to come up with a more complex and realistic model - I simply wanted the functionality for testing purposes and left it in as I thought it was fun to play around with using Voting Intention polls as a basis."
    +
    "\n\nWhen I compared it to other comprehensive systems made by people who actually have the expertise to make educated assumptions and not made by a bored student, it seems to be fairly accurate, but really big changes tend to get wildly inaccurate."
    +
    "\n\nNext, is the constituency grouping. Right now as of writing this methodology article, a planned 6th option does not yet exist, so I’ll explain how the current ones work."
    +
    "\n\nThe groupings take the categories made by the Government, and simply arrange them together to form larger constituencies. How this impacts the election is based on your MP Mode, which we’ll get to later, but the default simply assumes the number of sub-constituencies is the amount of MPs in the new larger one. This is useful for approximating how STV and Party Lists PR would work, and that’s the primary purpose of the project."
    +
    "\n\nThe 6th option would be more complicated but is more accurate and more fun. It would be called Gerrymandered, which lets you customise groupings yourself, with no restrictions on size. This theoretically wouldn’t be hard to implement, so it might be implemented on release, but if it’s not there, that’s because, in true programming fashion, it was 10x more complicated then how I abstracted its design, and I will go through suffering."
    +
    "\n\n(Gerrymandering for those who don’t know, is when constituency boundaries are redrawn to benefit a specific party or to weaken the voting power of a group.)"
    +
    "\n\nNext is Voting Type, which is where everything gets a bit complicated. Plurality was fairly easy, single seat constituencies just check for the biggest vote, and anything bigger than that reward it proportionally. The second part was way more annoying to get working than it sounds because I wrote my initial grouping code weirdly so I had to spend several hours refactoring it. Loser Takes All just takes this operation and reverses it, giving as many seats to the biggest losers as possible."
    +
    "\n\nBefore we jump into Runoff Voting, let’s just look at voting overall, how does a system without the need to tactically vote impact an election? How many people would change their ballots? Who would they change it to? "
    +
    "\n\nThese are big assumptions that would drastically alter an election’s outcome, and I really wanted to give an honest outlook on what different electoral systems would look like."
    +
    "\n\nMy solution was this: First, sort the constituency votes and to their parties into a list. Then, cut out the top two parties in a local constituency from that list when we are correcting tactical voting. Then, take a proportion of votes from those 2 parties. Now we need to redistribute them evenly between each smaller party."
    +
    "\n\nAt first, this redistribution simply gave those votes to each smaller candidate proportionally based on how many votes they received prior. But this behaviour led to some weird results, mostly the most insane Lib-Dem surges you’d ever see. This is because it was ignoring the actual reason behind tactical voting, which was simply to keep the one you least like of the top two from winning. This does not actually mean you agree with the third party. It should be that 1 tactical voter from Labour would be far less likely to vote UKIP then one who was voting Conservative, regardless of it being the third biggest."
    +
    "\n\nSo I went back to the “take a proportion” stage. Instead, I gave each party a “political position” value, based on the wikipedia descriptions of their leanings (yes I know sh). So Labour was put as “centre-left” and Conservatives as “centre-right” and Lib-Dems as “centrist”. There were 7 different values you could have, 3 on each leaning, that being Far-Moderate-Centre and then the middle point which was declared to be Centrist "
    +
    "\n\nFar was not used very often, and for the purposes of the simulation, all “Independant” candidates were marked as Centrists."
    +
    "\n\nNow, using the distance between the initial party and the other parties to be given votes, we can assign each party a weighting. The largest weighting if its a candidate from the same party, a large weighting if its the same position (0 distance), a moderate weighting if its not far off (1 distance), and a small weighting if its really far off (2 distance). Anything beyond that received a very miniscule weighting. The votes are then reallocated based off these weighting"
    +
    "\n\nNow back to Runoff voting. This system wasn’t only just designed for tactical voting, but for Ranked Choice too. With our political distance model, we can easily tell what party should come next from the one we are on."
    +
    "\n\nSo how does Runoff work then? Let’s look at a single member example first. Firstly, we correct for tactical voting in the default Tactical Voting mode, as the Spoiler Effect is eliminated, and thus tactical voting would not occur. Then, we take a look at that list we made before, check if there’s a clear winner, and if not, ask who is the biggest loser. The biggest loser has 100% of their votes taken and are removed from the list, and using our Political Distance system, we reallocate the votes based on those weightings. We never actually think of individual voters in this model, rather we simply predict what proportion of the voters would maybe put one candidate as their next choice, then reallocate votes based on that prediction. In an actual election, the specifics of the vote would be alot more messy and nuanced, and this is merely an abstract from that so we can simulate the behaviour in an \“almost right\” way. This process as described repeats until a majority is reached by a candidate."
    +
    "\n\nIf we have multiple MPs in a Runoff constituency, then Winners have something interesting happen. Like in the Single Transferrable Vote, in order to not waste anyones vote, we take the excess from what was needed to win, which is the percentage 1/(number of MPs). So for four MPs, you’d need 25% to win. So for this excess, say we have 28% of the vote on one person, and you need 25% to win. Well, we would take that excess 3%, and then apply our political distance redistrubution method after we removed the original candidate from the list (as they had won)."
    +
    "\n\nI feel like these are some big assumptions, but ultimately, are compelling and simulate the system fairly well. When I compared this system to a model made by experts, (i forgot which one and couldn’t find it i am SORRY), it was fairly close, and I had spent an all-nighter on it so yeah, good enough as we say."
    +
    "\n\nNext we come to the options, Tactical Voting Mode, and MP Mode. We’ll explain Tactical Voting Mode first. Tactical Voting starts off in “conditional” mode, where other parameters in the election determine if we need to correct the assigned proportion of tactical voters from the electorate. “Off” will never correct, and “Always” will always correct for the proportion, even when tactical voting is part of the system (such as First Past the Post). This was how I achieved the results found in the Spoiler Wall article!"
    +
    "\n\nMP Mode determines how we assign a number of MPs to a grouping of constituencies. “Off” is the default, and this just means that the size of the group assigns the number of MPs a constituency has. Alter instead sets a groupings MP count to the chosen value, regardless of size. Limit is much more interesting, it came from a need to test STV with an average of 5 MPs per grouping. It does this by breaking up the groupings, to make each sub-group not contain anymore constituencies than the selected value. As a limitation of the design, geographic proximity could not be respected. This is because I hated working with GeoJSON (the format that the British map is stored in) (this is also why Northern Ireland was left behind. Sorry mates, I spent 3 days just to get the page to turn black, and THAT WAS PROGRESS WITH THIS STUFF). And also because when I looked it up, a solution someone found had to do with an \“adjacency matrix\” and as you may imagine from that discovery, I immediately closed the page."
    +
    "\n\nThe charts besides the map were also very “fun” to do but there’s not much to talk about with them. As time of writing, I want to make a third chart to show average discrepancies in percentage between national vote and seats in parliament. But it ruins the composition of the screen so thats a problem for future me."
    +
    "\n\nThen the charts for when you click a Constituency! The “electoral breakdown”! If you remove electoral, it certainly was one of those! Getting the red line to show up on the chart for Runoff votes took two days. There are still bugs because the NPM plugin I’m using was not prepared for the level of graph updates you can do with it, but luckily they’re minor and \“good enough\”. "
    +
    "\n\nThe red line though... "
    +
    "\n\nI need to share this because it was awful. Ok so the framework I’m using is “React” you literally need to know nothing about it, it just does what it says in the name, it reacts to changes in data. It’s really nice. So the way I do charts is by using a React plugin (good so far! Still annoying though!), but then for the red line, I couldn’t do it with just React Charts.js. I needed to get Chart.js Annotations. I’m new to Javascript, but this Annotations existed outside of that React NPM installation I originally did, so I had to figure out how to get it to display."
    +
    "\n\nLuckily, it was pretty easy to display! I just put in a default of “1”, so it always annotates a red line at 100% vote proportion when it doesn’t know what to do (likely because there’s no Runoff vote)"
    +
    "\n\nBut then, when I changed around the voting type to Runoff, it didn’t change. I thought maybe its some quirk to do with there only being 1 MP, so I increased that. No change."
    +
    "\n\nTurns out, since this wasn’t made for React, it doesn’t react to changes! Great! But I had seen this bug kinda before, and the solution before was just to feed in a method that gets called every reaction by React. So I did that, and it stayed at 1f. Then I got suspicious that it was caching, and restarted the entire site, and set all parameters so it would first call this method with what should be moving the red line."
    +
    "\n\nNOTHING"
    +
    "\n\nI DON’T EVEN KNOW WHY THIS HAPPENED IT DOESN’T EVEN MAKE SENSE WITH THE ACTUAL SOLUTION I FOUND. I THINK MAYBE ITS BECAUSE THE PROPS (data you pass down from parents, its how the form, map, and breakdown all communicate.) JUST AREN’T INITIALISED SO IT JUST DEFAULTS TO THE DEFAULT I SET IN THE METHOD??? "
    +
    "\n\nI have no clue so I went to the Github and just asked. The greatest shame of any developer, is to admit you actually aren’t super smart, and ask for help, even though doing so hurts no one, except for your pride (because I’m totally this super cool 1000x programmer that just instantly intuits Javascript)"
    +
    "\n\nBy the way, its just calling the method but putting () => infront of it. I know why this works, I just hate that I was 3 characters away from getting it working and this took me 2 days just to ask for help. Thank you so much to the people Chart.js’ Annotation Github page for answering such a trivial question."
    +
    "\n\nI love programming, if you can’t tell. Very fun. The lesson from the ramblings of this voting obsessed madman, is just ask for help. Preferably on the Github repository where your problems arise because you’re more likely to run into people who know what they’re talking about. And also on anything else in life I guess but I’m too narrow minded to apply this lesson to anything outside of the day I actually asked for help."
    +
    "\n\nThe project is open-source, so you can take a look at everything I wrote if you want more granular details on how this project was built and assembled. Feel free to learn from it and take code as you need it! (I’d appreciate a credit if you do, but honestly don’t bother if you can’t fit it into the feel of your project."
}

export const ProposalsArticle = {
    title: "Proposals of the Project",
    image: P,
    body: "# Here are the reform proposals of the project."
    +
    "\n\n* Change all voting systems to the Single Transferrable Vote, with 4 or 5 positions being voted for on average. For General Election constituencies, they are to be joined together for larger constituencies. To maintain a local link, groupings that would be too large are not used, and instead favour AV or STV with 2 or 3 candidates. We believe that this is the best system, as it keeps the individual MPs and locality of First Past the Post while eliminating the Spoiler Effect, is proportional to the desires of the electorate, and allows that electorate to give extremely nuanced opinions in the form of their ballot on election day. "
    +
    "\n\n* All singular positions, such as Mayoral elections, to AV. This maintains the ability to given a very nuanced opinion in a vote, and also eliminating the Spoiler Effect. "
    +
    "\n\n* Voting does not require the current ID system proposed by the 2019 Government, and voters may go to any voting station, and not one thats assigned for them. This makes it much more convenient to vote while you do other things and would increase turn out amongst more busy and hardworking parts of the population."
    +
    "\n\n* Election Day is a national holiday, so many more people can go vote."
    +
    "\n\n* If under STV, the voters may order by party rather than individual candidates. This is to make it easier to vote for people who care less about the candidates, and only about current party policy, which many people vote in this way. The ordering internally to those candidates may be based on a Party List."
    +
    "\n\n* Make the Electoral Commission independent again."
    +
    "\n\nThe below policies are more opinionated and less directly influenced by the research done for the project. We feel like separating this is only honest, as the above proposals should be a standard of a healthy democracy, and while I believe the below may still be the case for that, I am not convinced I am objective enough in that assertion to propose them in full capacity. Instead, think of these as **suggestions**"
    +
    "\n\n* More power is given to petitions for more direct democracy. We should employ the systems of semi-direct democracy of Switzerland. Popular Initiatives so that petitions can call a nationwide referendum on the petition’s proposal, optional referendums that can be called with enough signatures to do so on a bill being passed through government, and mandatory referendums for amendments to the constitution. This would reform the UK into a semi-direct democracy, where the people act as a direct check and balance to elected houses all of the time, rather than every 5 years."
    +
    "\n\n* In addition to or instead of the above, with a very high amount of signatures, such as 250k, the public can call a No Confidence Referendum, where it can be decided if parliament should be dissolved and a general election called. Limits would ensure that for the first 2 years of a Parliament, this cannot be actioned, and a referendum on this topic can only be called every 12 months. "
    +
    "\n\n* Reinstate the Fixed Parliament Act, with the above amendment. The power of calling a General Election should only fall onto the Head of State (Currently the Queen), or into the hands of the people who appointed parliament, and not the parties who are currently in charge and have a vested interest in calling Elections during upswings in the polls."
    +
    "\n\n* The House of Lords is to be reformed. The current proposal of the project is to make it a Party-List proportional system, and renaming it to the House of the Union. Each country within the union gets 10 MUs, and so does London as its own separate entity. The current powers of the House of Lords are carried over, so that Manifesto commitments cannot be blocked, and the ruling party of the lower house can eventually push through legislation after enough attempts. The reasoning of this is to ensure the second house does not cause political deadlock. It simply means that the second house acts as a soft filter, but still allows for amendments to be suggested by parties that may not be in power. And a reminder: The House of Lords currently can deny any legislation that postpones a General Election without restriction, so it is useful to have it."
    +
    "\n\n* Give more devolved powers to the Senedd, Holyrood, and Stormont. We are four countries in a Union, and they deserve additional powers of self-governance. "
    +
    "\n\n* The project has no opinions on the Monarchy. We do believe that the Queen acting as a tradition is fine, but she should not exert any political power onto the democratic will of the people. "
    +
    "\n\n *This list is not exhaustive. This is a very large topic and its impossible to capture the nuance of it all without all the options in front of me. If you think I missed any part of this huge topic, please contact me using my email address, soupmothstudio@gmail.com*"
    +
    "\n\nThe aims of this project should be clear. The goal is to make a democracy in which all can freely express their opinions and have a say in how it’s all done. Candidates that we can vote for without worry. The ability to actually detail every little nuance of your world view when it comes to an election. Representatives that act in the faith of the people, and not just up to election day. By making our system more democratic and giving everyone an opportunity to have a say, the United Kingdom may finally have an opportunity to feel united."
    
}