// Swiper Class
import Swiper from './components/core/core-class';
//IMPORT_COMPONENTS
import Autoplay from './components/autoplay/autoplay'
import EffectCube from './components/effect-cube/effect-cube'
const components = [
  //INSTALL_COMPONENTS
  Autoplay,
  EffectCube
];

Swiper.use(components);

//EXPORT
export default Swiper
