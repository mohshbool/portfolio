import React from 'react';

import './App.scss';

import data from './data.json';

import Header from 'components/Header';
import About from 'components/About';
import Projects from 'components/Projects';
import Skills from 'components/Skills';
import Experience from 'components/Experience';
import Footer from 'components/Footer';

const App = () => {
  return (
    <div>
      <Header data={data.header} />
      <About data={data.about} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Experience data={data.experience} />
      <Footer social={data.social} name={data.header.name} />
    </div>
  );
};

export default App;
