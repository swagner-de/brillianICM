using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Treasure
{
    public class MyComparer
    {
        /// <summary>
        /// Writes percentage difference of filesize for given 2 files
        /// </summary>
        /// <param name="file1"></param>
        /// <param name="file2"></param>
        public static void ByteComparer(string file1, string file2)
        {
            FileInfo fi1 = new FileInfo(file1);
            FileInfo fi2 = new FileInfo(file2);

            long diff = Math.Abs(fi1.Length - fi2.Length);
            double avg = (fi1.Length + fi2.Length) / 2;
            double result = diff / avg;
            result = result * 100;
            Writer.Write(result.ToString());
        }

        /// <summary>
        /// Compares two pictures using the pixel color
        /// </summary>
        /// <param name="pic1_path"></param>
        /// <param name="pic2_path"></param>
        /// <returns>percentage of equality as an double value</returns>
        public static double PixelComparer(string pic1_path, string pic2_path)
        {
            // TODO:
            // Using Systems.Drawing.Bitmap class
            // What to do with a huge amount of pictures?
            // Streams, Async or...?
            Bitmap pic1 = new Bitmap(pic1_path); // original
            Bitmap pic2 = new Bitmap(pic2_path); // picture to be compared with original one
            int[] Pic1_pixel = GetPicResolution(pic1);
            int[] Pic2_pixel = GetPicResolution(pic2);

            int AmountOfEqualPixel = 0;
            int AmountOfNotEqualPixel = 0;

            for (int i = 0; i <= Pic1_pixel[0] - 1; i++)
            {
                for (int j = 0; j <= Pic1_pixel[1] - 1; j++)
                {
                    if (pic1.GetPixel(i, j) == pic2.GetPixel(i, j))
                    {
                        AmountOfEqualPixel++;
                    }
                    else
                    {
                        AmountOfNotEqualPixel++;
                    }
                    //Writer.Write("{0}, {1}", i, j);
                }
            }
            double x, y;
            x = Convert.ToDouble(AmountOfEqualPixel);
            y = Convert.ToDouble(Pic1_pixel[2]);
            double similar = (x / y) * 100;
            return similar; // rate of equal pixel color in percentage
        }

        /// <summary>
        /// Returns an int array containing the width, height and the amount of pixels multiplied
        /// of an bitmap object (picture)
        /// </summary>
        /// <param name="image">Bitmap object</param>
        /// <returns></returns>
        private static int[] GetPicResolution(Bitmap image)
        {
            int[] PicResolution = { image.Width, image.Height, image.Width * image.Height };
            //PicResolution = {image.Width, image.Height}; Why does this not work?
            return PicResolution;
        }
        #region
        /// <summary>
        /// Another way to compare pictures, hopefully..
        /// </summary>
        /// <param name="pic1_path"></param>
        /// <param name="pic2_path"></param>
        /// <returns></returns>
        //public static double ColorBucketComparer(string pic1_path, string pic2_path)
        //{
        //    Bitmap pic1 = new Bitmap(pic1_path); // original
        //    Bitmap pic2 = new Bitmap(pic2_path); // picture to be compared with original one
        //    int[] Pic1_pixel = GetPicResolution(pic1);
        //    int[] Pic2_pixel = GetPicResolution(pic2);

        //    int[,] ColorBucket = new int[3, 4];
        //    int[,] ColorBucket2 = new int[3, 4];

        //    // Initialize both arrays with 0
        //    for (int i = 0; i < ColorBucket.GetLength(0); i++)
        //    {
        //        for (int j = 0; j < ColorBucket.GetLength(1); j++)
        //        {
        //            ColorBucket[i, j] = 1;
        //            ColorBucket2[i, j] = 1;
        //        }
        //    }

        //    //int AmountOfEqualPixel = 0;
        //    //int AmountOfNotEqualPixel = 0;

        //    for (int i = 0; i <= Pic1_pixel[0] - 1; i++)
        //    {
        //        for (int j = 0; j <= Pic1_pixel[1] - 1; j++)
        //        {
        //            // Iterate through all pixels of both pics and get the RGB value
        //            // Populate lists with this values
        //            int R = pic1.GetPixel(i, j).R;
        //            int G = pic1.GetPixel(i, j).G;
        //            int B = pic1.GetPixel(i, j).B;

        //            int R1 = pic2.GetPixel(i, j).R;
        //            int G1 = pic2.GetPixel(i, j).G;
        //            int B1 = pic2.GetPixel(i, j).B;

        //            #region
        //            if (R >= 0 || R <= 63)
        //            {
        //                ColorBucket[0, 0]++;
        //            }
        //            else if (R >= 64 || R <= 127)
        //            {
        //                ColorBucket[0, 1]++;
        //            }
        //            else if (R >= 128 || R <= 191)
        //            {
        //                ColorBucket[0, 2]++;
        //            }
        //            else if (R >= 192 || R <= 255)
        //            {
        //                ColorBucket[0, 3]++;
        //            }

        //            if (G >= 0 || G <= 63)
        //            {
        //                ColorBucket[1, 0]++;
        //            }
        //            else if (G >= 64 || G <= 127)
        //            {
        //                ColorBucket[1, 1]++;
        //            }
        //            else if (G >= 128 || G <= 191)
        //            {
        //                ColorBucket[1, 2]++;
        //            }
        //            else if (G >= 192 || G <= 255)
        //            {
        //                ColorBucket[1, 3]++;
        //            }

        //            if (B >= 0 || B <= 63)
        //            {
        //                ColorBucket[2, 0]++;
        //            }
        //            else if (B >= 64 || B <= 127)
        //            {
        //                ColorBucket[2, 1]++;
        //            }
        //            else if (B >= 128 || B <= 191)
        //            {
        //                ColorBucket[2, 2]++;
        //            }
        //            else if (B >= 192 || B <= 255)
        //            {
        //                ColorBucket[2, 3]++;
        //            }

        //            // Second pic RGB
        //            if (R1 >= 0 || R1 <= 63)
        //            {
        //                ColorBucket2[0, 0]++;
        //            }
        //            else if (R1 >= 64 || R1 <= 127)
        //            {
        //                ColorBucket2[0, 1]++;
        //            }
        //            else if (R1 >= 128 || R1 <= 191)
        //            {
        //                ColorBucket2[0, 2]++;
        //            }
        //            else if (R1 >= 192 || R1 <= 255)
        //            {
        //                ColorBucket2[0, 3]++;
        //            }

        //            if (G1 >= 0 || G1 <= 63)
        //            {
        //                ColorBucket2[1, 0]++;
        //            }
        //            else if (G1 >= 64 || G1 <= 127)
        //            {
        //                ColorBucket2[1, 1]++;
        //            }
        //            else if (G1 >= 128 || G1 <= 191)
        //            {
        //                ColorBucket2[1, 2]++;
        //            }
        //            else if (G1 >= 192 || G1 <= 255)
        //            {
        //                ColorBucket2[1, 3]++;
        //            }

        //            if (B1 >= 0 || B1 <= 63)
        //            {
        //                ColorBucket2[2, 0]++;
        //            }
        //            else if (B1 >= 64 || B1 <= 127)
        //            {
        //                ColorBucket2[2, 1]++;
        //            }
        //            else if (B1 >= 128 || B1 <= 191)
        //            {
        //                ColorBucket2[2, 2]++;
        //            }
        //            else if (B1 >= 192 || B1 <= 255)
        //            {
        //                ColorBucket2[2, 3]++;
        //            }
        //            #endregion
        //        }
        //    }

        //    // Determine similarity between each bucket
        //    double similarity = 0;
        //    int counter = 0;
        //    for (int i = 0; i < ColorBucket.GetLength(0); i++)
        //    {
        //        for (int j = 0; j < ColorBucket.GetLength(1); j++)
        //        {
        //            if(ColorBucket[i, j] == 0 || ColorBucket2[i, j] == 0)
        //            {
        //                // do nothing if one bucket is 0
        //            }
        //            else
        //            {
        //                similarity += ColorBucket2[i, j] / ColorBucket[i, j];
        //                counter++; // equivalent to buckets with values
        //            }
                    
        //        }
        //    }

        //    // We have 12 buckets (3*4)
        //    similarity = (similarity / counter) * 100;

        //    //double x, y;
        //    //x = Convert.ToDouble(similarity);
        //    //y = Convert.ToDouble(ColorBucket.Length);
        //    //double similar = (x / y) * 100;
        //    return similarity;

        //    //Console.WriteLine(pic1.GetPixel(100, 100));
        //    //double x, y;
        //    //x = Convert.ToDouble(AmountOfEqualPixel);
        //    //y = Convert.ToDouble(Pic1_pixel[2]);
        //    //double similar = (x / y) * 100;
        //    //return similar; // rate of equal pixel color in percentage
        //}
        #endregion
        /// <summary>
        /// Compares resolution of 2 given Bitmap objects and returns false if not the same
        /// </summary>
        /// <param name="OrigPic"></param>
        /// <param name="AltPic"></param>
        /// <returns></returns>
        private static bool IsSameResolution(Bitmap OrigPic, Bitmap AltPic)
        {
            if(OrigPic.Height == AltPic.Height && OrigPic.Width == AltPic.Width)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Proportionally resize an image
        /// </summary>
        /// <param name="img"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <returns></returns>
        private static Bitmap Resizer(Bitmap image, int maxWidth, int maxHeight)
        {
            var ratioX = (double)maxWidth / image.Width;
            var ratioY = (double)maxHeight / image.Height;
            var ratio = Math.Min(ratioX, ratioY);

            var newWidth = (int)(image.Width * ratio);
            var newHeight = (int)(image.Height * ratio);

            var newImage = new Bitmap(newWidth, newHeight);
            Graphics.FromImage(newImage).DrawImage(image, 0, 0, newWidth, newHeight);
            Bitmap bmp = new Bitmap(newImage);

            return bmp; 
        }

        /// <summary>
        /// Calculates the similarity between two pictures using their RGB values (Histogram comparison)
        /// </summary>
        /// <param name="picOrigPath"></param>
        /// <param name="picAltPath"></param>
        /// <returns>Similarity in percentage</returns>
        private static double ColorBucketComparer(string picOrigPath, string picAltPath)
        {
            Bitmap OrigPic = new Bitmap(picOrigPath);
            Bitmap AltPic = new Bitmap(picAltPath);

            if(IsSameResolution(OrigPic, AltPic))
            {
                // Resize pictures to speed up processing => less pixels to compare = less processing time
                byte[][] OrigPicHist = CreateRGBHistogram(Resizer(OrigPic, 800, 800));
                byte[][] AltPicHist = CreateRGBHistogram(Resizer(AltPic, 800, 800));

                return ArrayComparer(OrigPicHist, AltPicHist);
            }
            else
            {
                return 0;
            }

        }
        /// <summary>
        /// Create a RGB histogram for a given image
        /// </summary>
        /// <param name="bmp"></param>
        /// <returns></returns>
        private static byte[][] CreateRGBHistogram(Bitmap bmp)
        {
            // Jagged array to contain RGB value as jagged is faster than 2D array
            byte[][] RGBArray = new byte[3][]; // RGB values range from 0-255 (inclusive)
            RGBArray[0] = new byte[256]; // R
            RGBArray[1] = new byte[256]; // G
            RGBArray[2] = new byte[256]; // B
            Color c; // GetPixel() returns RGB as type Color

            for (int i = 0; i < bmp.Width; i++)
            {
                for (int j = 0; j < bmp.Height; j++)
                {
                    c = bmp.GetPixel(i, j);
                    RGBArray[0][c.R]++;
                    RGBArray[1][c.G]++;
                    RGBArray[2][c.B]++;
                }
            }
            return RGBArray;
        }
        /// <summary>
        /// Compare 2 arrays with each other. Array has to be same size and same type.
        /// </summary>
        /// <param name="array1"></param>
        /// <param name="array2"></param>
        /// <returns></returns>
        private static double ArrayComparer(byte[][] array1, byte[][] array2)
        {
            if(array1.Length != array2.Length)
            {
                return 0;
            }
            else
            {
                int DividerCounter = 0; // Increment for each array element which is not 0
                double CumulatedDiff = 0;
                for (int i = 0; i < array1.Length; i++)
                {
                    byte[] InnerArray1 = array1[i];
                    byte[] InnerArray2 = array2[i];
                    for (int j = 0; j < InnerArray1.Length; j++)
                    {
                        if(InnerArray1[j] == 0 || InnerArray2[j] == 0)
                        {
                            // do nothing, ignore elements with 0
                        }
                        else
                        {
                            DividerCounter++;
                            // Calculate difference in percentage between 2 values
                            double diff = Math.Abs(InnerArray1[j] - InnerArray2[j]);
                            double avg = (Math.Abs(InnerArray1[j] + InnerArray2[j]) / 2);
                            double DiffInDecimal = (diff / avg);
                            CumulatedDiff += DiffInDecimal;
                        }   
                    }
                }
                return (CumulatedDiff / DividerCounter) * 100; // Multiply by 100 to get %
            }
        }
        /// <summary>
        /// This method handles which pictures will be compared to each other
        /// </summary>
        /// <param name="list"></param>
        public static void ColorBucketComparer(string path)
        {
            string[] list = Misc.PicList(path); // Array with FQP of pictures
            string[] PicFileName = Misc.PicName(path); // Array with only the file names
            string namesize = Misc.SizeOfArrayElement(PicFileName).ToString(); // Returns length of longest picture file name
            string filesize = Misc.FilesizeOfArrayElement(list).ToString(); // Returns length of biggest file size
            List<string> size = new List<string> { namesize, namesize }; // column width for log/result writer. if not provided then default(10) will be used
            string delimiter = "|";
            string alignment = Misc.StringLeftAlign(true);

            //Writer.Write(delimiter, size, alignment, "Name", "Filesize");
            //foreach (var item in list)
            //{
            //    Console.WriteLine(item);
            //    FileInfo fi = new FileInfo(item);
            //    Writer.Write(delimiter, size, alignment, fi.Name, fi.Length);
            //}

            Writer.Write(delimiter, size, alignment, "Picture 1", "Picture 2", "Similarity");
            // start with first (0) element
            for (int i = 0; i < list.Length - 1; i++)
            {
                // start with second (1) element
                for (int j = 1; j < list.Length - 1; j++)
                {
                    Console.WriteLine(list[i], list[j]);
                    if(ColorBucketComparer(list[i], list[j]) <= 30)
                    {
                        break; // break out of inner for-loop if similarity is too low (meaning the pictures are too different and it makes no sense to compare them anymore)
                    }
                    Writer.Write(delimiter, size, alignment, list[i], list[j], ColorBucketComparer(list[i], list[j]));
                }
            }
            Writer.Write("----------------------------");
        }
    }
}