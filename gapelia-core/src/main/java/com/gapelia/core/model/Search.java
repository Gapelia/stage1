package com.gapelia.core.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by frankie on 5/28/14.
 */
public class Search {
	private List<Book> results;

	public Search(){
		results = new ArrayList<Book>();
	}

	public void addBook(Book b){
		results.add(b);
	}
}
