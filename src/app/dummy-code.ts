export const DUMMY_CODE = `namespace HelloWorld
{
   class Hello {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test.dll");

         // get type of class Calculator from just loaded assembly
         Type calcType = testAssembly.GetType("Test.Calculator");

         // create instance of class Calculator
         object calcInstance = Activator.CreateInstance(calcType);

         // get info about property: public double Number
         PropertyInfo numberPropertyInfo = calcType.GetProperty("Number");

         // get value of property: public double Number
         double value = (double)numberPropertyInfo.GetValue(calcInstance, null);

         // set value of property: public double Number
         numberPropertyInfo.SetValue(calcInstance, 10.0, null);

         // get info about static property: public static double Pi
         PropertyInfo piPropertyInfo = calcType.GetProperty("Pi");
      }
   }
}
`;