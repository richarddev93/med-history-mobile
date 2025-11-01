import Reactotron from 'reactotron-react-native'

// ⚠️ o nome 'MedHistory' aparece no app desktop
const reactotron = Reactotron
  .configure({
    name: 'MachCare',
    host: '192.168.15.9'
  })
  .useReactNative({
    networking: true,
    editor: false,
    overlay: false,
  })
  .connect()

console.tron = reactotron
console.tron.logImportant = reactotron.logImportant

export default reactotron
