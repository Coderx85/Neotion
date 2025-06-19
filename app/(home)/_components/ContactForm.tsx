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
      className="order-3 xl:order-none w-full bg-gray-200 dark:bg-gray-800/50 "
      id="contact"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-5 rounded-xl"
      >
        <h2 className="text-6xl text-black dark:text-white font-bold">
          Contact Us
        </h2>
        {/* <p className="text-black dark:text-white/60 xl:text-lg">
            {" "}
            I&apos;m currently looking for new opportunities, my inbox is always
            open. Whether you have a question or just want to say hi, I&apos;ll
            try my best to get back to you!
          </p> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            // variant={"outline"}
            type="email"
            id="email"
            required
            placeholder="Email address"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Input
            // variant={"outline"}
            type="text"
            id="name"
            placeholder="Name"
            required
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Input
            // variant={"outline"}
            type="text"
            id="company"
            placeholder="Company"
            required
            onChange={(e) => {
              setFormData({ ...formData, company: e.target.value });
            }}
          />
          <Input
            // variant={"outline"}
            type="text"
            id="phone"
            placeholder="Phone"
            required
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
        </div>
        <Textarea
          name="message"
          id="message"
          className="h-[200px] border-primary dark:border-white/85"
          placeholder="Let's talk about..."
          required
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
        />
        <Button variant={'outline'} type="submit" className=" font-medium">
          Send Message
        </Button>
      </form>
    </div>
  );
};
export default ContactForm;
