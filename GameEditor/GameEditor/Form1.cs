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
                        var test1 = item.Name;
                        var test2 = item.Value;
                        //item.SetElementValue("from", "test");
                        result = result.AppendLine(item.Name.ToString());
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    throw;
                }
            }

            foreach (XElement childElement in element.Elements())
            {
                result.Append(GetOutline(indentLevel + 1, childElement));
            }

            return result.ToString();
        }
    }
}
