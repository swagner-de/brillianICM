package org.dhbw.imbit11.backend;
 
import org.apache.shiro.util.JdbcUtils;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import java.util.ArrayList;

import org.apache.shiro.realm.jdbc.JdbcRealm;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
 

/*
 * Main class that provides functions to interact with the user database containing tables for users, user progress and groups
 * 
 */
public class UserRealm extends JdbcRealm {

	protected String getUserByEmail = "SELECT `user_id` FROM `user` WHERE `email` = ?";
	
	protected String newgroupQuery = "INSERT INTO `group`(`group_name`, `professor_id`) VALUES (?,(SELECT `user_id` FROM `user` WHERE `email` = ?))";
	protected String newUserQuery = "INSERT INTO `user`(`email`, `last_name`, `first_name`, `password`, `role`, `group`,`gender`) VALUES (?,?,?,?,?,?,?)";
	protected String newProgressQuery = "INSERT INTO `user_progress` VALUES (?,50,50,50,'l000e000')";
	
	protected String deleteUserQuery = "DELETE FROM `user` WHERE `email`=?";
	protected String deleteGroupQuery = "DELETE FROM `group` WHERE `group_id`=?";
	protected String deleteProfessorQuery = "DELETE FROM `user` WHERE `email`=?";
	protected String getProfessorsQuery = "SELECT `first_name`, `last_name`, `email` FROM `user` WHERE `role` = 'professor'";
	
	protected String updateEmailQuery = "UPDATE `user`SET `email`=? WHERE `email`=?";
	protected String updatePasswordQuery = "UPDATE `user`SET `password`=? WHERE `email`=?";
	protected String setProgressQuery = "UPDATE `user_progress` SET `cost`=?, `quality`=?, `time`=?, `path`=? WHERE `user_id` = ?";
	protected String getProgressQuery = "SELECT `last_name`, `first_name`, `gender`,`cost`, `quality`, `time`, `path` FROM `user_progress`, `user` WHERE `user_progress`.`user_id`= `user`.`user_id` AND `user_progress`.`user_id`=?";
	
	protected String getStudentsForProfessorQuery = "SELECT `first_name`, `last_name`, `cost`, `quality`, `time` , `group_name`, `email`, `group`  FROM `user`, `user_progress` , `group` WHERE `user`.`user_id` = `user_progress`.`user_id` AND`user`.`group` IN (SELECT `group_id` FROM `group` WHERE `professor_id` = (SELECT `user_id` FROM`user` WHERE `email` = ?)) AND `user`.`group` = `group`.`group_id` ORDER BY `last_name` ASC";
	protected String getGroupsForProfessorQuery = "SELECT * FROM `group`WHERE `professor_id`= (SELECT `user_id` FROM `user` WHERE `email` = ?)ORDER BY `group_name` ASC";
	protected String groupExistsQuery = "SELECT COUNT(`group_id`) FROM `group` WHERE `group_id`=?";
	protected String userExistsQuery = "SELECT Count(email) from `user` WHERE `email`=?";
	
    public UserRealm() {
    	super();

		//get the DataSource that JSecurity's JdbcRealm
		//should use to find the user's password
		//using the provided username
		//see context.xml for this DataSource's properties
        InitialContext ic;
        DataSource dataSource;
		try {
			
			ic = new InitialContext();
			dataSource = (DataSource) ic.lookup("java:/comp/env/jdbc/security");
			this.setDataSource(dataSource);
			
		} catch (NamingException e) {
			
			e.printStackTrace();
			
		}
    }

/*
 * Creates a new group with the first parameter as group name and assigned to the professor that is defined by his email
 * in the second parameter of the function 
 */
protected void createNewGroup(String groupname, String professor) throws SQLException {
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	ps = conn.prepareStatement(newgroupQuery);
    	ps.setString(1, groupname);
    	ps.setString(2, professor);
    
    	// Execute query
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + newgroupQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
} 

/*
 * does not work if the user has no corresponding entry in the user_progress table
 * returns an array list with arraylist for each student that is part of the group of the professor
 * defined by the email that is entered as parameter
 * 
 * the following information is stored about the students in each row of the arraylist:
 * 0:first_name, 1:last_name, 2:cost, 3:quality, 4:time, 5:group_name, 6:email, 7:group
 * 
 */
protected ArrayList<ArrayList<String>> getUsersForProfessor(String professor) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	ArrayList<ArrayList<String>> studentsForProfessor = new ArrayList<ArrayList<String>>();
    try {
    	ps = conn.prepareStatement(getStudentsForProfessorQuery);
    	ps.setString(1, professor);
    
    	// Execute query
    	rs = ps.executeQuery();
    	//System.out.println("executed the following statement on DB: " + getStudentsForProfessorQuery);
    	
    	    while (rs.next()) {
    	    	ArrayList<String> studentRow = new ArrayList<String>();
    	        studentRow.add(rs.getString(1));
    	        studentRow.add(rs.getString(2));
    	        studentRow.add(rs.getString(3));
    	        studentRow.add(rs.getString(4));
    	        studentRow.add(rs.getString(5));
    	        studentRow.add(rs.getString(6));
    	        studentRow.add(rs.getString(7));
    	        studentRow.add(rs.getString(8));
    	        if(isUserFinished(rs.getString(7))==true){
    	        	studentRow.add("Yes");
    	        }else{studentRow.add("No");
    	        }
    	        studentsForProfessor.add(studentRow);
    	    }
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    } 
    return studentsForProfessor;
}


