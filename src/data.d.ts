export interface Header {
  name: string;
  titles: string[];
}

export interface Technology {
  name: string;
  class: string;
}

export interface Project {
  title: string;
  images: string[];
  startDate: string;
  description: string;
  technologies: Technology[];
  url: string;
}

export interface Experience {
  company: string;
  title: string;
  years: string;
  mainTech: string[];
  technologies: string[];
}

export interface Social {
  name: string;
  url: string;
  class: string;
}
