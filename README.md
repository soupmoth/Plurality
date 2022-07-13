# Plurality
 
 Plurality is a project dedicated to highlighting the strengths and weaknesses of different electoral systems, and is pushing for Electoral Reform in the United Kingdom, where the system currently used is Single-Member Constituencies with Plurality, commonly referred to as "First Past the Post"

 The project hopes to do the following with the final product.

 -A map of all constituencies and their voting habits as a simple baseline.

 -Demonstrations of how different electoral systems would change the results and the overall proportionality of the system.

 -Customisations of the simulations and highlighting of individual constituencies for further data visualisation.

 -A write up of common arguments against alternative systems to First Past the Post and why the simulation shows otherwise.



For the customisations aspect.

-A component which dictates how many voters in a FPTP system vote tactically and don't truly vote for their favourite party. This means that these votes are reallocated from the 2 most electable parties in a given constituency. 



The Ranked Choice simulation difficulty


Ranked Choice is the most complex voting system to simulate. It's easy to redistrubute votes proportionally based on the existing shares and how many people we mark as tactical voters in a Multi-Member Constituency with Plurality voting, we simply just chop that percentage off from the main parties by adding up their total share, taking that percent away, proportionally adjusting their individual polling rates, then giving out those old votes back to the other parties by essentially reversing that process. We take their current proportions compared to each other, then allocate votes based on those proportions. For example, if the Green party made up 50% of the small party votes, then the Green party would receive 50% of the tactical voters' reallocated ballots. 

This is great for representing how tactical voting changes results, and can even make this look nice in Ranked Choice, but Ranked Choice is fundamentally different then Plurality, and your vote tends to carry between many different channels. 

The assumptions will be as follows

-The electorate splits proportionally based on the similarites of the other options to their previous choice.

-This mean extremer parties flow back to the middle, which makes the most sense in AV and STV

Therefore, this limit will be by grouping similar parties together based on their self-described leanings and the ones documented on Wikipedia. A Left Winged voter will ranked choice only left winged parties and the Lib-Dems until they hit Labour, and a Right winged voter will ranked choice only right winged parties and the Lib-Dems. As the Lib-Dems are Centrist to Centre-Right, we'll have them prefer Tories over Labour, but place Labour as third, wanting the least extreme parties.


This decision is done in hopes to make the system slightly more accurate to real voting behaviours.

For "Independants/Other", we'll assume that they are a "centre" party. This isn't always accurate.

This will not result in a 100% accurate simulation, which is unfortunate, but ok, as the aims of this project is simply to demonstrate an alternative United Kingdom, where we can vote how we wish, and have a fairer democracy built upon collaboration and unity. 

(This does mean in such a system, the closest thing to tactically keeping out a party or specific MP, is essentially just ranking them last after ranking every other candidate)