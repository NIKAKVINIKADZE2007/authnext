import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import ChangePasswordForm from './change-password-form';

export default function CHangePassword() {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
}
