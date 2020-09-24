// Swiper Class
import Swiper from './components/core/core-class';
//IMPORT_COMPONENTS
import Autoplay from './components/autoplay/autoplay'
import EffectCube from './components/effect-cube/effect-cube'
import EffectCoverflow from './components/effect-coverflow/effect-coverflow'
const components = [
  //INSTALL_COMPONENTS
  Autoplay,
  EffectCube,
  EffectCoverflow
];

Swiper.use(components);

//EXPORT
export default Swiper
