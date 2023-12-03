import { NextRequest, NextResponse } from 'next/server';
import { query } from '../libs/utils';

interface Props {
  params: { employee_id: string };
}

export const GET = async (
  request: NextRequest,
  { params: { employee_id } }: Props
) => {
  let pageSize = 10;
  let offSet = 0;
  const url = new URL(request.url);
  const start = url.searchParams.get('skip');
  const size = url.searchParams.get('take');

  if (start && parseInt(start)) offSet = parseInt(start);
  if (size && parseInt(size)) pageSize = parseInt(size);

  try {
    const results = await query(pageSize, offSet, employee_id);
    return results.rows.length
      ? NextResponse.json({ count: results.rowCount, data: results.rows })
      : NextResponse.json(
          {
            error: 'Employee with the given ID does not exist',
          },
          { status: 404 }
        );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to query the database' });
  }
};
