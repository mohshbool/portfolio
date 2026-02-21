import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import '@/scss/themes/theme-dark.scss';
import '@/scss/themes/theme-light.scss';
import '@/scss/dark-slider.scss';
import '@/scss/light-slider.scss';
import '@/index.scss';
import '@/App.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
