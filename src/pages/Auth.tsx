
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Brain } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        // For signup, we'll automatically sign in after registration
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // This tells Supabase to automatically sign in the user after signup
            data: {
              email_confirmed: true
            }
          }
        });

        if (signUpError) throw signUpError;

        // If signup successful, immediately sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        toast({
          title: "Success!",
          description: "Your account has been created and you're now signed in.",
        });
        
        navigate('/');
      } else {
        // For login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message === 'Email not confirmed') {
            // If email not confirmed, try to sign in anyway
            const { error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  email_confirmed: true
                }
              }
            });
            
            if (signUpError) throw signUpError;
          } else {
            throw error;
          }
        }

        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
      let errorMessage = 'An error occurred during authentication.';
      
      if (error.message === 'Invalid login credentials') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.message === 'User already registered') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.message === 'Email not confirmed') {
        errorMessage = 'Please check your email to confirm your account.';
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-relaxify-bg-mint flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <Brain className="w-12 h-12 text-relaxify-primary mb-4" />
            <h1 className="text-3xl font-bold text-relaxify-text">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 mt-2">
              {mode === 'login' 
                ? 'Sign in to continue your journey'
                : 'Start your wellness journey today'
              }
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-relaxify-text mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-relaxify-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-relaxify-text mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-relaxify-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-relaxify-primary text-white py-2 rounded-lg hover:bg-relaxify-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-relaxify-primary hover:underline"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
