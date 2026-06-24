import { GenerateTimetableHashes } from "./hashFunctions";
import { GetTimetableData } from "./getTimetableData";
import { GenerateTimetablePages } from "./generateTimetablePages"
import { TrainTimetable } from './timetableTypes';
import Settings from './settings/settings.json'
import * as fs from "fs";

console.log("Hello World!");

async function Main() {
    if (Settings.LocalTrainData) {
        const timetableDataString = fs.readFileSync(`./input/input.json`).toString();
        const timetableData = JSON.parse(timetableDataString) as TrainTimetable;
        let timetableArray: TrainTimetable[] = [];
        timetableArray.push(timetableData);
        GenerateTimetablePages(timetableArray);
        return;
    }

    let timetableData = await GetTimetableData();
    const hashes = await GenerateTimetableHashes(timetableData);

    const hashesJson: { [key: string]: string } = {};
    hashes.forEach((value, key) => {
        hashesJson[key] = value;
    })

    const runInfoPath = "./RunInfo"
    fs.mkdirSync(runInfoPath, { recursive: true });

    const files = fs.readdirSync(runInfoPath);

    if (files.length >= 5) { // API might not show all trains therefor we hash, but trains may be removed, if not shown in the latest 5 hashes then it is more likley gone (based that the bot will run every 6, 12 or 24h) and not 5 times in a minute, for local generation hasing can be disabled to avoid problems
        const oldestFile = files.sort((a, b) => {
            return parseInt(a) - parseInt(b);
        }).at(0);
        fs.rmSync(`${runInfoPath}/${oldestFile}`); 
    }

    const thisRunInfoPath = `${runInfoPath}/${Date.now()}.json`;
    fs.writeFileSync(thisRunInfoPath, JSON.stringify(hashesJson, null, 4));

    let trainsToGenerate = [];
    if (!Settings.SkipHashMatching) {
        const runInfoPath = "./RunInfo"
        const outputPath = "./output"

        let infoFiles = fs.readdirSync(runInfoPath);
        const outputfiles = fs.readdirSync(outputPath);

        infoFiles = infoFiles.sort((a, b) => {
            return parseInt(b) - parseInt(a);
        });

        if (infoFiles.length >= 2) {
            const latestInfoFileData = fs.readFileSync(`${runInfoPath}/${infoFiles.at(0)}`).toString();
            let latestInfoJsonData = JSON.parse(latestInfoFileData);
            const oldInfoFileData = fs.readFileSync(`${runInfoPath}/${infoFiles.at(1)}`).toString();
            let oldInfoJsonData = JSON.parse(oldInfoFileData);

            for (const entry in latestInfoJsonData) {
                if (Object.keys(oldInfoJsonData).includes(entry)) { // existed in last run
                    if (latestInfoJsonData[entry] != oldInfoJsonData[entry]) {
                        trainsToGenerate.push(entry);
                    }
                } else { // did not exist in last run
                    trainsToGenerate.push(entry);
                }
            }
        } else  { // if no older runs then generate all trains
            for (const entry of timetableData) {
                trainsToGenerate.push(entry.trainNoLocal);
            }
        }

        let trainsFoundInRunFiles: String[] = [];
        for (const entry of infoFiles) {
            const infoFileData = fs.readFileSync(`${runInfoPath}/${entry}`).toString();
            let infoJsonData = JSON.parse(infoFileData);

            for (const entry in infoJsonData) {
                if (!trainsFoundInRunFiles.includes(entry)) {
                    trainsFoundInRunFiles.push(entry)
                }
            }

        }

        for (const entry of outputfiles) {
            if (!trainsFoundInRunFiles.includes(entry)) {
                console.log(`${entry} has not been seen in the latest 5 runs, deleting!`)
                fs.rmSync(`${outputPath}/${entry}`, { recursive: true, force: true });
            }
        }

        if (trainsToGenerate.length > 0)
            console.log(`Generating: ${trainsToGenerate}`);
    }

    if (!Settings.GenerateAllTrains) {
        timetableData = timetableData.filter((train) => {
            return Settings.Trains.includes(train.trainNoLocal);
        })
    }

    if (!Settings.SkipHashMatching) {
        timetableData = timetableData.filter((train) => {
            return trainsToGenerate.includes(train.trainNoLocal);
        })
    }

    GenerateTimetablePages(timetableData);
}

Main();