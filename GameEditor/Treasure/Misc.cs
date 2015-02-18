using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Treasure
{
    public class Misc
    {
        public static string StringLeftAlign(bool IsLeft)
        {
            if(IsLeft)
            {
                return "-";
            }
            else
            {
                return "";
            }
        }
        /// <summary>
        /// Returns the size of the longest element inside a string array
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public static int SizeOfArrayElement(string[] array)
        {
            int size = 0;
            foreach (var item in array)
            {
                if (item.Length > size)
                {
                    size = item.Length;
                }
            }
            return size;
        }
        /// <summary>
        /// Returns the largest amount of digits the filesize has. Used to determine the minimum column width of result.txt
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        public static long FilesizeOfArrayElement(string[] array)
        {
            long size = 0;
            foreach (var item in array)
            {
                FileInfo fi = new FileInfo(item);
                if(fi.Length.ToString().Length > size)
                {
                    size = fi.Length.ToString().Length;
                }
            }
            return size;
        }

        /// <summary>
        /// Returns a string array containing paths to all pictures in given directory
        /// </summary>
        /// <param name="path">The path.</param>
        /// <returns>String array containing full-qualified path to all pictures sorted in ascending order</returns>
        public static string[] PicList(string path)
        {
            try
            {
                string[] PictureList = Directory.EnumerateFiles(path, "*.*", SearchOption.AllDirectories).Where(s => s.EndsWith("jpg", StringComparison.OrdinalIgnoreCase) || s.EndsWith("png", StringComparison.OrdinalIgnoreCase) || s.EndsWith("bmp", StringComparison.OrdinalIgnoreCase)).OrderBy(s => s).ToArray();
                return PictureList;
            }
            catch (Exception e)
            {
                Logger.Log("Could not get a list of picture.");
                Logger.Log("Error: {0}", e.Message);
                Logger.Log("Stacktrace: {0}", e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Returns only the file name of pictures for given path
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string[] PicName(string path)
        {
            try
            {
                string[] PictureFileName = Directory.EnumerateFiles(path, "*.*", SearchOption.AllDirectories).Where(s => s.EndsWith("jpg", StringComparison.OrdinalIgnoreCase) || s.EndsWith("png", StringComparison.OrdinalIgnoreCase) || s.EndsWith("bmp", StringComparison.OrdinalIgnoreCase)).Select(Path.GetFileName).ToArray();
                return PictureFileName;
            }
            catch (Exception e)
            {
                Logger.Log("Could not get a list of picture.");
                Logger.Log("Error: {0}", e.Message);
                Logger.Log("Stacktrace: {0}", e.StackTrace);
                return null;
            }
        }
    }
}