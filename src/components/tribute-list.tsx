'use client';

import { useEffect, useState } from 'react';

interface Tribute {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
}

export default function TributeList() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        const response = await fetch('/api/tributes');
        
        if (!response.ok) {
          throw new Error('Failed to fetch tributes');
        }
        
        const data = await response.json();
        setTributes(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTributes();
  }, []);

  const addTribute = (newTribute: Tribute) => {
    setTributes((prev) => [newTribute, ...prev]);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tributes...</div>;
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-3 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Recent Tributes</h3>
      
      {tributes.length === 0 ? (
        <p className="text-muted-foreground">No tributes yet. Be the first to share your memories.</p>
      ) : (
        tributes.map((tribute) => (
          <div key={tribute.id} className="bg-card p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold">From {tribute.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">
              {tribute.relationship} • {tribute.date}
            </p>
            <p>{tribute.message}</p>
          </div>
        ))
      )}
    </div>
  );
}
