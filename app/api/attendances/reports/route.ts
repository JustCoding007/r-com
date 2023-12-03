import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const client = await db.connect();

  const data = await client.sql`
  SELECT
    employee_id,CONCAT(first_name, ' ', last_name) AS full_name,
    COUNT(CASE WHEN entry_status = 'ON_TIME' THEN 1 END) AS on_time_entry_count,
    COUNT(CASE WHEN entry_status = 'LATE' THEN 1 END) AS late_entry_count,
    COUNT(CASE WHEN exit_status = 'EARLY' THEN 1 END) AS early_exit_count,
    COUNT(CASE WHEN work_day_status = 'PRESENT' THEN 1 END) AS absent_count
  FROM attendances

  JOIN employees USING(employee_id)
  JOIN profiles USING(profile_id)
  GROUP BY employee_id, full_name
  `;
  return NextResponse.json(data.rows);
};
