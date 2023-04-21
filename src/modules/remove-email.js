export default function removeEmail(email) {
  const parts = email.split("@");
  return parts[0];
}
