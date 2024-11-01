import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { auth } from '@/auth';

export default async function MyAccount() {
  const session = await auth();
  return (
    <div>
      <Card className='w-[350px]'>
        <CardHeader>My Account</CardHeader>
        <CardContent>
          <Label>Email Address</Label>
          <div className='text-muted-foreground'>{session?.user?.email}</div>
        </CardContent>
      </Card>
    </div>
  );
}
