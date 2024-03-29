import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
function Report() {
    const [reportData, setReportData] = useState([]);
    const fetchReportData = async () => {
        const teamID = sessionStorage.getItem("TeamID");
    
        await axios
          .get(`http://localhost:3001/Team/FetchTheReportData?TeamId=${teamID}`)
          .then((res) => {
            let list = res.data;
            let reportData = list.data;
            setReportData(reportData);
            // (project);
          });
      };
    
      useEffect(() => {
        fetchReportData();
      }, []);


      function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
    
        // Extract date and time components
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
    
        // Concatenate date and time
        const formattedDateTime = `${date}  ${time}`;
    
        return formattedDateTime;
    }

  return (
    <div className="w-full h-full mt-10">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4 h-screen">
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Project Report
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-gray-200">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">TL Name</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">TimeStamp</th>
                    <th className="p-2">Files</th>
                    <th className="p-2">Comment Of TL</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(
                    (
                      {
                        Upload_id,
                        TL_fname,
                        TL_lname,
                        Team_name,
                        File_name,
                        Description,
                        Uploaded_at,
                        Comment,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Team_name}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {TL_fname} {TL_lname}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Description}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {formatDateTime(Uploaded_at)}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4 " title="Download">
                          <a
                            href={require(`../../Excel/${File_name}`)}
                            download={File_name}
                            target="_blank"
                            className="text-blue-900"
                          >
                            {File_name}
                          </a>
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {Comment}
                        </td>
                        
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;