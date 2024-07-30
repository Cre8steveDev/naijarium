import { NextResponse } from 'next/server';
import { User } from '@/database/models';
import bcrypt from 'bcryptjs';
import connectDB from '@/database/connection';

import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { username, email, password, gender } = await request.json();

    //@ts-ignore
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash the plaintext password for storage in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //@ts-ignore
    await User.create({
      username: username.replaceAll(' ', ''),
      email,
      password: hashedPassword,
      gender,
    });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );

    // Handle Errors that may occur during DB creation action
  } catch (error) {
    return NextResponse.json(
      { message: 'Error occured while registring the user' },
      { status: 500 }
    );
  }
};