/*
 * returns an array list with an array list containing information for each professors currently registered in the database
 * each professor row contains the following information:
 * 0:first_name, 1:last_name, 2:email
 * 
 */
protected ArrayList<ArrayList<String>> getProfessors() throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	ArrayList<ArrayList<String>> studentsForProfessor = new ArrayList<ArrayList<String>>();
    try {
    	ps = conn.prepareStatement(getProfessorsQuery);
    	
    
    	// Execute query
    	rs = ps.executeQuery();
    	//System.out.println("executed the following statement on DB: " + getStudentsForProfessorQuery);
    	
    	    while (rs.next()) {
    	    	ArrayList<String> studentRow = new ArrayList<String>();
    	        studentRow.add(rs.getString(1));
    	        studentRow.add(rs.getString(2));
    	        studentRow.add(rs.getString(3));
    	        studentsForProfessor.add(studentRow);
    	    }
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    } 
    return studentsForProfessor;
}

/*
 * returns an arraylist with name and registrationlink for each group of a professor
 */
protected ArrayList<ArrayList<String>> getGroupsForProfessor(String professor) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	ArrayList<ArrayList<String>> groups = new ArrayList<ArrayList<String>>();
    try {
    	ps = conn.prepareStatement(getGroupsForProfessorQuery);
    	ps.setString(1, professor);
    
    	// Execute query
    	rs = ps.executeQuery();
    	//System.out.println("executed the following statement on DB: " + getGroupsForProfessorQuery);
    	
    	    while (rs.next()) {
    	    	ArrayList<String> groupRow= new ArrayList<String>();
    	    	groupRow.add(rs.getString(1));
    	    	groupRow.add(rs.getString(2));
    	    	groups.add(groupRow);
    	    }
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    } 
    return groups;
}


/*
 * Returns true if a group with the given groupid does already exist in the database
 */
protected boolean groupExists(String groupid) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	boolean returnValue = false;
	try {
    	ps = conn.prepareStatement(groupExistsQuery);
    	int gid = Integer.parseInt(groupid);
    	//System.out.println(""+gid);
    	ps.setInt(1, gid);
    
    	// Execute query
    	rs = ps.executeQuery();
    	//System.out.println("executed the following statement on DB: " + groupExistsQuery);
    	
    	while(rs.next()){
    		int returning = rs.getInt(1);
    		returnValue = returning > 0;
    	}			
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
    return returnValue;
}


/*
 * Returns true if a user with the given email address does already exist in the database
 */
protected boolean userExists(String email) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	boolean returnValue = false;
	try {
    	ps = conn.prepareStatement(userExistsQuery);
    	
    	ps.setString(1, email);
    
    	// Execute query
    	rs = ps.executeQuery();
    	//System.out.println("executed the following statement on DB: " + userExistsQuery);
    	
    	while(rs.next()){
    		int returning = rs.getInt(1);
    		returnValue = returning > 0;
    	}			
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
    return returnValue;
}

/*
 * creates a new entry in the user table and a corresponding one in the user_progress table
 */
protected void createNewUser(String email, String lastname, String firstname, String password, String role, String group, int gender) throws SQLException {
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	PreparedStatement ps2 = null;
	PreparedStatement ps3 = null;
    try {
    	ps = conn.prepareStatement(newUserQuery);
    	ps.setString(1, email);
    	ps.setString(2, lastname);
    	ps.setString(3, firstname);
    	ps.setString(4, password);
    	ps.setString(5, role);
    	ps.setString(6, group);
    	ps.setInt(7, gender);
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + newUserQuery);
    	if(role=="student"){
    		ps2 = conn.prepareStatement(getUserByEmail);
    		ps2.setString(1, email);
    		ResultSet rs = ps2.executeQuery();
    		int user_id = 0;
    		while(rs.next()){
    			user_id = rs.getInt(1);
    		}	
    		//System.out.println("executed the following statement on DB: " + getUserByEmail);
    		ps3 = conn.prepareStatement(newProgressQuery);
    		ps3.setInt(1,user_id);
    		ps3.executeUpdate();    	
    		//System.out.println("executed the following statement on DB: " + newProgressQuery);
    	}
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}

/*
 * Updates the unverified Email (second parameter, currently existing email in database table user) with the
 * email the first parameter  of the function
 */
