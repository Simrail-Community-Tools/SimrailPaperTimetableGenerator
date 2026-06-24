# Simrail paper timetable generator
This is a tool that automatically generates paper timetables for the game simrail based on the multiplayer timetables. Paper timetables automatically get pushed to the Simrail paper timetables repo. Plans for the future are to add a function to generate custom timetables for use in singleplayer scenarios aswell.

## Why not use x or y's timetables instead?
Whilst we acknowledge that there are other paper timetable tools some even used for the game itself we want something open source under a respectable license our motto is "For the community, by the community"

## How to generate singleplayer timetables
Change the json file in the input foler and set settings to use local timetable data.

## Affiliation
Please not we are not affiliated with Simrail, Simkol or Playway. This project is a community project made to improve the game for players.

## How it works
The idea is to use the open API to get all the timetables, generate a hash and timetables based on the data. With this generated hash we can regenerate a hash every x hours and compare it to see if the timetables has changed. If the timetables have changed we regenerate them and save this new hash. This would all be maintained trough github actions to ensure the project is working long-term.

## Special thanks
Thanks to all our contributers aswell as:<br>
Coldy - [Paper timetable creation tool for singleplayer made in excel](https://cdn.discordapp.com/attachments/1071796387781562378/1418301642289451100/Simrail_Timetable_Template_For_Custom_Scenarios_by_Coldy.xlsx?ex=6a3a2696&is=6a38d516&hm=ab359bd6317e3d3ec7b73d926c3ed59e0c284386e8ee73e7206ee4dd33155fdc&)