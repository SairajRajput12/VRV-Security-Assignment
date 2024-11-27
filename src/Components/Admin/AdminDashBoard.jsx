import React, { useEffect, useState } from 'react';
import DashBoard from '../../UI/DashBoard';
import SideBoard from '../../UI/SideBoard';
import ViewBoard from '../../UI/ViewBoard';
import Button from '../../UI/Button';
import CreateProject from './CreateProject';
import ViewProjectDashboard from './ViewProjectDashboard';
import EditProject from './EditProject';
import handleSignout from '../../util/signout';
import { Navigate, useNavigate } from 'react-router-dom';



export default function AdminDashBoard() {
  const navigate = useNavigate(); 
  const [projects,setProjects] = useState();

  const [currentState,changeState] = useState('create-project'); 
  const [userRole, setUserRole] = useState(null);
  const [useToken, setUseToken] = useState(null);

  console.log(projects)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Retrieve user role from localStorage
      const role = localStorage.getItem('userRole');
      setUseToken(token);
    }
    else{
      navigate('/'); 
    }

    // code to fetch the project data 
    const url = 'http://127.0.0.1:5000/fetch_data'; 
    const fetch_Data = async () => {
      try{
        const response = await fetch(url); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result['project_data'])
        setProjects(result['project_data']); 
      }
      catch (err) {
        setError(err.message);
      }
    };

    fetch_Data();
    console.log('data fetched succesfully !!');
    console.log(projects)
  }, [navigate]);



  function updateProjectByIndex(index, newData) {
    console.log('inside update project by index function');
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, ...newData } : project
    );
    
    setProjects(updatedProjects);
    update_to_backend(updatedProjects);
    console.log('Projects updated');
  }

  const update_to_backend = async (updatedProjects) => {
    try {
      console.log('Sending data to backend', updatedProjects);
      const response = await fetch('http://127.0.0.1:5000/update_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_data: updatedProjects }), // Corrected body structure
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log('Error in connecting with backend server:', error.message);
    }
  };

  const backend_create_project = async(updatedProjects) => {
    try {
      console.log('Sending data to backend', updatedProjects);
      const response = await fetch('http://127.0.0.1:5000/add_projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_data: updatedProjects }), // Corrected body structure
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.log('Error in connecting with backend server:', error.message);
    }
  }

  function delete_project(index) {
    console.log("Project to delete is", index);
    index = index - 1; 

    const isSure = window.confirm("Are you sure you want to delete this project?");
    if (!isSure) {
      console.log("Project deletion cancelled.");
      return; // Exit the function if the user does not confirm
    }

    // Remove the project from the list
    const updatedProjects = projects.filter((_, i) => i !== index);
  
    // Update the state
    setProjects(updatedProjects);
  
    // Send updated data to the backend
    update_to_backend(updatedProjects);
  
    console.log("Project deleted successfully!");
  }
  

  

  let content = null; 
  if(currentState === 'create-project'){
    content = <CreateProject update_to_backend={backend_create_project} />
  }
  else if(projects != null && currentState === 'view-project'){
    content = <ViewProjectDashboard projects={projects} />
  }
  else{
    content = <EditProject delete_project={delete_project} updateProjectByIndex={updateProjectByIndex} projects={projects} />
  }



  return (
    <>
      <DashBoard>
        <SideBoard>
          <Button onSubmit = {() => changeState('create-project')} className="project-button">Create Project</Button>
          <Button onSubmit = {() => changeState('view-project')} className="project-button">View Project Status</Button>
          <Button onSubmit = {() => changeState('sairaj-is-best')} className="project-button">Edit Project</Button>
          <Button className="project-button" onSubmit={handleSignout}>Signout</Button>
        </SideBoard>
        <ViewBoard>
            {content}
        </ViewBoard>
      </DashBoard>
    </>
  );
}
