'use client';

import { Button } from '../ui/button';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
    >
      Log out
    </Button>
  );
}
