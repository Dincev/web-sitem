import { NextResponse } from "next/server";

export async function GET() {
  const SITEMAP_URL = "https://www.dincev.com/sitemap.xml";
  const GOOGLE_PING_URL = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

  try {
    await fetch(GOOGLE_PING_URL);
    return NextResponse.json({ success: true, message: "Google'a ping atıldı" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}