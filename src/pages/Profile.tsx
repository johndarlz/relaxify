
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { User, Heart, Brain, Activity } from 'lucide-react';

interface Profile {
  first_name: string;
  last_name: string;
  avatar_url: string;
  stress_level: number;
  meditation_minutes: number;
  yoga_sessions: number;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) getProfile();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-relaxify-bg-mint">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-6 mb-8">
              <img
                src={profile?.avatar_url || '/placeholder.svg'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-relaxify-text">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-relaxify-primary/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="w-6 h-6 text-relaxify-primary" />
                  <h3 className="text-lg font-semibold">Stress Level</h3>
                </div>
                <p className="text-2xl font-bold">{profile?.stress_level}%</p>
              </div>

              <div className="bg-relaxify-primary/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-relaxify-primary" />
                  <h3 className="text-lg font-semibold">Meditation Time</h3>
                </div>
                <p className="text-2xl font-bold">{profile?.meditation_minutes} mins</p>
              </div>

              <div className="bg-relaxify-primary/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="w-6 h-6 text-relaxify-primary" />
                  <h3 className="text-lg font-semibold">Yoga Sessions</h3>
                </div>
                <p className="text-2xl font-bold">{profile?.yoga_sessions}</p>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
