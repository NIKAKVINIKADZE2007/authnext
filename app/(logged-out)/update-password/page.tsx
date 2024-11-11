import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import db from '@/db/drizzle';
import { passwordResetTokens } from '@/db/passwordResetTokensSchema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import UpdatePasswordForm from './update-password-form';

export default async function updatePassword({
  searchParams,
}: {
  searchParams: {
    token?: string;
  };
}) {
  let tokenIsValid = false;

  const { token } = searchParams;

  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    const now = Date.now();

    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      tokenIsValid = true;
    }
  }
  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>
            {tokenIsValid
              ? 'update Password'
              : 'Your Password reset link is invalid or has expired'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tokenIsValid ? (
            <UpdatePasswordForm token={token ?? ''} />
          ) : (
            <Link className='underline' href='/paaword-reset'>
              Request another password rest
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
