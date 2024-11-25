import React from 'react';
import './ViewProjectDashboard.css'; // Importing external CSS

export default function ViewProjectDashboard({projects}) {
  return (
    <div className="App">
      <h1>Your Projects</h1>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Status</th>
            <th>Project Manager</th>
            <th>Starting Date</th>
            <th>Expected Date to finish</th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows */}
          {projects.map((user,index) => {
              let color = null; 
              if(user.ProjectStatus === 'Completed'){
                color = 'green'; 
              }
              else if(user.ProjectStatus === 'Ongoing'){
                color = 'blue'; 
              }
              else{
                color = 'red';
              }
              return(
                <tr>
                  <td style={{fontWeight:'bold'}}>{user.name}</td>
                  <td style={{margin:'12px',color:color,fontWeight:'bold'}}>{user.ProjectStatus}</td>
                  <td>{user.Project_Manager}</td>
                  <td>{user.Starting_Date}</td>
                  <td>{user.Ending_Date}</td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </div>
  );
}
