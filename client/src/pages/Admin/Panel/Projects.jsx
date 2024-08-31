import React, { useEffect, useState } from 'react';
import ProjectCard from '../../../components/Admin/Projects/ProjectCard.jsx';
import { useOutletContext } from 'react-router-dom';
import { deleteProject } from '../../../axios/projects.js';
import Popup from '../../../components/utils/Popup.jsx';
import axios from 'axios';
import { reqFileWrapper, reqs } from '../../../axios/requests.js';

const Projects = () => {
  const { setPageTitle } = useOutletContext();
  const [projects, setProjects] = useState([]);

  const [popUp, setPopup] = useState({
    text: '',
    type: 'normal',
    state: false,
  });
  const [loading, setLoading] = useState(false);
  const handleDeleteProject = (projectId, projectName) => {
    deleteProject(projectId, projectName, setLoading, setPopup)
      .then((data) => {
        setPopup({
          text: res.data.msg,
          type: 'success',
          state: true,
        });
      })
      .catch((error) => {
        setPopup({
          text: error.msg || 'Something went wrong, please try again.',
          type: 'error',
          state: true,
        });
      });
  };

  useEffect(() => {
    setPageTitle('All Projects');
    axios
      .post(reqs.GET_PROJECT, { mode: 'all' })
      .then((res) => {
        if (res.data.succeed) setProjects(res.data.result);
      })
      .catch((err) => {
        // alert(err.response.data.msg);
      });
  }, []);

  console.log(projects);

  return (
    <div className='flex flex-row flex-wrap gap-5'>
      <ProjectCard handleDeleteProject={handleDeleteProject} />
      <ProjectCard handleDeleteProject={handleDeleteProject} />
      {projects.map((item, key) => (
        <ProjectCard
          id={item.id}
          title={item.title}
          subtitle={item.subtitle}
          img={
            item.thumbnailContents ??
            reqFileWrapper(item.thumbnailContents[0].url)
          }
          value={item.value}
          key={key}
          handleDeleteProject={handleDeleteProject}
        />
      ))}

      <Popup
        setPopup={setPopup}
        state={popUp.state}
        loading={loading}
        text={popUp.text}
        type={popUp.type}
      />
    </div>
  );
};

export { Projects };
