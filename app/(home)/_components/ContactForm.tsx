'use client';
import React, { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Send email to the user
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Failed to send email');
    }

    if (res.ok) {
      toast.success('Email sent successfully');
    }
  };

  return (
    <div
      className="order-3 xl:order-none w-full bg-gradient-to-br from-background/80 to-secondary/60 backdrop-blur-xl"
      id="contact"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 rounded-xl bg-gradient-to-br from-card/50 to-background/30"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-bold drop-shadow-sm">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            type="email"
            id="email"
            required
            placeholder="Email address"
            className="glass border-border/50 focus:border-primary/70 backdrop-blur-sm"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Input
            type="text"
            id="name"
            placeholder="Name"
            required
            className="glass border-border/50 focus:border-primary/70 backdrop-blur-sm"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Input
            type="text"
            id="company"
            placeholder="Company"
            required
            className="glass border-border/50 focus:border-primary/70 backdrop-blur-sm"
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
            }}
          />
          <Input
            type="text"
            id="phone"
            placeholder="Phone"
            required
            className="glass border-border/50 focus:border-primary/70 backdrop-blur-sm"
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
        </div>
        <Textarea
          name="message"
          id="message"
          className="h-[200px] glass border-border/50 focus:border-primary/70 backdrop-blur-sm resize-none"
          placeholder="Let's talk about..."
          required
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
        />
        <Button
          variant={'outline'}
          type="submit"
          className="font-medium glass-card hover:glass-strong transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
};
export default ContactForm;
