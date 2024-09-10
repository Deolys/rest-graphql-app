import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request?.url || '');
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const headers = request?.headers;
    const body = await request.json();

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error while getting data' },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
