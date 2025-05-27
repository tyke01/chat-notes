import AuthForm from "@/components/auth-form";
import {
    Card,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

const SignUpPage = () => {
  return (
    <div className="mt-10 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="mb-4">
          <CardTitle className="text-center text-3xl">SignUp</CardTitle>
          {/* <CardDescription>SignUp to your account</CardDescription> */}
        </CardHeader>

        <AuthForm type="signUp" />
      </Card>
    </div>
  );
};

export default SignUpPage;
