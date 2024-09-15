import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const headers = request?.headers;
    const response = await fetch(url, {
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

export async function POST(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const headers = request?.headers;
    const body = await request.text();

    const response = await fetch(url, {
      method: 'POST',
      body,
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

export async function PUT(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const headers = request?.headers;
    const body = await request.text();

    const response = await fetch(url, {
      method: 'PUT',
      body,
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

export async function DELETE(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const headers = request?.headers;
    const body = await request.text();

    const response = await fetch(url, {
      method: 'DELETE',
      body,
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

    return NextResponse.json('Resource deleted successfully', {
      status: response.status,
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const headers = request?.headers;
    const body = await request.text();

    const response = await fetch(url, {
      method: 'PATCH',
      body,
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

export async function HEAD(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error while getting data' },
        {
          status: response.status,
        },
      );
    }

    return new NextResponse(null, {
      status: response.status,
      headers: response?.headers,
    });
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function OPTIONS(request: Request): Promise<NextResponse> {
  const [, url] = request.url.split('?url=');

  if (!url) {
    return NextResponse.json({ error: 'URL is undefined' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: 'OPTIONS',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error while getting data' },
        {
          status: response.status,
        },
      );
    }
    const headersRes = new Headers(response?.headers);
    const headersObj: Record<string, string> = {};
    headersRes.forEach((value, key) => {
      headersObj[key] = value;
    });

    return NextResponse.json(headersObj, { status: response.status });
  } catch (e) {
    const error = e instanceof Error ? e.message : `${e}`;
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
