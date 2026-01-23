import { Resend } from 'resend';
import { env } from './env';

export const resend = new Resend(env.RESEND_TOKEN||"re_123");
