import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { hashPassword, signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, role = 'STUDENT' } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'नाम, ईमेल और पासवर्ड आवश्यक हैं' },
        { status: 400 }
      );
    }

    const existing = DataStore.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: 'यह ईमेल पहले से ही पंजीकृत है (Email already registered)' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser = DataStore.createUser({
      name,
      email,
      phone: phone || '',
      role: role === 'ADMIN' ? 'ADMIN' : 'STUDENT',
      board: 'Bihar Board Class 10',
      passwordHash,
    });

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        board: newUser.board,
        streakDays: newUser.streakDays,
      },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'साइनअप विफल रहा' }, { status: 500 });
  }
}
