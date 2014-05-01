#! /bin/bash

echo "<center><img src ='folio.is/static/images/folio-logo-email.png'><br></img> <font color='#59b3a6'><h2><i>Awww shucks!</i></h2></font> Your book <b>$1</b> was not accepted into the library <b>$2.</b> <br><br><a href='folio.is'><b>Log into folio and keep writing, we believe in you!</b></a><br><br><font color='grey'>Thanks for using Folio!</font></center>" | mail -a "Content-type: text/html" -s "Your book was not accepted into a library on Folio" -a "From: \"Folio\" <donotreply@folio.is>" $3
