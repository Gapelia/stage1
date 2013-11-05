{% extends "base.html" %}


{% block title %}Your Settings{% endblock title %}

{% block content %}
    <header id="action-bar">
        <a href="{% url 'home' %}"><h1>Gapelia</h1></a>

        <ul>
            <li id="action-create"><a href="#" data-reveal-id="create-modal-01" data-animation="fade">Create book</a></li>
            <li id="action-gapelians"><a href="index-gapelians.html">Gapelians</a></li>
            <li id="action-books"><a href="index-books.html">Books</a></li>
            <li id="action-dimensions"><a href="index-dimensions.html">Dimensions</a></li>
            <li id="action-user">
                <a href="#"><img src="{{ user|get_user_avatar }}" /></a>

                <ul>
                    <li><a href="#">View Profile</a></li>
                    <li><a href="#">Edit Profile</a></li>
                    <li><a href="settings.html">Settings</a></li>
                    <li><a href="#">Log Out</a></li>
                </ul>
            </li>

            <!--/ <li id="action-account"><span class="top">Sign Up</span><span class="bottom">Log In</span></li> /-->
        </ul>
    </header>

    <section id="breadcrumbs">
        <a href="">Home</a> > <a href="{% url 'user-profile' user.username %}">{{ user.first_name }} {{ user.last_name }}</a> > <a href="" class="current">Settings</a>
    </section>

    <!--/ the good stuff																																	 /-->

    <section id="main-content">

        <div id="settings-wrapper">

            <aside id="settings-sidebar">
                <ul>
                    <li class="active"><a href="{% url 'profile-settings' %}">General</a></li>
                    <li><a href="{% url 'password-settings' %}">Password</a></li>
                </ul>
            </aside>

            <div id="settings-content">
                <h3>Edit Profile Settings</h3>

                <div class="setting-row" id="name-edit">
                    <div class="setting-name">Full Name</div>
                    <span class="editable user-setting">{{ user.first_name }} {{ user.last_name }}</span>
                    <a href="#" class="btn-edit edit">Edit</a>
                </div>

                <div class="setting-row" id="username-edit">
                    <div class="setting-name">Username</div>
                    <span class="editable user-setting">{{ user.username }}</span>
                    <a href="#" class="btn-edit edit">Edit</a>
                </div>

                <div class="setting-row" id="email-edit">
                    <div class="setting-name">Email</div>
                    <span class="editable user-setting">{{ user.email }}</span>
                    <a href="#" class="btn-edit edit">Edit</a>
                </div>

                <div class="setting-row" id="location-edit">
                    <div class="setting-name">Location</div>
                    <span class="editable user-setting">{{ user.user_profile.location}}</span>
                    <a href="#" class="btn-edit edit">Edit</a>
                </div>

                <div class="setting-row" id="tags-edit">
                    <div class="setting-name">Lifestyle Tags</div>
                    <form class="editable user-setting">
                        <input id="tags_1" type="text" class="tags editable" value=""/>
                    </form>
                    <a href="#" class="btn-edit edit">Edit</a>
                </div>

                <a href="{% url 'deactivate-account' %}"><button class="btn-delete">Delete account</button></a>
            </div>

        </div>

        <!--/ book creation modals																													 /-->
        <!--/ modal 01																																			 /-->

        <div id="create-modal-01" class="reveal-modal xlarge">
            <div class="modal-row modal-header">
                <span class="active">1. Create discovery book</span>
                <span>2. Upload Content</span>
                <span>3. Save &amp; Publish</span>
            </div>

            <div class="modal-row">
                <div class="modal-title">Title*</div>
                <input class="modal-input" type="text"/>
            </div>

            <div class="modal-row">
                <div class="modal-title">Add description
                    <span id="modal-counter"></span><span>characters left</span>
                </div>

                <textarea id="modal-description" class="modal-input" cols="50" rows="4"></textarea>
            </div>

            <div class="modal-row">
                <div class="modal-title">Choose Dimension*</div>
                <input class="modal-input" type="text"/>
            </div>

            <div class="modal-row">
                <div class="modal-title">Add a Geotag</div>
                <input class="modal-input" type="text"/>
            </div>

            <div class="modal-row">
                <div class="modal-title">Add a Passion</div>
                <input class="modal-input" type="text"/>
            </div>

            <div class="modal-row">
                <div class="modal-title">Add a Feeling</div>
                <input class="modal-input" type="text"/>
            </div>

            <div class="modal-row next-modal">
                <a href="#" class="close-reveal-modal" data-reveal-id="create-modal-02" data-animation="fade">Next</a>
            </div>
        </div>

        <!--/ modal 02																																			 /-->

        <div id="create-modal-02" class="reveal-modal xlarge">
            <div class="modal-row modal-header">
                <span>1. Create discovery book</span>
                <span class="active">2. Upload Content</span>
                <span>3. Save &amp; Publish</span>
            </div>

            <div class="modal-row" id="filepicker-iframe">
                <iframe src="https://www.filepicker.io/dialog/open/?key=AI64IEXbTBOTCMcUXllQHz&id=1372359022211&referrer=localhost&iframe=false&version=v1&multi=true&m=image/*#/computer/"></iframe>
            </div>

            <div class="modal-row next-modal">
                <a href="book-creation.html">Next</a>
            </div>
        </div>

    </section>

{% endblock content %}

{% block scripts %}
    <script>
        {% autoescape off %}
            var tags = {{ tags }};
        {% endautoescape %}
    </script>

    <script src="/static/scripts/carouFredSel.js"></script>
    <script src="/static/scripts/ba-throttle-debounce.js"></script>
    <script src="/static/scripts/mousewheel.js"></script>
    <script src="/static/scripts/touchSwipe.js"></script>
    <script src="/static/scripts/transit.js"></script>
    <script src="/static/scripts/squishy.js"></script>
    <!--/ <script src="//api.filepicker.io/v1/filepicker.js"></script> /-->
    <script src="/static/scripts/filepicker.js"></script>
    <script src="/static/scripts/simplyCountable.js"></script>
    <script src="/static/scripts/spin.min.js"></script>
    <script src="/static/scripts/jquery-ui-1.10.3.custom.min.js"></script>
    <script src="/static/scripts/jquery.fileupload.js"></script>
    <script src="/static/scripts/editable.js"></script>
    <script src="/static/scripts/tagsinput.js"></script
    <script src="/static/scripts/gapelia.js"></script>
    <script src="/static/scripts/squishy.js"></script>
    <script src="/static/scripts/profile.js"></script>
    <script>
        $(document).ready(function() {
            $("#modal-description").simplyCountable({
                counter: "#modal-counter",
                maxCount: 300
            });
        });
    </script>
{% endblock scripts %}