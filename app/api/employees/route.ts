import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const _start = url.searchParams.get('_start');
  const _limit = url.searchParams.get('_limit');

  try {
    if (_start && _limit) {
      const data =
        await sql`SELECT * FROM employees LIMIT ${_limit} OFFSET ${_start}`;
      return NextResponse.json(data.rows);
    }
    const data = await sql`SELECT * FROM employees`;
    return NextResponse.json(data.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to query the database' });
  }
};
