'use client';

import { useState, FormEvent } from 'react';

interface TributeFormProps {
  onTributeAdded: (tribute: any) => void;
}

export default function TributeForm({ onTributeAdded }: TributeFormProps) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
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
      
      // Notify parent component
      onTributeAdded(newTribute);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-12">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          {error}
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
  );
}
