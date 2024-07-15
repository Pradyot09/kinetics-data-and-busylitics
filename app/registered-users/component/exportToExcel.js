import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName, table) => {
  // Define the headers to match the table
  const headers =
  table === "flha"
  ? [
      "Name & Email",
      "PPE Inspected",
      "Date",
      "Work Area Clean",
      "Material storage",
      "Dust/MistFumes",
      "Noise in Areas",
      "Extreme Temperatures",
      "Spill Potential",
      "Waste Property Manager",
      "Excavation Permit Request",
      "Other Workers In Area",
      "Weather Conditions",
      "MSDS Reviewed",
      "Awkward body position",
      "Over extension",
      "Prolonged twisting",
      "Working in tight area",
      "Lift too heavy",
      "Hands not in sight",
      "Working above head",
      "Site Access/Road Conditions",
      "Scafold(Inspected & Teagged)",
      "Ladders(Tied Off)",
      "Slips/Trips",
      "Hoisting (Tools,Equipment",
      "Excavation(Alarms,Routes)",
      "Confined Space Entry Permit Required",
      "Barricades & Signs in Place",
      "Hole Coverings Identified",
      "Trenching/underground Structures ",
      "Rig Guide Lines",
      "Power Lines",
      "Falling Items",
      "Hoisting or Moving Loads Overhead",
      "Proper Tools For The Job",
      "Equipment/Tools Inspected",
      "Tank Plumbing",
      "Hoses Inspected",
      "High Pressure",
      "High Temperature Fluids",
      "Procedure Not Available For Task",
      "Confusing Instructions",
      "No Training For Task or Tools to be Used",
      "First Time Performing The Task",
      "Working Alone",
      "All Hazard Remaining",
      "All Permits Closed Out",
      "Any Incident",
      "Area Cleaned up at the end",
      "Master point location"

    ]
      : [
          "FullName",
          "Email",
          "CompanyName",
          "BirthDate",
          "CompanyID",
          "CreatedAt",
          "JobID",
          "JoinedDate",
          "ProfilePic",
          "Role",
          "SiteID",
        ];

  // Format data to match the table structure
  const formattedData =
    table === "flha"
      ? data.map((flha) => {
        // console.log(flha);
          const flhfData = flha.data.flhf.reduce((acc, item, index) => {
            acc[headers[index + 3]] = item;
            return acc;
          }, {});

          const ergonomicsData = flha.data.ergonomics.reduce((acc, item, index) => {
            acc[headers[index + 3 + flha.data.flhf.length]] = item;
            return acc;
          },{});

          const aeHazardsData = flha.data.aeHazards.reduce((acc, item, index) => {
              acc[headers[index + 3 + flha.data.flhf.length + flha.data.ergonomics.length]] = item;
              return acc;
          },{});

          const ouHazardsData = flha.data.ouHazards.reduce((acc, item, index) => {
              acc[headers[index + 3 + flha.data.flhf.length + flha.data.ergonomics.length
                 + flha.data.aeHazards.length]] = item;
              return acc;
          },{});

          const evtHazardsData = flha.data.evtHazards.reduce((acc, item, index) => {
              acc[headers[index + 3 + flha.data.flhf.length + flha.data.ergonomics.length
                 + flha.data.aeHazards.length + flha.data.ouHazards.length]] = item;
              return acc;
          },{});

          const plHazardsData = flha.data.plHazards.slice(0,-1).reduce((acc, item, index) => {
            acc[headers[index + 3 + flha.data.flhf.length + flha.data.ergonomics.length
               + flha.data.aeHazards.length + flha.data.ouHazards.length
              + flha.data.evtHazards.length]] = item;
            return acc;
          },{});

          return {
            "Name & Email": `${flha.user_name}\n${flha.user_email}`,
            "PPE Inspected": `${flha.data.ppe_inspected ? 'True':'False'}`,
            "Date": `${new Date((flha.submitted_at.seconds * 1000) + (flha.submitted_at.nanoseconds / 1000000)).toISOString().split('T')[0]}`,
            ...flhfData,
            ...ergonomicsData,
            ...aeHazardsData,
            ...ouHazardsData,
            ...evtHazardsData,
            ...plHazardsData,
            "All Hazard Remaining": `${flha.data.job_completion.all_hazard_remaining ? "True" : "False"}`,
            "All Permits Closed Out": `${flha.data.job_completion.all_permits_closed_out ? "True" : "False"}`,
            "Any Incident": `${flha.data.job_completion.any_incident ? "True" : "False"}`,
            "Area Cleaned up at the end":`${flha.data.job_completion.area_cleaned_up_at_end ? "True" : "False"}`,
            "Master point location": `${flha.data.master_point_location}`
          };
        })
      : data.map((user) => ({
          FullName: user.fullName,
          Email: user.email,
          CompanyName: user.companyName,
          BirthDate: user.birthDate,
          CompanyID: user.companyID,
          CreatedAt: user.createdAt,
          JobID: user.jobID,
          JoinedDate: user.joinedDate,
          ProfilePic: user.profilePic,
          Role: user.role,
          SiteID: user.siteID,
        }));

  // Create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData, {
    header: headers,
  });
  const workbook = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "FLHA");

  // Write the workbook to a file and trigger a download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
