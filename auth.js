// auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://rrgjizycwgspvzeqgbpf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ2ppenljd2dzcHZ6ZXFnYnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2OTIwOTUsImV4cCI6MjA2MTI2ODA5NX0.o8NfZ0TsIBAATV6QD9lUFH4DKRwjfocQEYgIilUuZgs'
);

// Protect page by checking session
export async function protectPage() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = 'login.html'; // Redirect if not logged in
  }
}