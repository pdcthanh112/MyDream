import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { MYSQL_DB } from '@databases/mysql';
import { EmployeeLoginDto, CreateEmployeeDto } from '@/dtos/account.dto';
import { HttpException } from '@/exceptions/httpException';
import { Employee } from '@/interfaces/account.interface';
import generateAccountAlias from '@utils/helper';
import { QueryTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Service()
export class EmployeeService {
  public async getAllEmployee(): Promise<Employee[]> {
    const result: Employee[] = await MYSQL_DB.Employee.findAll();
    return result;
  }

  public async getEmployeeById(employeeId: number): Promise<Employee> {
    const result: Employee = await MYSQL_DB.Employee.findByPk(employeeId);
    if (!result) throw new HttpException(409, "Employee doesn't exist");

    return result;
  }

  public async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    const findEmployee: Employee = await MYSQL_DB.Employee.findOne({ where: { email: employeeData.email } });
    if (findEmployee) throw new HttpException(409, `This email ${employeeData.email} already exists`);
    let alias = generateAccountAlias(employeeData.name);
    const getListAlias: any = await MYSQL_DB.mysqlConnection.query("SELECT count(emp_account) FROM employee WHERE emp_account = ?", {replacements: [alias], type:QueryTypes.SELECT, raw: false,})
    if(getListAlias > 0) alias = `${alias}${getListAlias}`

    const hashedPassword = await hash(employeeData.password, 10);

    employeeData.accountId = uuidv4();
    employeeData.empAccount = alias;
    employeeData.password = hashedPassword;
    const createEmployeeData: Employee = await MYSQL_DB.Employee.create({ ...employeeData});
    return createEmployeeData;
  }

  public async updateEmployee(employeeId: number, employeeData: EmployeeLoginDto): Promise<Employee> {
    const findEmployee: Employee = await MYSQL_DB.Employee.findByPk(employeeId);
    if (!findEmployee) throw new HttpException(409, "Employee doesn't exist");

    const hashedPassword = await hash(employeeData.password, 10);
    await MYSQL_DB.Employee.update({ ...employeeData, password: hashedPassword }, { where: { id: employeeId } });

    const updateEmployee: Employee = await MYSQL_DB.Employee.findByPk(employeeId);
    return updateEmployee;
  }

  public async changePasswordEmployee(employeeId: number, employeeData: EmployeeLoginDto): Promise<Employee> {
    const findEmployee: Employee = await MYSQL_DB.Employee.findByPk(employeeId);
    if (!findEmployee) throw new HttpException(409, "Employee doesn't exist");

    const hashedPassword = await hash(employeeData.password, 10);
    await MYSQL_DB.Employee.update({ ...employeeData, password: hashedPassword }, { where: { id: employeeId } });

    const updateEmployee: Employee = await MYSQL_DB.Employee.findByPk(employeeId);
    return updateEmployee;
  }

  public async deleteEmployee(employeeId: number): Promise<Employee> {
    const findEmployee: Employee = await MYSQL_DB.Employee.findByPk(employeeId);
    if (!findEmployee) throw new HttpException(409, "Employee doesn't exist");

    await MYSQL_DB.Employee.destroy({ where: { id: employeeId } });

    return findEmployee;
  }
}
