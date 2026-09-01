import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "whi_admin_session";

const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is missing from .env.local."
    );
  }

  return password;
}

function createSessionToken() {
  const password = getAdminPassword();

  const expiresAt =
    Math.floor(Date.now() / 1000) +
    SESSION_DURATION_SECONDS;

  const payload = String(expiresAt);

  const signature = createHmac(
    "sha256",
    password
  )
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

function verifyPassword(
  suppliedPassword: string,
  actualPassword: string
) {
  const suppliedBuffer =
    Buffer.from(suppliedPassword);

  const actualBuffer =
    Buffer.from(actualPassword);

  if (
    suppliedBuffer.length !==
    actualBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    suppliedBuffer,
    actualBuffer
  );
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!password) {
      return NextResponse.json(
        {
          error: "Password is required.",
        },
        {
          status: 400,
        }
      );
    }

    const adminPassword =
      getAdminPassword();

    const valid = verifyPassword(
      password,
      adminPassword
    );

    if (!valid) {
      return NextResponse.json(
        {
          error: "Invalid admin password.",
        },
        {
          status: 401,
        }
      );
    }

    const sessionToken =
      createSessionToken();

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to login.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE() {
  const response =
    NextResponse.json({
      success: true,
    });

  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}