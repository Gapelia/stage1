
								<div id="tabs-container" class="cbp-contentslider">
									<nav id="sidebar-nav">
										<a href="#tab-layout" title="">Layout</a>
										<a href="#tab-content" title="">Content</a>
										<a href="#tab-tags" title="">Tags</a>
										<a href="#tab-settings" title="">Settings</a>
									</nav>

									<ul id="sidebar-content">
										<li id="tab-layout">
											<section id="view-mode">
												<section>
													{% show_layouts %}
												</section>
											</section>
										</li>

										<li id="tab-content">
											<input id="title-editor" value="{{ first_page.title }}" type="text" placeholder="Page title"/>

											<textarea id="text-editor" name="content">
												{{ first_page.description|safe }}
											</textarea>
										</li>

										<li id="tab-tags">
											<section class="tag-input">
												<label for="bc-geotag">Geotag</label>
												<input id="bc-geotag" value="{{ first_page|get_page_location }}" type="text" placeholder=""/>
												<span class="hint">ex. Hawaii</span>
											</section>

											<section class="tag-input">
												<label for="passion">Passion</label>
												<input id="passion" name="passion" value="{{ first_page|get_page_tag:'passion' }}" type="text"/>
												<span class="hint">ex. Surfing</span>
											</section>

											<section class="tag-input">
												<label for="feeling">Feeling</label>
												<input id="feeling" name="feeling" value="{{ first_page|get_page_tag:'feeling' }}" type="text"/>
												<span class="hint">ex. Adrenaline</span>
											</section>

											<section class="tag-input">
												<label>Custom Wiki Link</label>
												<input id="wiki-link"
												value="{% if first_page.custom_link %}{{ first_page.custom_link }}{% endif %}" type="text" placeholder=""/>
												<span class="hint">(default link will associate geotag)</span>
											</section>
										</li>

										<li id="tab-settings">
											<p>Privacy</p>
											{% show_licences %}
										</li>
									</ul>
								</div>
