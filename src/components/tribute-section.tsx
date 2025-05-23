'use client';

import { useState, FormEvent, useEffect } from 'react';

interface Tribute {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
}

export default function TributeSection() {
  // Form state
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  
  // List state
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState('');

  // Fetch tributes on component mount
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
        setListError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTributes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setSuccess('');

    try {
      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          relationship,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit tribute');
      }

      const newTribute = await response.json();
      
      // Reset form
      setName('');
      setRelationship('');
      setMessage('');
      setSuccess('Your tribute has been submitted. Thank you for sharing your memories.');
      
      // Add the new tribute to the list
      setTributes((prev) => [newTribute, ...prev]);
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tribute Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        {formError && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md">
            {formError}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md">
            {success}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-input bg-background"
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="relationship" className="block text-sm font-medium mb-1">
            Your Relationship to Dushyant
          </label>
          <input
            type="text"
            id="relationship"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-input bg-background"
            placeholder="Friend, Family, etc."
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-input bg-background"
            placeholder="Share your memories, thoughts, or message for Dushyant..."
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Tribute'}
        </button>
      </form>

      {/* Tribute List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Recent Tributes</h3>
        
        {isLoading ? (
          <div className="text-center py-4">Loading tributes...</div>
        ) : listError ? (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md">
            {listError}
          </div>
        ) : tributes.length === 0 ? (
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
    </div>
  );
}
