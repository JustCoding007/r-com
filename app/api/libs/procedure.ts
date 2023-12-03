import { sql } from '@vercel/postgres';

sql`
CREATE PROCEDURE get_attendances(
    employee string
)
language plpgsql
AS $$

BEGIN
    SELECT * FROM attendances
    WHERE employee_id = employee
    
    commit;
END; $$

`;
