import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, amount, email, phoneNumber, paymentMethod } = body;

    if (!bookingId || !amount || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const publishableKey = process.env.INTASEND_PUBLISHABLE_KEY;
    const secretKey = process.env.INTASEND_SECRET_KEY;

    if (!publishableKey || !secretKey) {
      console.error('IntaSend keys not configured');
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    const payload = {
      public_key: publishableKey,
      amount: amount,
      currency: 'KES',
      email: email,
      first_name: email.split('@')[0],
      last_name: 'Customer',
      host: request.headers.get('host'),
      api_ref: `booking_${bookingId}_${Date.now()}`,
      redirect_url: `${request.headers.get('origin')}/payment-success/${bookingId}`,
      callback_url: `${request.headers.get('origin')}/api/webhooks/intasend`,
    };

    if (paymentMethod === 'mpesa' && phoneNumber) {
      Object.assign(payload, {
        phone_number: phoneNumber,
      });
    }

    try {
      const response = await fetch('https://api.intasend.com/api/v1/payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('IntaSend error:', data);
        return NextResponse.json(
          { error: data.detail || 'Payment initiation failed' },
          { status: response.status }
        );
      }

      return NextResponse.json({
        success: true,
        redirectUrl: data.redirect_url || data.checkout_url,
        transactionRef: data.id,
      });
    } catch (fetchError) {
      console.error('IntaSend API error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to payment gateway' },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
