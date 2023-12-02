import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
interface Props {
  params: { id: string };
}

export const GET = async (request: NextRequest, { params: { id } }: Props) => {
  try {
    const data = await sql`
    SELECT * 
    FROM employees
    WHERE employee_id = ${id}`;
    if (!data.rows.length)
      return NextResponse.json(
        { error: 'Employee with the given id does not exist' },
        { status: 404 }
      );
    return NextResponse.json(data.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to query the database' });
  }
};
