import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DateTimeUtility } from "@/lib/utils/DateTimeUtility";

const RegesterdFLHATable = ({
  currentCompanyName,
  admin,
  sortBy = "name",
  sortDirection = "asc",
}) => {
  const [items, setItems] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.user_name.localeCompare(b.user_name)
          : b.user_name.localeCompare(a.user_name);
      } else if (sortBy === "date") {
        const dateA = new Date(a.data.date);
        const dateB = new Date(b.data.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
    return sortedData;
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "FLHA"));
        const flhaData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Optionally include document ID
        }));

        let updatedSelectedData = flhaData;
        if (!admin && currentCompanyName) {
          updatedSelectedData = flhaData.filter(
            (item) => item.company_name === currentCompanyName
          );
        }

        // Sort the data
        updatedSelectedData = sortData(updatedSelectedData);

        setItems(flhaData);
        setSelectedData(updatedSelectedData);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchItems();
  }, [admin, currentCompanyName, sortBy, sortDirection]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">User FLHA Information</h2>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-100">
        <thead className="bg-yellow-100 w-full">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name & Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              PPE Inspected
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
              Work Area Clean - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
              Material Storage Identified - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white  uppercase tracking-wider bg-gray-500"
            >
              Dust/Mist/Fumes - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Noise in Area - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
              Extreme Temparatures - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
              Spill Potential - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Waste Properly Managed - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
              Excavation Permit Required - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
              Other Workers in Area - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Weather Conditions - EH
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
              MSDS Reviewed - EH
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Awkward body position - ER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Over Extension - ER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Prolonged Twisting/Bending Motion - ER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Working in tight Area - ER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Lift Too Heavy/awkward to Lift - ER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
              Hands Not in line of sight - ER
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Working Above your head - ER
            </th>


            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Site Access/Road conditions - AEg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Scaffold(Inspected & tagged) - AEg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Ladders(tied off) - AEg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Slips/Trips - AEg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Hoisting (Tools,Equipment etc) - AEg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Excavation(alarms,routes etc) - AEg
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Confined Space Entry permit required - AEg
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Barricades & signs in place - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Hole coverings identified - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Trenching/underground structures - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Rig guide lines - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Power lines - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Falling items - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Hoisting or moving loads overhead - OU
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Proper tools for the job - Evt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Equipment/tools inspected - Evt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Tank plumbing - Evt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             Hoses inspected - Evt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             High pressure - Evt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-gray-500"
            >
             High temparature fluids - Evt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Procedure not available for task - PL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Confusing instructions - PL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             No training for task or tools to be used - PL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             First time performing the task - PL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
             Working alone - PL
            </th>

            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
            All Hazard Remaining
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
            All Permits Closed Out
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
            Any Incident
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
            Area Cleaned Up At End
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black  uppercase tracking-wider bg-green-100"
            >
            Master Point Location
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {selectedData.map((flha, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {flha.user_name} <br />
                  {flha.user_email}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {flha.data.ppe_inspected ? "True" : "False"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  <DateTimeUtility timestamp={flha.submitted_at}></DateTimeUtility>
                </div>
              </td>
              {flha.data.flhf.map((item, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item}
                  </div>
                </td>
              ))}
              {flha.data.ergonomics.map((item, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item}
                  </div>
                </td>
              ))}
              {flha.data.aeHazards.map((item, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item}
                  </div>
                </td>
              ))}
               {flha.data.ouHazards.map((item, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item}
                  </div>
                </td>
              ))}
               {flha.data.evtHazards.map((item, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item}
                  </div>
                </td>
              ))}
                {flha.data.plHazards.slice(0,-1).map((item, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item}
                  </div>
                </td>
              ))}
               <td  className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {flha.data.job_completion.all_hazard_remaining ? "True" : "False"}
                 </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {flha.data.job_completion.all_permits_closed_out ? "True" : "False"}
                 </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {flha.data.job_completion.any_incident ? "True" : "False"}
                 </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                     {flha.data.job_completion.area_cleaned_up_at_end ? "True" : "False"}
                  </div>
               </td>
               <td  className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                     {flha.data.master_point_location}
                  </div>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegesterdFLHATable;
