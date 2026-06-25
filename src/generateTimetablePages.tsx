import * as fs from "fs";
import prettier from "prettier";
import ReactDOMServer from "react-dom/server";
import { TrainTimetable } from "./timetableTypes";
import React from "react";

import { TimetableStartPage } from "./timetablePages/startPage";
import { TrainCompositionPage } from "./timetablePages/trainCompositionPage";
import { TimetablePage } from "./timetablePages/timetablePage";

/*
  This file should really be cleaned up.
  Pages can be split in to diffrent files, styles can be switched to CSS files.
*/

async function GenerateTimetablePage(OutputPath: string, Timetable: TrainTimetable, PageIndex: number) {
  let html;

  if (PageIndex == 1)
    html = ReactDOMServer.renderToStaticMarkup(<TimetableStartPage timetable={Timetable} />);
  else 
    html = ReactDOMServer.renderToStaticMarkup(<TimetablePage timetable={Timetable} pageNumber={PageIndex} />)

  let htmlDoc = "<!DOCTYPE html>" + html;

  await fs.promises.writeFile(`${OutputPath}/${PageIndex}.html`, htmlDoc);
}

async function GeneratedTrainCompositionPage(OutputPath: string, Timetable: TrainTimetable, PageIndex: number) {
  let html;
  html = ReactDOMServer.renderToStaticMarkup(<TrainCompositionPage timetable={Timetable} pageNumber={PageIndex} />)
  let htmlDoc = "<!DOCTYPE html>" + html;

  await fs.promises.writeFile(`${OutputPath}/${PageIndex}.html`, htmlDoc);
}

function GenerateTimetablePages(Data: TrainTimetable[]) {
  const outputPath = "./output";
  fs.mkdirSync(outputPath, { recursive: true });

  var i = 0;
  for (const train of Data) {
    const thisTrainsOutputPath = `${outputPath}/${train.trainNoLocal}`;
    fs.mkdirSync(thisTrainsOutputPath, { recursive: true });

    GenerateTimetablePage(thisTrainsOutputPath, train, 1);
    GenerateTimetablePage(thisTrainsOutputPath, train, 2);
    GenerateTimetablePage(thisTrainsOutputPath, train, 3);
    GenerateTimetablePage(thisTrainsOutputPath, train, 4);
    GenerateTimetablePage(thisTrainsOutputPath, train, 5);
    GeneratedTrainCompositionPage(thisTrainsOutputPath, train, 6);

    i++;
    console.log(`Generated ${i}/${Data.length}`);
  }

}

export { GenerateTimetablePages };