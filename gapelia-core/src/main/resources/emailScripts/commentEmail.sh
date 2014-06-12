#! /bin/bash

echo "<center><img src ='folio.is/static/images/folio-logo-email.png'><br></img> <font color='#59b3a6'><h2><i>Feedback: </i></h2></font> Somebody left you feedback on your book <b>$1</b>. <br><br><a href='folio.is/read/$2'><b>Log into folio and check it out!</b></a><br><br><font color='grey'>Thanks for using Folio!</font></center>" | mail -a "Content-type: text/html" -s "You've received feedback on Folio" -a "From: \"Folio\" <donotreply@folio.is>" $3
