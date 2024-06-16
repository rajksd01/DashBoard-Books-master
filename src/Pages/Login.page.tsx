import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "@/http/api.http";
import { LoaderCircle } from "lucide-react";

import { useAppDispatch } from "@/store/hooks";
import { addUserDetails } from "@/slices/userSlice";

function Login() {
  // making a react query call
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  // making a react mutation call
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log(response.data);
      dispatch(
        addUserDetails({
          userId: response.data.userId,
          token: response.data.token,
        })
      );

      toast.success("Logged In Successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/dashboard/home");
      }, 1000);
    },
    onError: (error) => {
      toast.error(`Invalid Credentials ${error?.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    },
  });

  // handling inputs submit
  const handleFormSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      toast.error("Provide Complete Credentials!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    mutation.mutate({ email, password });
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" ref={passwordRef} type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleFormSubmit}>
            {mutation.isPending ? (
              <span>
                <LoaderCircle className="animate-spin" />
              </span>
            ) : (
              ""
            )}
            Sign in
          </Button>
          <ToastContainer />
        </CardFooter>
        <div className="mt-4 mb-2 pb-4 text-center text-sm">
          Don't Have an Account?{" "}
          <Link to="/auth/register" className="underline">
            Register Here
          </Link>
        </div>
      </Card>
    </section>
  );
}

export default Login;
