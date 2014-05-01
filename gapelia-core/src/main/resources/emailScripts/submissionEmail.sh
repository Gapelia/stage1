#! /bin/bash

echo "<center><img src ='folio.is/static/images/folio-logo-email.png'><br></img> <font color='#59b3a6'><h2><i>Pending Submission</i></h2></font> The book <b>$1</b> has been submitted into your library <b>$2</b> <br><br><a href='folio.is/librarymanager/$4'><b>Log into folio and see if it makes the cut!</b></a><br><br><font color='grey'>Thanks for using Folio!</font></center>" | mail -a "Content-type: text/html" -s "Pending submission request on Folio" -a "From: \"Folio\" <donotreply@folio.is>" $3
