import { NextResponse } from 'next/server';
import { User } from '@/database/models';
import bcrypt from 'bcryptjs';
import connectDB from '@/database/connection';

import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { username, email, password, gender } = await request.json();

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 500 }
      );
    }

    // Hash the plaintext password for storage in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Decide if you want to use User.create with timestamps
    // await User.create(
    //   { username, email, password: hashedPassword, gender },
    //   { timestamps: true }
    // );

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      gender,
      createdAt: Date.now(),
    });

    // Ensure await before save
    await newUser.save();

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error occured while registring the user' },
      { status: 500 }
    );
  }
};
