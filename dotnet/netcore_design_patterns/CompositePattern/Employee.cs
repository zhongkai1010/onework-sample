namespace netcore_design_patterns.CompositePattern
{
    public class Employee
    {
        private readonly string name;
        private readonly string dept;
        private readonly int salary;
        private readonly List<Employee> subordinates;

        //构造函数
        public Employee(string name, string dept, int sal)
        {
            this.name = name;
            this.dept = dept;
            this.salary = sal;
            subordinates = new List<Employee>();
        }

        public void add(Employee e)
        {
            subordinates.Add(e);
        }

        public void remove(Employee e)
        {
            subordinates.Remove(e);
        }

        public List<Employee> getSubordinates()
        {
            return subordinates;
        }

        public override string ToString()
        {
            return ("Employee :[ Name : " + name
                                          + ", dept : " + dept + ", salary :"
                                          + salary + " ]");
        }
    }
}