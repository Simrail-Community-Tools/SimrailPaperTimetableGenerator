import { TrainTimetable } from "../timetableTypes";

function TimetablePage({ timetable, pageNumber }: {timetable: TrainTimetable, pageNumber: number }) {
  const lastPageRelativeURL = `./${pageNumber-1}.html`
  const nextPageRelativeURL = `./${pageNumber+1}.html`

  var trainNoInternationalString = "";
  if (timetable.trainNoInternational)
    trainNoInternationalString = `(${timetable.trainNoInternational})`

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

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", width: "595px" }}>
          <h5 style={{ margin: 0 }}>{timetable.trainName} {timetable.trainNoLocal} {trainNoInternationalString} Route {timetable.startStation} - {timetable.endStation}</h5>
          <h5 style={{ margin: 0 }}>{pageNumber}</h5>
        </div> 

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "842px", width: "595px", borderLeft: "1px solid black", borderRight: "1px solid black", justifyContent: "space-between"}}>

          <hr style={{width: "100%", color: "black", background: "black", height: "1px", margin: "0px"}}/>

          <div style={{ display:"flex", flexDirection: "row", alignItems: "start", height: "842px", width: "595px", marginTop: "0px" }}>
            
            <div style={{ borderRight: "1px solid black", width: "60px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black", alignContent: "center" }}>
              <div> <h4 style={{ margin: "0px" }}>Line number</h4> </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "60px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black", alignContent: "center" }}>
              <div> <h4 style={{ margin: "0px" }}>Km</h4> </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "40px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black", alignContent: "center" }}>
              <div> <h4 style={{ margin: "0px" }}>Vp</h4> </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "40px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black", alignContent: "center" }}>
              <div> <h4 style={{ margin: "0px" }}>Vl</h4> </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "150px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black", alignContent: "center" }}>
              <div> <h4 style={{ margin: "0px" }}>Station</h4> </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "60px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black", alignContent: "center" }}>
              <div> <h4 style={{ margin: "0px" }}>Time</h4> </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "60px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black" }}>
              <div>
                <div style={{ borderBottom: "1px solid black" }}> <h6 style={{ margin: "0px" }}>Loco I</h6> </div>
                <div style={{ borderBottom: "1px solid black" }}> <h6 style={{ margin: "0px" }}>Loco II</h6> </div>
                <div> <h6 style={{ margin: "0px" }}>Loco III</h6> </div>
              </div>
            </div>

            <div style={{ borderRight: "1px solid black", width: "60px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black" }}>
              <div style={{ height: "100%", alignContent: "center" }}>
                <div style={{ height: "50%", alignContent: "center" }}> <h6 style={{ margin: "0px" }}>Load</h6> </div>
                <div style={{ borderBottom: "1px solid black", width: "100%", height: "0px" }}></div>
                <div style={{ height: "50%", alignContent: "center" }}> <h6 style={{ margin: "0px"}}>Trl.len</h6> </div>
              </div>
            </div>

            <div style={{ width: "60px", height: "40px", textAlign: "center", marginTop: "0px", borderBottom: "1px solid black" }}>
              <div>
                <div style={{ borderBottom: "1px solid black" }}> <h6 style={{ margin: "0px" }}>Vmax</h6> </div>
                <div style={{ borderBottom: "1px solid black" }}> <h6 style={{ margin: "0px" }}>%</h6> </div>
                <div> <h6 style={{ margin: "0px" }}>Br.sett.</h6> </div>
              </div>
            </div>

          </div>

          <hr style={{width: "100%", color: "black", background: "black", height: "1px", marginBottom: "0px"}}/>
        </div>

      </body>
    </html>
  );
}

export { TimetablePage };