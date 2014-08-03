#! /bin/bash

echo "<img src ='folio.is/static/images/folio-icon-solid.png'><br></img><h2><i>Hey,</i></h2> A new story, <b>$1</b> was accepted into the library <b>$2</b> that you are subscribed to, so we thought we'd let you know.<br><br><a href='folio.is/read/$4'><b>Log into folio and check it out!</b></a><br><br><hr><font color=‘gray’>Sent by <font color='#59b3a6'>Folio.</font> Change your email preferences in your<a href='folio.is/accounts'>account settings.</a></font>" | mail -a "Content-type: text/html" -s "There is a new addition to a library you subscribe to!" -a "From: \"Folio\" <donotreply@folio.is>" $3
