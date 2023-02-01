interface ReducedEmployee {
  id: string;
  lastName: string;
  firstName: string;
}

export class EmployeesByQualification {
  constructor(public skill: string, public employees: ReducedEmployee[]) {}
}
