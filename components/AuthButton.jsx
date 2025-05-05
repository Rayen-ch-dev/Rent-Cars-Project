import React from 'react'
import { useFormStatus } from 'react-dom';
const AuthButton = () => {
    const pending = useFormStatus();
  return (
    <div>
      <button type='submit' disabled={pending.pending}>
        {pending.pending ? 'Loading...' : 'Login'}
      </button>
    </div>
  )
}

export default AuthButton
