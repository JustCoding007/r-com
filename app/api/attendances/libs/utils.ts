import { db } from '@vercel/postgres';

export const queryAll = async (page: number, limit: number) => {
  const client = await db.connect();

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
  LIMIT ${page} OFFSET ${limit}
     `;
  return data;
};

export const query = async (
  page: number,
  limit: number,
  employee_id: string
) => {
  const client = await db.connect();

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
    WHERE em.employee_id = ${employee_id}
    LIMIT ${page} OFFSET ${limit}
       `;
  return data;
};
