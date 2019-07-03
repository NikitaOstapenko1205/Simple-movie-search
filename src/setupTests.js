import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// global.shallow = shallow
// global.render = render
// global.mount = mount
// //global.toJson = toJson

// // Fail tests on any warning
// console.error = message => {
//   throw new Error(message)
// }

// const raf = (global.requestAnimationFrame = cb => {
//   setTimeout(cb, 0)
// })

// export default raf
