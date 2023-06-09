import LoginPageBackground from '@assets/images/login-page-background.jpg'
import Image from 'next/image'

export default function Login() {
  return (
    <div>
        <Image src={LoginPageBackground} alt={'Background'} width={1200}/>
    </div>
  )
}
