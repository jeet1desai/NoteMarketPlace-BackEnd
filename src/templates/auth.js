import { clientURL } from '../settings';

export const emailConfirmation = {
  confirm: (name, id) => ({
    subject: 'Note Marketplace - Email Verification',
    html: `<p><b>Hello, ${name}</b><p>
      <p>Thank you for signing up with us. Please click on below link to verify your email address and todo login. </p>
      <a href='${clientURL}/email/confirm/${id}'>
        click to confirm email
      </a>
      <p>Regards,</p>
      <p>Notes Marketplace</p>
    `,
    generateTextFromHTML: true,
  }),
};
