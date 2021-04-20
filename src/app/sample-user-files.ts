import { UserFile } from "src/models/user-file.model";

const SAMPLE_USER_FILE_1: UserFile = {
   name: 'HelloWorld1.cs',
   contents: `namespace HelloWorld1
{
   class Hello1 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World1!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test1.dll");

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
`
};

const SAMPLE_USER_FILE_2: UserFile = {
   name: 'HelloWorld2.cs',
   contents: `namespace HelloWorld2
{
   class Hello2 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World2!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test2.dll");

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
`
};

const SAMPLE_USER_FILE_3: UserFile = {
   name: 'HelloWorld3.cs',
   contents: `namespace HelloWorld3
{
   class Hello3 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World3!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test3.dll");

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
`
};

const SAMPLE_USER_FILE_4: UserFile = {
   name: 'HelloWorld4.cs',
   contents: `namespace HelloWorld4
{
   class Hello4 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World4!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test4.dll");

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
`
};

const SAMPLE_USER_FILE_5: UserFile = {
   name: 'HelloWorld5.cs',
   contents: `namespace HelloWorld5
{
   class Hello5 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World5!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test5.dll");

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
`
};

const SAMPLE_USER_FILE_6: UserFile = {
   name: 'HelloWorld6.cs',
   contents: `namespace HelloWorld6
{
   class Hello6 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World6!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test6.dll");

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
`
};

const SAMPLE_USER_FILE_7: UserFile = {
   name: 'HelloWorld7.cs',
   contents: `namespace HelloWorld7
{
   class Hello7 {         
      static void Main(string[] args)
      {
         System.Console.WriteLine("Hello World7!");
         
         // dynamically load assembly from file Test.dll
         Assembly testAssembly = Assembly.LoadFile(@"c:\Test7.dll");

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
`
};

export const SAMPLE_USER_FILES: UserFile[] = [
   SAMPLE_USER_FILE_1,
   SAMPLE_USER_FILE_2,
   SAMPLE_USER_FILE_3,
   SAMPLE_USER_FILE_4,
   SAMPLE_USER_FILE_5,
   SAMPLE_USER_FILE_6,
   SAMPLE_USER_FILE_7,
];