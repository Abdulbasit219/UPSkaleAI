"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signupSchema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  const [username, setUserName] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setisCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUserName, 500);

  const router = useRouter();

  // zod
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/signup", data);
      toast.success(response.data.message);
      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("There was a problem with your sign-up. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Check username availability
  useEffect(() => {
    const checkUniqueUserName = async () => {
      if (!username) {
        setUsernameMessage("");
        return;
      }

      setisCheckingUserName(true);
      setUsernameMessage("");
      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${username}`
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        setUsernameMessage(
          error.response?.data?.message || "Error checking username"
        );
      } finally {
        setisCheckingUserName(false);
      }
    };
    checkUniqueUserName();
  }, [username]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            signup
          </h1>
          <p className="mb-4">subheading</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Username
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Username"
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {isCheckingUsername && (
                    <div className="flex items-start mt-1">
                      <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${usernameMessage === "Username is Available" ? "text-green-500" : "text-red-500"}`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Email"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </FieldGroup>
        </form>

        <div className="text-center mt-4">
          <p>
            Already a member?
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

