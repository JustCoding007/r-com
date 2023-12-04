'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { UserNav } from './components/user-nav';
import axios from 'axios';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { EmployeeTable } from '../types/definitions';
import Error from 'next/error';

interface FetchResponse {
  count: number;
  data: EmployeeTable[];
}
export default function Page() {
  const { data } = useQuery<EmployeeTable[], Error>({
    queryKey: ['employees'],
    queryFn: () =>
      axios
        .get<FetchResponse>('/api/employees', { params: { take: 100 } })
        .then((res) => res.data.data),

    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000,
  });

  return (
    <main className='my-10'>
      <div className='h-full flex-1 flex-col space-y-8 p-5 md:flex mt-5'>
        <h1 className='text-lg font-black tracking-normal sm:text-3xl xl:text-4xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500'>
          R.Communication List Of Employees
        </h1>
        {data !== undefined && <DataTable data={data} columns={columns} />}
      </div>
    </main>
  );
}
