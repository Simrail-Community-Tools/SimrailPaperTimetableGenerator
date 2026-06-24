import { TrainTimetable } from "./timetableTypes";
import { createHash } from "node:crypto";

function GenerateTimetableHashes(Data: TrainTimetable[]): Map<string, string> {
    let hashes = new Map<string, string>();
    for (const train of Data) {
        hashes.set(train.trainNoLocal,
            createHash("sha224")
            .update(JSON.stringify(train))
            .digest("hex"));
    }

    return hashes;
}

export { GenerateTimetableHashes };