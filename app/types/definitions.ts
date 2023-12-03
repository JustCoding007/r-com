type Gender = 'MALE' | 'FEMALE' | 'OTHER';

enum DayOff {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

enum TimeStatus {
  LATE = 'LATE',
  ON_TIME = 'ON_TIME',
  EARLY = 'EARLY',
}

enum WorkDayStatus {
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
  DAY_OFF = 'DAY_OFF',
}

const dayStatus: { id: number; label: string; value: string }[] = [
  { id: 1, label: 'Absent', value: 'ABSENT' },
  { id: 2, label: 'Present', value: 'PRESENT' },
  { id: 3, label: 'Day Off', value: 'DAY_OFF' },
];

export interface Profile {
  profile_id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  gender: Gender;
  phone: string;
  email: string;
}

export interface Employee {
  profile_id: number;
  employee_id: string;
  job_title: string;
  status: string;
  salary: number;
  day_off: DayOff;
  start_shift: Date;
  end_shift: Date;
  employment_date: Date;
}

export interface Address {
  address_id: number;
  street: string;
  city: string;
  zip_code: string;
}

export interface EmployeeTable {
  employee_id: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  gender: Gender;
  phone: string;
  email: string;
  job_title: string;
  status: string;
  salary: number;
  day_off: DayOff;
}

export interface Attendance {
  attendance_id: number;
  employee_id: string;
  attendance_date: Date;
  entry_time: Date;
  entry_status: TimeStatus;
  exit_time: Date;
  exit_status: TimeStatus;
  work_day_status: WorkDayStatus;
}

export interface AttendanceTable {
  attendance_id: number;
  employee_id: string;
  full_name: string;
  attendance_date: Date;
  entry_time: Date;
  entry_status: TimeStatus;
  exit_time: Date;
  exit_status: TimeStatus;
  work_day_status: WorkDayStatus;
}

export interface Report {
  report_id: number;
  employee_id: string;
  full_name: string;
  on_time_entry_count: number;
  late_entry_count: number;
  absent_count: number;
}
