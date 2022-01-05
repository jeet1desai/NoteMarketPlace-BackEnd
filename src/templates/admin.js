export const TAddAdminEmail = {
  confirm: (name, email, password) => ({
    subject: 'Note Marketplace - Add Admin',
    html: `<p><b>Hello, ${name}</b><p>
      <p>Super Admin added you as admin, You can login with this credentials</p>
      <p>Email: ${email}<p>
      <p>Password: ${password}<p>
      <p>Regards,</p>
      <p>Notes Marketplace</p>
    `,
    generateTextFromHTML: true,
  }),
};
