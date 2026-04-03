import { z } from "zod";

// Strip HTML tags and dangerous characters
const sanitizeString = (val: string) =>
  val
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/[<>"'`;(){}]/g, "")      // strip dangerous chars
    .trim();

// Reusable schemas
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .transform(sanitizeString);

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters")
  .transform((v) => v.trim().toLowerCase());

export const messageSchema = z
  .string()
  .min(1, "Message is required")
  .max(2000, "Message must be less than 2000 characters")
  .transform(sanitizeString);

export const phoneSchema = z
  .string()
  .max(20, "Phone number too long")
  .transform(sanitizeString)
  .optional()
  .or(z.literal(""));

export const optionalString = z
  .string()
  .max(500, "Input too long")
  .transform(sanitizeString)
  .optional()
  .or(z.literal(""));

// Form schemas
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
});

export const feedbackFormSchema = z.object({
  name: nameSchema,
  email: z.string().email().max(255).transform((v) => v.trim().toLowerCase()).optional().or(z.literal("")),
  message: messageSchema,
  rating: z.number().min(1).max(5),
});

export const consultationFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  business_type: optionalString,
  platform: optionalString,
  budget_range: optionalString,
  message: optionalString,
});

export const newsletterSchema = z.object({
  email: emailSchema,
});
