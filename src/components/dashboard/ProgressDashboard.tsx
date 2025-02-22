
import { useState, useEffect } from 'react';
import { Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Stats {
  meditationSessions: number;
  totalMeditationMinutes: number;
  yogaSessions: number;
  totalYogaMinutes: number;
  lastWeekMeditations: { date: string; minutes: number }[];
  lastWeekYoga: { date: string; minutes: number }[];
}

const ProgressDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<Stats>({
    meditationSessions: 0,
    totalMeditationMinutes: 0,
    yogaSessions: 0,
    totalYogaMinutes: 0,
    lastWeekMeditations: [],
    lastWeekYoga: [],
  });

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        // Fetch meditation stats
        const { data: meditationData, error: meditationError } = await supabase
          .from('meditation_sessions')
          .select('duration, created_at')
          .eq('user_id', user.id);

        if (meditationError) throw meditationError;

        // Fetch yoga stats
        const { data: yogaData, error: yogaError } = await supabase
          .from('yoga_sessions')
          .select('duration, created_at')
          .eq('user_id', user.id);

        if (yogaError) throw yogaError;

        // Calculate stats
        const totalMeditation = meditationData?.reduce((acc, session) => acc + session.duration, 0) || 0;
        const totalYoga = yogaData?.reduce((acc, session) => acc + session.duration, 0) || 0;

        // Calculate last week's data
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().split('T')[0];
        }).reverse();

        const lastWeekMeditations = last7Days.map(date => ({
          date,
          minutes: meditationData?.filter(session => 
            session.created_at.split('T')[0] === date
          ).reduce((acc, session) => acc + session.duration, 0) || 0
        }));

        const lastWeekYoga = last7Days.map(date => ({
          date,
          minutes: yogaData?.filter(session => 
            session.created_at.split('T')[0] === date
          ).reduce((acc, session) => acc + session.duration, 0) || 0
        }));

        setStats({
          meditationSessions: meditationData?.length || 0,
          totalMeditationMinutes: totalMeditation,
          yogaSessions: yogaData?.length || 0,
          totalYogaMinutes: totalYoga,
          lastWeekMeditations,
          lastWeekYoga,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch your progress statistics. Please try again later.",
        });
      }
    };

    fetchStats();

    // Set up real-time subscriptions
    const meditationChannel = supabase.channel('meditation-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'meditation_sessions', filter: `user_id=eq.${user.id}` },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    const yogaChannel = supabase.channel('yoga-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'yoga_sessions', filter: `user_id=eq.${user.id}` },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(meditationChannel);
      supabase.removeChannel(yogaChannel);
    };
  }, [user, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-relaxify-primary" />
          <h3 className="text-lg font-semibold">Meditation Progress</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="text-2xl font-bold">{stats.meditationSessions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Minutes</p>
            <p className="text-2xl font-bold">{stats.totalMeditationMinutes}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-6 h-6 text-relaxify-primary" />
          <h3 className="text-lg font-semibold">Yoga Progress</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="text-2xl font-bold">{stats.yogaSessions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Minutes</p>
            <p className="text-2xl font-bold">{stats.totalYogaMinutes}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
