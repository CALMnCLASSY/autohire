import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-intasend-signature');

    const webhookSecret = process.env.INTASEND_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    if (signature) {
      const hash = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(body))
        .digest('hex');

      if (hash !== signature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    const { status, id, api_ref } = body;

    console.log(`Webhook received: ${api_ref} - Status: ${status}`);

    if (status === 'COMPLETE' || status === 'complete') {
      const bookingIdMatch = api_ref?.match(/booking_(\d+)/);
      if (bookingIdMatch) {
        const bookingId = parseInt(bookingIdMatch[1]);
        console.log(`Payment confirmed for booking ${bookingId}`);
      }
    } else if (status === 'FAILED' || status === 'failed') {
      const bookingIdMatch = api_ref?.match(/booking_(\d+)/);
      if (bookingIdMatch) {
        const bookingId = parseInt(bookingIdMatch[1]);
        console.log(`Payment failed for booking ${bookingId}`);
      }
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
