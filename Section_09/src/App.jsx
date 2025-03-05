import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import { useState } from 'react'
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleStartAddProject() {
    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined
      }
    })
  }

  function handleSelectProject(projectId) {
    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: projectId
      }
    })
  }

  const handleCreatedProject = (newProject) => {
    const project = {
      ...newProject,
      id: Math.random()
    }

    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects, project]
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined,
        projects: [...prevProjectState.projects.filter(project => project.id !== prevProjectState.selectedProjectId)]
      }
    })
  }

  const handleCreateTaks = (newTask) => {
    setProjectState(prevProjectState => {
      const task = {
        name: newTask,
        id: Math.random(),
        projectId: prevProjectState.selectedProjectId
      }

      return {
        ...prevProjectState,
        tasks: [...prevProjectState.tasks, task]
      }
    })
  }

  const handleDeleteTask = (id) => {
    setProjectState(prevProjectState => {
      return {
        ...prevProjectState,
        tasks: [...prevProjectState.tasks.filter(task => task.id !== id)]
      }
    })
  }

  const selectedProjectToShow = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject project={selectedProjectToShow} onDelete={handleDeleteProject} onAddTask={handleCreateTaks} onDeleteTask={handleDeleteTask} tasks={projectState.tasks} />;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onCreatedProjectClick={handleCreatedProject} onCancelProjectClick={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onNewProjectClick={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar onNewProjectClick={handleStartAddProject} onSelectedProjetClick={handleSelectProject} projects={projectState.projects} selectedProjectId={projectState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
