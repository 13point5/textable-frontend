import Logo from "@/assets/Logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { axiosInstance } from "@/api/axios";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  password: z.string(),
});

type Props = {
  setAllowed: (allowed: boolean) => void;
};

export const PasswordPage = ({ setAllowed }: Props) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth", {
        password: values.password,
      });

      if (res.data.status === "success") {
        setAllowed(true);
      } else {
        form.setError("password", {
          message: "Incorrect password",
        });
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-screen p-4">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Textable</h1>
        <img src={Logo} alt="Textable Logo" className="w-20 h-20" />
      </div>

      <div className="flex flex-col gap-4 items-center justify-center">
        <h4 className="text-lg font-semibold">Password please</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Checking
                </>
              ) : (
                "Enter"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
