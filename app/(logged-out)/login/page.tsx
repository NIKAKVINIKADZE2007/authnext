'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormProvider } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { passwordSchema } from '@/validation/passwordSchema';
import { LoginWithCredentials } from './action';

const formSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export default function login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // console.log(form);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const responsive = await LoginWithCredentials({
      email: data.email,
      password: data.password,
    });

    if (responsive?.error) {
      form.setError('root', {
        type: 'manual',
        message: responsive.message,
      });
    } else {
      router.push('/my-account');
    }
  };

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset
                className='gap-5 flex flex-col'
                disabled={form.formState.isSubmitting}
              >
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='password'
                          {...field}
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}

                <Button type='submit'>Login</Button>
              </fieldset>
            </form>
          </FormProvider>
        </CardContent>
        <CardFooter>
          <div className=''>
            <div className='text-sm text-muted-foreground'>
              Dont have an account?{' '}
              <Link className='underline' href='/register'>
                Resiter
              </Link>
            </div>
            <div className='text-sm text-muted-foreground'>
              Forgot your password?{' '}
              <Link href={'/reset-password'}>Reset password</Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}