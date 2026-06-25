import React from "react";
import { TrainTimetable } from "../timetableTypes";

function TrainCompositionPage({ timetable, pageNumber }: {timetable: TrainTimetable, pageNumber: number }) {
  const lastPageRelativeURL = `./${pageNumber-1}.html`
  const nextPageRelativeURL = `./${pageNumber+1}.html`

  var trainNoInternationalString = "";
  if (timetable.trainNoInternational)
    trainNoInternationalString = `(${timetable.trainNoInternational})`
  
  var locoArray = [];
  locoArray.push(timetable.locoType);
  for (let i = 0; i < 45; i++) {
    locoArray.push(null);
  }

  const divider = { width: "100%", height: "0px", borderTop: "1px solid black" };

    const vehicleColumns: { key: string; label: string; width: string; align?: "left" | "center" | "right" }[] = [ // more code here should work like this...
      { key: "index",                 label: "#",                       width: "15px",  align: "right" },
      { key: "countryOfRegistration", label: "Country of Registration", width: "80px"  },
      { key: "owner",                 label: "Rail Vehicle Owner",      width: "80px"  },
      { key: "type",                  label: "Type (class)",            width: "80px"  },
      { key: "ownerNumber",           label: "Vehicle Owner's Number",  width: "180px" },
      { key: "length",                label: "Vehicle Length",          width: "50px"  },
      { key: "loadWeight",            label: "Load Weight",             width: "50px"  },
      { key: "ownWeight",             label: "Own Weight",              width: "50px"  },
    ];

    const columnCellStyle = (col: typeof vehicleColumns[number], isLast: boolean): React.CSSProperties => ({
      boxSizing: "border-box",
      width: col.width,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: col.align === "left" ? "flex-start" : col.align === "right" ? "flex-end" : "center",
      textAlign: col.align ?? "center",
      borderRight: isLast ? "none" : "1px solid black",
    });

    function buildRowData(locoType: string|null, rowIndex: number) { // get more real data, apis.simrail.tools/docs might have some good endpoints, we could also get live trains and cache them but that would not be optimal.
      if (locoType === null) {
        return { index: rowIndex + 1, countryOfRegistration: "", owner: "", type: "", ownerNumber: "", length: "", loadWeight: "", ownWeight: "" };
      }
      return {
        index: rowIndex + 1,
        countryOfRegistration: "PL",
        owner: "PKP",
        type: locoType,
        ownerNumber: "N/A",
        length: "N/A",
        loadWeight: "N/A",
        ownWeight: "N/A",
      };
    }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{`${timetable.trainNoLocal} - Page ${pageNumber}`}</title>
      </head>
      <body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div style={{ alignItems: "end" }}>
          <a href={lastPageRelativeURL}><button>Last page</button></a>
          <a href={nextPageRelativeURL}><button>Next page</button></a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "100px", width: "595px", borderLeft: "1px solid black", borderRight: "1px solid black", justifyContent: "space-between"}}>

          <div style={divider} />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "595px", height: "50px" }}>
            <h2 style={{ margin: 5 }}>TRAIN FORMATION</h2>
          </div> 

          <div style={divider} />

          <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%",  height: "15px"}}>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", width: "110px" }}>
              <h5 style={{ margin: 1 }}>Train number</h5>
            </div>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", width: "180px" }}>
              <h5 style={{ margin: 1 }}>{timetable.trainNoLocal}</h5>
            </div>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", flex: 1 }}>
            </div>

            <div style={{ flex: 1 }}>

            </div>

          </div>

          <div style={divider} />

          <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%",  height: "15px"}}>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", width: "110px" }}>
              <h5 style={{ margin: 1 }}>From station</h5>
            </div>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", width: "180px" }}>
              <h5 style={{ margin: 1 }}>{timetable.startStation}</h5>
            </div>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", flex: 1 }}>
            </div>

            <div style={{ flex: 1 }}>

            </div>

          </div>

          <div style={divider} />

          <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%",  height: "15px"}}>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", width: "110px" }}>
              <h5 style={{ margin: 1 }}>To station</h5>
            </div>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", width: "180px" }}>
              <h5 style={{ margin: 1 }}>{timetable.endStation}</h5>
            </div>

            <div style={{ borderRight: "1px solid black", height: "100%", textAlign: "center", flex: 1 }}>
            </div>

            <div style={{ flex: 1 }}>

            </div>

          </div>

          <div style={divider} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "742px", width: "595px", borderLeft: "1px solid black", borderRight: "1px solid black", marginTop: "1px" }}>

          <div style={divider} />

          <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%", height: "60px" }}>
            {vehicleColumns.map((col, i) => (
              <div key={col.key} style={columnCellStyle(col, i === vehicleColumns.length - 1)}>
                <h5 style={{ margin: 1 }}>{col.label}</h5>
              </div>
            ))}
          </div>

          <div style={divider} />

          {locoArray.map((locoType, rowIndex) => {
            const row = buildRowData(locoType, rowIndex);
            return (
              <React.Fragment key={rowIndex}>
                <div style={{ margin: "0px", display: "flex", flexDirection: "row", alignItems: "stretch", width: "100%", height: `30px` }}>
                  {vehicleColumns.map((col, i) => (
                    <div key={col.key} style={columnCellStyle(col, i === vehicleColumns.length - 1)}>
                      <h6 style={{ margin: 1 }}>{(row as any)[col.key]}</h6>
                    </div>
                  ))}
                </div>
                <div style={divider} />
              </React.Fragment>
            );
          })}

        </div>

      </body>
    </html>
  );
}

export { TrainCompositionPage }