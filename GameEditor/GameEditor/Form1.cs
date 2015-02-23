using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;
using System.Xml.Linq;
using System.IO;
using Treasure;

namespace GameEditor
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
        }

        private void quitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void loadXMLToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "XML|*.xml";
            ofd.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            ofd.FileName = "masterfile.xml";
            ofd.Title = "Load XML file";

            if(ofd.ShowDialog() == DialogResult.OK)
            {
                XElement rootElement = XElement.Load(ofd.FileName);
                txtBoxOut.Text = GetOutline(0, rootElement);
                editLevel(rootElement);
                using (StreamWriter sw = new StreamWriter("result.txt"))
                {
                    sw.WriteLine(GetOutline(0, rootElement));
                }
            }
            else
            {
                // Nah do nothing..
            }
        }

        private void btnTempExit_Click(object sender, EventArgs e)
        {
            quitToolStripMenuItem_Click(sender, e);
        }

        private void btnTempLoadXml_Click(object sender, EventArgs e)
        {
            loadXMLToolStripMenuItem_Click(sender, e);
        }

        private void aboutToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Work in progress");
        }

        private string GetOutline(int indentLevel, XElement element)
        {
            StringBuilder result = new StringBuilder();
            // TODO
            if (element.Attribute("id") != null)
            {
                //result = result.AppendLine(new string(' ', indentLevel * 2) + element.Attribute("id").Value);
                //foreach (var item in element.Descendants())
                //{
                //    result = result.AppendLine(new string(' ', indentLevel * 2) + item.Value);
                //}
                var test = element.Attribute("id").Value;
                result = result.AppendLine(element.Attribute("id").Value);
                try
                {
                    foreach (var item in element.Descendants())
                    {
                        element.SetElementValue("from", "test");
                        result = result.AppendLine(new string(' ', 4) + item.Name.ToString() + " " + item.Value);
                    }
                }
                catch (Exception e)
                {
#if DEBUG
                    Console.WriteLine(e.Message);
#endif
#if RELEASE
                    Console.WriteLine(e.Message);
                    Logger.Log(e.Message);
#endif
                }
            }

            foreach (XElement childElement in element.Elements())
            {
                result.Append(GetOutline(indentLevel + 1, childElement));
            }

            return result.ToString();
        }

        private void editLevel(XElement element)
        {
            // ID of node to be edited
            var id = txtBoxLvl.Text;

            try
            {
                MessageBox.Show(element.Attribute("id").Value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            //while(element.Attribute("id") != null)
            //{
            //    if(element.Attribute("id").Value == id)
            //    {
            //        MessageBox.Show(id);
            //    }
            //}
            //if (element.Attribute("id").Value == id)
            //{
            //    try
            //    {
            //        foreach (var item in element.Descendants())
            //        {
            //            element.SetElementValue("from", "test");
            //        }
            //    }
            //    catch (Exception e)
            //    {
            //        Console.WriteLine(e.Message);
            //        throw;
            //    }
            //}

            foreach (XElement childElement in element.Elements())
            {
                editLevel(childElement);
            }


        }
        private void btnSubmitLvl_Click(object sender, EventArgs e)
        {
            if(checkInputLen(txtBoxLvl.Text))
            {
                loadXMLToolStripMenuItem_Click(sender, e);
                ////MessageBox.Show("true");
                //Label lobj = new Label();
                //lobj.Text = "test";
                //lobj.AutoSize = true;
                //lobj.Name = "label11";
                //lobj.Location = new Point(txtBoxLvl.Location.X, txtBoxLvl.Location.Y + 23);
                //groupBox1.Controls.Add(lobj);
            }
            else
            {
                MessageBox.Show("Input incorrect. Enter node level in this format: LxxxEyyy", "Wrong input");
            }
        }

        /// <summary>
        /// Checks if the inputed level has the length of 8, e.g. (l000e000)
        /// and if it follow the convention. Converts the input string to lowercase.
        /// </summary>
        /// <param name="level">String in the format of lxxxeyyy</param>
        /// <returns>True if length is 8, else false</returns>
        private bool checkInputLen(string level)
        {
            level = level.ToLower();
            if(level.Length == 8)
            {
                // That is a lowercase L, not the number one
                if(level.Substring(0, 1) == "l" && level.Substring(4, 1) == "e")
                {
                    // Check if the parsed string is an int
                    int value, value1;
                    if(int.TryParse(level.Substring(1, 3), out value) && int.TryParse(level.Substring(5, 3), out value1))
                    {
                        return true;
                    }
                }
                else
                {
                    return false;
                }
                // return false, as the string does not contain a l, e or int values 
                return false;
            }
            else
            {
                return false;
            }
        }
    }
}
