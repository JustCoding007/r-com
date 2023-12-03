import { NextRequest, NextResponse } from 'next/server';
import { queryAll } from './libs/utils';

export const GET = async (request: NextRequest) => {
  let pageSize = 10;
  let offSet = 0;
  const url = new URL(request.url);
  const start = url.searchParams.get('skip');
  const size = url.searchParams.get('take');

  if (start && parseInt(start)) offSet = parseInt(start);
  if (size && parseInt(size)) pageSize = parseInt(size);

  try {
    const attendances = await queryAll(pageSize, offSet);
    return NextResponse.json({
      count: attendances.rowCount,
      data: attendances.rows,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to query the database' });
  }
};
