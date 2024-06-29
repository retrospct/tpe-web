import * as React from 'react'

interface EmailContactConfirmProps {
  firstName: string
}

export const EmailContactConfirm: React.FC<Readonly<EmailContactConfirmProps>> = ({ firstName }) => (
  <div>
    <h1>Thank you for reaching out, {firstName}!</h1>
    <p>We'll get back to you asap.</p>
  </div>
)
