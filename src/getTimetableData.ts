import fetch from 'node-fetch';
import { SimrailTimetableAPI } from './urls'
import { TrainTimetable } from './timetableTypes';

async function GetTimetableData() {
    const response = await fetch(SimrailTimetableAPI, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get timetables from api!');
    }

    const result = (await response.json()) as TrainTimetable[];
    result.forEach(timetable => {
        timetable.runId = "";
        timetable.timetable.forEach(timetablePoint => {
            timetablePoint.arrivalTime = timetablePoint.arrivalTime.split(" ")[1] as string;
            timetablePoint.departureTime = timetablePoint.departureTime.split(" ")[1] as string;
        })
    }); // We strip this data to end up with a timetables that is the same every time and therefor can accurately be used to determine if the trains timetable has changed

    return result;
}

export { GetTimetableData };