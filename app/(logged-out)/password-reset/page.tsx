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
import { passwordReset } from './action';

const formSchema = z.object({
  email: z.string().email(),
});

export default function PaswordReset() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // console.log(form);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await passwordReset(data.email);
  };

  return (
    <main className='flex justify-center items-center min-h-screen'>
      {form.formState.isSubmitSuccessful ? (
        <Card>
          <CardHeader>
            <CardTitle>Email Sent</CardTitle>
            <CardDescription>
              if You have account, you will revice password reset email at{' '}
              {form.getValues('email')}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Password Reset</CardTitle>
            <CardDescription>
              Enter your email addres to reset your password
            </CardDescription>
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
                Remember your password?<Link href={'/login'}>Login</Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
