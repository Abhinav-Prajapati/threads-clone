"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "zod";
import { userValidationSchema } from "@/lib/validation/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
interface AccountProfileProps {
  user: {
    id: String;
    objectId: String;
    userName: String;
    bio: String;
    image: String;
  };
  btnTitle: String;
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  const form = useForm({
    resolver: zodResolver(userValidationSchema),
    defaultValues: { profilePhoto: "", name: "", userName: "", bio: "" },
  });
  const onSubmit = (value: z.infer<typeof userValidationSchema>) => {
    console.log(value);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-lable">
                {
                  field.value?(
                  <Image src={field.value} width={96} height={96} alt="Profile pic" className=" rounded-full object-center" />):
                  <Image src="/assets/profile.svg" width={24} height={24} alt="Profile pic" className=" rounded-full object-center" />)
                }
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
