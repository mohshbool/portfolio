export interface Header {
  name: string;
  titles: string[];
}

export interface About {
  title: string;
  description: string[];
  image: string;
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
  slug: string;
  url: string;
}

export interface Experience {
  company: string;
  companyUrl: string;
  title: string;
  years: string;
  mainTechnology: string;
  slug: string;
  technologies: string[];
}

export interface Social {
  name: string;
  url: string;
  class: string;
}

export interface Extra {
  'photo-by': string;
  on: string;
  about: string;
  projects: string;
  skills: string;
  experience: string;
  copyright: string;
}
