package com.gapelia.core.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by frankie on 5/28/14.
 */
public class Search {
	private List<Book> books;
	private List<Library> libraries;

	public Search(){
		books = new ArrayList<Book>();
		libraries = new ArrayList<Library>();
	}

	public void addBook(Book b){
		books.add(b);
	}

	public void addLibrary(Library l){
		libraries.add(l);
	}
}
