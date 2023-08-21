import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextApiRequest, NextApiResponse } from "next";
import bcryptjs from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSaltSync(10);
    console.log("hello");
    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("hello");
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();

    console.log(saveUser);

    // send verfication email
    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        saveUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
