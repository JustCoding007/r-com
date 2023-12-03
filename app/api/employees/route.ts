import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const client = await db.connect();

  let pageSize = 10;
  let offSet = 0;
  const url = new URL(request.url);
  const start = url.searchParams.get('skip');
  const size = url.searchParams.get('take');

  if (start && parseInt(start)) offSet = parseInt(start);
  if (size && parseInt(size)) pageSize = parseInt(size);

  try {
    const data = await client.sql`
    SELECT 
    e.employee_id,
    first_name,
    last_name,
    birth_date,
    gender,
    phone,
    email,
    job_title,
    status,
    salary,
    day_off
    FROM profiles p
    JOIN employees e USING(profile_id)
    LIMIT ${pageSize} OFFSET ${offSet}
    `;
    return NextResponse.json({ count: data.rowCount, data: data.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to query the database' });
  }
};
