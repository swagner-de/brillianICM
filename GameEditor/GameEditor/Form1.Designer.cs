namespace GameEditor
{
    partial class frmMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.loadXMLToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripSeparator();
            this.quitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.btnTempLoadXml = new System.Windows.Forms.Button();
            this.btnTempExit = new System.Windows.Forms.Button();
            this.txtBoxOut = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.txtBoxLvl = new System.Windows.Forms.TextBox();
            this.btnSubmitLvl = new System.Windows.Forms.Button();
            this.menuStrip1.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.ImageScalingSize = new System.Drawing.Size(24, 24);
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.aboutToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Padding = new System.Windows.Forms.Padding(4, 1, 0, 1);
            this.menuStrip1.Size = new System.Drawing.Size(879, 24);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.loadXMLToolStripMenuItem,
            this.toolStripMenuItem1,
            this.quitToolStripMenuItem});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 22);
            this.fileToolStripMenuItem.Text = "File";
            // 
            // loadXMLToolStripMenuItem
            // 
            this.loadXMLToolStripMenuItem.Name = "loadXMLToolStripMenuItem";
            this.loadXMLToolStripMenuItem.Size = new System.Drawing.Size(127, 22);
            this.loadXMLToolStripMenuItem.Text = "Load XML";
            this.loadXMLToolStripMenuItem.Click += new System.EventHandler(this.loadXMLToolStripMenuItem_Click);
            // 
            // toolStripMenuItem1
            // 
            this.toolStripMenuItem1.Name = "toolStripMenuItem1";
            this.toolStripMenuItem1.Size = new System.Drawing.Size(124, 6);
            // 
            // quitToolStripMenuItem
            // 
            this.quitToolStripMenuItem.Name = "quitToolStripMenuItem";
            this.quitToolStripMenuItem.Size = new System.Drawing.Size(127, 22);
            this.quitToolStripMenuItem.Text = "Quit";
            this.quitToolStripMenuItem.Click += new System.EventHandler(this.quitToolStripMenuItem_Click);
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = new System.Drawing.Size(52, 22);
            this.aboutToolStripMenuItem.Text = "About";
            this.aboutToolStripMenuItem.Click += new System.EventHandler(this.aboutToolStripMenuItem_Click);
            // 
            // btnTempLoadXml
            // 
            this.btnTempLoadXml.Location = new System.Drawing.Point(8, 26);
            this.btnTempLoadXml.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnTempLoadXml.Name = "btnTempLoadXml";
            this.btnTempLoadXml.Size = new System.Drawing.Size(123, 36);
            this.btnTempLoadXml.TabIndex = 1;
            this.btnTempLoadXml.Text = "button1";
            this.btnTempLoadXml.UseVisualStyleBackColor = true;
            this.btnTempLoadXml.Click += new System.EventHandler(this.btnTempLoadXml_Click);
            // 
            // btnTempExit
            // 
            this.btnTempExit.Location = new System.Drawing.Point(156, 26);
            this.btnTempExit.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnTempExit.Name = "btnTempExit";
            this.btnTempExit.Size = new System.Drawing.Size(122, 36);
            this.btnTempExit.TabIndex = 2;
            this.btnTempExit.Text = "button2";
            this.btnTempExit.UseVisualStyleBackColor = true;
            this.btnTempExit.Click += new System.EventHandler(this.btnTempExit_Click);
            // 
            // txtBoxOut
            // 
            this.txtBoxOut.Location = new System.Drawing.Point(8, 81);
            this.txtBoxOut.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txtBoxOut.Multiline = true;
            this.txtBoxOut.Name = "txtBoxOut";
            this.txtBoxOut.ReadOnly = true;
            this.txtBoxOut.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.txtBoxOut.Size = new System.Drawing.Size(270, 299);
            this.txtBoxOut.TabIndex = 3;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnSubmitLvl);
            this.groupBox1.Controls.Add(this.txtBoxLvl);
            this.groupBox1.Location = new System.Drawing.Point(283, 81);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(385, 299);
            this.groupBox1.TabIndex = 4;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "groupBox1";
            // 
            // txtBoxLvl
            // 
            this.txtBoxLvl.Location = new System.Drawing.Point(6, 19);
            this.txtBoxLvl.Name = "txtBoxLvl";
            this.txtBoxLvl.Size = new System.Drawing.Size(100, 20);
            this.txtBoxLvl.TabIndex = 5;
            this.txtBoxLvl.Text = "l000e000";
            // 
            // btnSubmitLvl
            // 
            this.btnSubmitLvl.Location = new System.Drawing.Point(112, 16);
            this.btnSubmitLvl.Name = "btnSubmitLvl";
            this.btnSubmitLvl.Size = new System.Drawing.Size(75, 23);
            this.btnSubmitLvl.TabIndex = 6;
            this.btnSubmitLvl.Text = "Open Lvl";
            this.btnSubmitLvl.UseVisualStyleBackColor = true;
            this.btnSubmitLvl.Click += new System.EventHandler(this.btnSubmitLvl_Click);
            // 
            // frmMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(879, 463);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.txtBoxOut);
            this.Controls.Add(this.btnTempExit);
            this.Controls.Add(this.btnTempLoadXml);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "frmMain";
            this.ShowIcon = false;
            this.Text = "Game Editor";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem loadXMLToolStripMenuItem;
        private System.Windows.Forms.ToolStripSeparator toolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem quitToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem;
        private System.Windows.Forms.Button btnTempLoadXml;
        private System.Windows.Forms.Button btnTempExit;
        private System.Windows.Forms.TextBox txtBoxOut;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btnSubmitLvl;
        private System.Windows.Forms.TextBox txtBoxLvl;
    }
}

