
import AuthForm from '@/components/auth-form'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const LoginPage = () => {
  return (
    <div className='mt-10 flex flex-1 flex-col items-center'>
      <Card className='w-full max-w-md'>
        <CardHeader className='mb-4'>
          <CardTitle className='text-center text-3xl'>Login</CardTitle>
          {/* <CardDescription>Login to your account</CardDescription> */}
        </CardHeader>

       <AuthForm type="login"/>
      </Card>
    </div>
  )
}

export default LoginPage
