import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'
 
// define your variable fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["200"]
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"]
})

// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ 
  subsets: ["latin"],
  weight: '400' })

const sourceCodePro700 = Source_Sans_3({ 
  subsets: ["latin"],
  weight: '700' }
)

export { inter, lora, sourceCodePro400, sourceCodePro700 }