"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { sendContactEmail } from "@/app/actions/contact";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
  });

  if (state.success) {
    return (
      <div className="p-6 rounded-lg border border-accent/50 bg-accent/5 text-center">
        <div className="text-2xl mb-2">&#10003;</div>
        <h3 className="font-display font-semibold mb-1">Message sent!</h3>
        <p className="text-sm text-muted-foreground">
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="p-3 rounded-lg border border-red-500/50 bg-red-500/5 text-sm text-red-500">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border bg-background",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "transition-colors duration-200"
          )}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border bg-background",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "transition-colors duration-200"
          )}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border bg-background",
            "text-sm text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "transition-colors duration-200"
          )}
        >
          <option value="">Select a topic</option>
          <option value="freelance">Freelance project</option>
          <option value="collaboration">Collaboration</option>
          <option value="job">Job opportunity</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-border bg-background resize-none",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "transition-colors duration-200"
          )}
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3",
          "bg-foreground text-background rounded-lg text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors duration-200 focus-ring"
        )}
      >
        {isPending ? (
          "Sending..."
        ) : (
          <>
            Send message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