protected void updateEmail(String email, String unverifiedEmail) throws SQLException {
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	ps = conn.prepareStatement(updateEmailQuery);
    	ps.setString(1, email);
    	ps.setString(2, unverifiedEmail);
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + updateEmailQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}

/*
 * function to update the password of a user
 * requires the user's email address and the new password
 */
protected void updatePassword(String email, String password) throws SQLException {
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	ps = conn.prepareStatement(updatePasswordQuery);
    	ps.setString(1, password);
    	ps.setString(2, email);
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + updatePasswordQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}

/*
 * function to update the progress of a user
 * required input parameter: userid, costs, quality, time, path
 */
public void setUserProgress(String userid, int costs, int quality, int time, String path ) throws SQLException {
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	if(costs>100){costs=100;}
    	else if (costs<0){costs=0;}
    	if(quality>100){quality=100;}
    	else if (quality<0){quality=0;}
    	if(time>100){time=100;}
    	else if (time<0){time=0;}
    	
    	ps = conn.prepareStatement(setProgressQuery);
    	ps.setInt(1, costs);
    	ps.setInt(2, quality);
    	ps.setInt(3, time);
    	ps.setString(4, path);
    	ps.setString(5, userid);
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + setProgressQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}

/*
 * function to delete a user by handing his email to the function
 */
public void deleteUser(String email) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	ps = conn.prepareStatement(deleteUserQuery);
    	ps.setString(1, email);
    
    	// Execute query
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + deleteUserQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}

/*
 * function to delete a group by handing its group id to the function
 */
public void deleteGroup(String group_id)throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	ps = conn.prepareStatement(deleteGroupQuery);
    	ps.setInt(1, Integer.parseInt(group_id));
    
    	// Execute query
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + deleteGroupQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}

/*
 * function to delete a professor by handing his email to the function
 */
public void deleteProfessor(String email) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
    try {
    	ps = conn.prepareStatement(deleteProfessorQuery);
    	ps.setString(1, email);
    
    	// Execute query
    	ps.executeUpdate();
    	//System.out.println("executed the following statement on DB: " + deleteProfessorQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
}


/*
 * returns the user id for the user that is defined by the email address handed to the function
 */
public String getUserByEmail(String email) throws SQLException{
	
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	String userid="";
    try {
    	ps = conn.prepareStatement(getUserByEmail);
    	ps.setString(1, email);
    	rs = ps.executeQuery();
    	while(rs.next()){
    		userid+=rs.getString(1);
    	}	
    	//System.out.println("executed the following statement on DB: " + getUserByEmail);
    	//System.out.println("the userid was "+userid);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
    return userid;
}
/*
 * Returns an ArrayList<Object> containing the User Progress for the user with the ID that was handed to the function
 * The following entries can be fount in the arraylist: 0:last_name, 1:first_name, 2:gender, 3:cost, 4:quality, 5:time, 6:path
 */
public ArrayList<Object> getUserProgress(String userid) throws SQLException{
	Connection conn = dataSource.getConnection();
	PreparedStatement ps = null;
	ResultSet rs = null;
	ArrayList<Object> progress = new ArrayList<Object>();
    try {
    	ps = conn.prepareStatement(getProgressQuery);
    	ps.setString(1, userid);
    	rs = ps.executeQuery();
    	
    	while(rs.next()){
    		
    		progress.add(rs.getString(1));
    		progress.add(rs.getString(2));
    		progress.add(rs.getString(3));
    		progress.add(rs.getInt(4));
    		progress.add(rs.getInt(5));
    		progress.add(rs.getInt(6));
    		if(rs.getString(7)!=null){
    			progress.add(rs.getString(7));
    		}else{progress.add("");
    		
    		}
    	}	
    	//System.out.println("executed the following statement on DB: " + getProgressQuery);
    }finally{
    	JdbcUtils.closeStatement(ps);
    	conn.close();
    }
    return progress;
}

/*
 * sets the User Progress to the hard coded starting values of 0/0/0 for time/quality/cost and
 * overwrites the existing path with the defined entry node l000e000 
 */
public void resetUserProgress(String userEmail) throws SQLException{
	
	String userid = getUserByEmail(userEmail);
	setUserProgress(userid, 50, 50, 50, "l000e000");
	
	
}
/*
 * gets the User Progress and checks whether the path ends with the ending node
 */
public boolean isUserFinished(String userEmail) throws SQLException{
	//get the current path entry saved to the DB
	String userid= getUserByEmail(userEmail);
	//System.out.println(userid);
    String path = getUserProgress(userid).get(6).toString();
    
    //get the saved position from this path
    String[] pathElements = path.split(";");
    String position = pathElements[pathElements.length-1];
    //System.out.println("Last postition of the student: " + position);
    //check whether this position equals the ending node
    if(position.equals("l999e999")){
    	return true;
    }else{
    	return false;
    }
}
}