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

  const query = async () => {
    const data = await client.sql`
    SELECT
    a.attendance_id,
    em.employee_id,
    CONCAT(p.first_name, ' ', p.last_name) AS full_name,
    DATE(a.attendance_date) AS attendance_date,
    a.entry_time,
    a.entry_status,
    exit_time,
    exit_status,
    work_day_status
  FROM attendances a
  JOIN employees em USING(employee_id)
  JOIN profiles p USING(profile_id)
  LIMIT ${pageSize} OFFSET ${offSet}
     `;
    return data;
  };

  try {
    const results = await query();
    return NextResponse.json({ count: results.rowCount, data: results.rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to query the database' });
  }
};
