#! /bin/bash

echo "<center><img src ='folio.is/static/images/folio-logo-email.png'><br></img> <font color='#59b3a6'><h2><br><i>Feedback Email</i></h2></font><br>Users name: <b>$1</b><br>Users email: <b>$2</b><br>Users message:<i><b>$3</b></i><br><br></center>" | mail -a "Content-type: text/html" -s "User feedback on Folio" -a "From: \"Folio\" <donotreply@folio.is>" team@folio.is
