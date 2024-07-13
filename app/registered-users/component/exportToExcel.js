import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName, table) => {
  // Define the headers to match the table
  const headers =
    table === "flha"
      ? [
          "Name & Email",
          "Date",
          "Awkward body position",
          "Over extension",
          "Prolonged twisting",
          "Working in tight area",
          "Lift too heavy",
          "Hands not in sight",
          "Working above head",
          "Working area clean",
          "Material storage",
          "Dust/Mist",
          "Noise in areas",
          "Extreme Temperatures",
          "Spill Potential",
          "Waste Property Manager",
          "Excavation Permit Request",
          "Other Workers In Area",
          "Weather Conditions",
          "MSDS Reviewed",
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
          const flhfData = flha.data.flhf.reduce((acc, item, index) => {
            acc[headers[index + 2]] = item;
            return acc;
          }, {});
          const aeHazardsData = flha.data.aeHazards.reduce(
            (acc, item, index) => {
              acc[headers[index + 2 + flha.data.flhf.length]] = item;
              return acc;
            },
            {}
          );

          return {
            "Name & Email": `${flha.user_name}\n${flha.user_email}`,
            Date: new Date(flha.data.date).toLocaleDateString(),
            ...flhfData,
            ...aeHazardsData,
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
