package org.dhbw.imbit11.util;

public class StarterClass {

	public static void main(String[] args) {
		try {
			System.out.println("Exporting Graph...");
			new Instantiator();
			System.out.println("...finished!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
