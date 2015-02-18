using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace Treasure
{
    /// <summary>
    /// Logger class. Creates per-day logs, saved into "Log" directory
    /// </summary>
    public class Logger
    {
        /// <summary>
        /// Logs the specified log MSG.
        /// </summary>
        /// <param name="LogMsg">The log MSG.</param>
        public static void Log(string LogMsg, params object[] args)
        {
            if (!Directory.Exists(Environment.CurrentDirectory + @"\Log"))
            {
                try
                {
                    Directory.CreateDirectory(Environment.CurrentDirectory + @"\Log");
                }
                catch (Exception e)
                {
#if DEBUG
                    Console.WriteLine(e.Message + e.StackTrace);
#endif

#if RELEASE
                    MessageBox.Show("Could not create Log directory.", "Error");
                    Log(e.Message);
#endif
                }
            }
            else
            {
                try
                {
                    // Creates per-day log file with current date as file name
                    using (StreamWriter sw = new StreamWriter(Environment.CurrentDirectory + @"\Log\" + DateTime.Now.ToString("dd-MM-yy") + ".txt", true))
                    {
                        sw.WriteLine(DateTime.Now.ToLongTimeString() + " " + string.Format(LogMsg, args));
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message + e.StackTrace);
                    Log(e.Message + "\n" + e.StackTrace);
                }
            }
        }
    }
}