dragon branch
=

Directions on running this app locally will have to wait, nothing is 100% yet. However, here are some random things that are important anyway.

=

— Things to do before and after pushing/pulling to the repo:

	git pull origin [branch-name]
	mvn clean package

And then you will be able to see and work on the latest changes.

=

— Weekly Product Plan:
https://docs.google.com/document/d/1poOfJytHdElwZ7Ez3xCtGT2iAA4v4nl4T74o_Spy9VI

— Monthly Product Plan:
https://docs.google.com/spreadsheet/ccc?key=0AhnSj1nHiLyCdDBPUURQNHJmT2labU9PZUZ3WmMyVVE

=

Sometimes GitHub doesn't care what you put in your .gitignore and that's annoying. To make sure GitHub does NOT upload a file that should stay local (like, personal local environment parameters), run this in Terminal:

	git update-index --assume-unchanged [path to file]

Here's my example:

	git update-index --assume-unchanged src/main/java/com/gapelia/core/auth/SocialLogin.java

If you want GitHub to see that file again, run this in Terminal:

	git update-index --no-assume-unchanged [path to file]

Here's another example:

	git update-index --no-assume-unchanged src/main/java/com/gapelia/core/auth/SocialLogin.java

=

— Deploying to Heroku:

Longer guide to come soon, just make sure you have Java and War set up. Then, run this command in the root folder of the repo, locally (in Terminal, dummy):

	heroku deploy:war --war target/gapelia.war --app gapelia-dev

If you are on a Mac, this probably packages and deploys the app in 2 seconds. On Windows 8, this takes about 20 minutes. I'm not joking.
