import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { comparePassword, signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ईमेल और पासवर्ड दोनों आवश्यक हैं (Email and password are required)' },
        { status: 400 }
      );
    }

    const user = DataStore.getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'यह ईमेल पंजीकृत नहीं है (Account not found with this email)' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'गलत पासवर्ड (Incorrect password)' },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        board: user.board,
        streakDays: user.streakDays,
      },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'लॉगिन में त्रुटि हुई (Login error)' }, { status: 500 });
  }
}
