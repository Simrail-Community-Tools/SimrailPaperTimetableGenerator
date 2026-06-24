type Timetable = {
    nameOfPoint: string;
    nameForPerson: string;
    pointId: string; // Should always be number, parse carefully
    supervisedBy: string; // Not for LCS, for stuff like Station X track Y. Starzyny R5 has supervisedBy Starzyny
    radioChanels: string; // on none it has " "
    displayedTrainNumber: string; // Should always be number, parse carefully
    arrivalTime: string; // Should always be timestamp in the form of "yyyy-mm-dd hh:mm:ss", parse carefully
    departureTime: string; // Should always be timestamp in the form of "yyyy-mm-dd hh:mm:ss", parse carefully
    stopType: string;
    line: number;
    platform: null|string; // null on not set, roman numeral on set
    track: null|number;  // null on not set, number on set
    trainType: string;
    mileage: number;
    maxSpeed: number;
    stationCategory: null|string; // null on not set, single letter string on set
}

type TrainTimetable = {
    trainNoLocal: string; // Should always be number, parse carefully
    trainNoInternational: string; // Should always be number, parse carefully
    trainName: string;
    startStation: string;
    startsAt: string; // Should always be timestamp in the form of hh:mm:ss, parse carefully
    endStation: string;
    endsAt: string; // Should always be timestamp in the form of hh:mm:ss, parse carefully
    locoType: string;
    trainLength: number;
    trainWeight: number;
    continuesAs: string;
    runId: string;
    timetable: Timetable[];
}

export type { Timetable, TrainTimetable };