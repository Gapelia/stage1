#! /bin/bash

echo "<center><img src ='folio.is/static/images/folio-logo-email.png'><br></img> <font color='#59b3a6'><h2><i>Hey!</i></h2></font> A new book, <b>$1</b> was accepted into the library <b>$2</b> that you are subscribed to, so we thought we'd let you know.<br><br><a href='folio.is/read/$4'><b>Log into folio and check it out!</b></a><br><br><font color='grey'>Thanks for using Folio!</font></center>" | mail -a "Content-type: text/html" -s "There is a new addition to a library you subscribe to!" -a "From: \"Folio\" <donotreply@folio.is>" $3
