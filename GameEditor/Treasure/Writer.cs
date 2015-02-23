using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Treasure
{
    public class Writer
    {
        /// <summary>
        /// Ultra evil global variable...
        /// </summary>
        private static string path = Environment.CurrentDirectory + @"\Result";
        private static string logformat = DateTime.Now.ToString("yyyy-MM-dd") + "-" + DateTime.Now.ToString("HH-mm-ss") + ".txt";

        /// <summary>
        /// Checks if the given directory path exists and if not create it
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        private static bool ExistsAndCreate(string path)
        {
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                    return true;
                }
                catch (Exception e)
                {
#if DEBUG
                    Console.WriteLine(e.Message + e.StackTrace);
#endif

#if RELEASE
                    MessageBox.Show("Could not create Log directory.", "Error");
                    Logger.Log(e.Message);
#endif
                    return false;
                }
            }
            else
            {
                return true;
            }
        }

        public static void Write(string msg, params object[] args)
        {
            if (ExistsAndCreate(path))
            {
                try
                {
                    Console.WriteLine(args.Length);
                    // Creates per-day log file with current date as file name
                    using (StreamWriter sw = new StreamWriter(path + @"\" + logformat, true))
                    {
                        sw.WriteLine(DateTime.Now.ToLongTimeString() + " " + string.Format(msg, args));
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message + e.StackTrace);
                    Logger.Log(e.Message + "\n" + e.StackTrace);
                }
            }
        }

        public static void Write(string deli, List<string> size, string align, params object[] args)
        {
            size = EqualizeListSizeAndArgs(size, args.Length);         
            // Build a generic-runtime string for string.Format()
            string builder = "";
            for (int i = 0; i <= (args.Length - 1); i++)
            {
                if(i == (args.Length - 1))
                {
                    builder += "{" + i + ", " + align + size[i] + "}";
                }
                else
                {
                    builder += "{" + i + ", " + align + size[i] + "} " + deli + " ";
                }
            }
            if(ExistsAndCreate(path))
            {
                try
                {
                    using (StreamWriter sw = new StreamWriter(path + @"\" + logformat, true))
                    {
                        sw.WriteLine(DateTime.Now.ToLongTimeString() + " " + string.Format(builder, args));
                    }
                }
                catch (Exception e)
                {
                    Logger.Log(e.Message);
                    throw;
                }
            }
        }
        /// <summary>
        /// Add column width for additional columns with missing column width
        /// </summary>
        /// <param name="size"></param>
        /// <param name="argslength"></param>
        /// <returns></returns>
        private static List<string> EqualizeListSizeAndArgs(List<string> size, int argslength)
        {
            while (size.Count < argslength)
            {
                size.Add("10"); // add default size so that columns with unspecified column width have one
            }
            return size;
        }
    }
}