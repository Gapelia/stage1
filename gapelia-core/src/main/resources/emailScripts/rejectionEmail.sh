#! /bin/bash

echo "<img src ='folio.is/static/images/folio-icon-solid.png'><br></img> <font color='#59b3a6'><h2><i>Aww sorry,</i></h2></font> Your story <b>$1</b> was not accepted into the library <b>$2.</b> <br><br><a href='folio.is'><b>Log into folio and edit your story, it is possible that the editor left some feedback for you. We believe in you!</b></a><br><br><hr><font color=‘gray’>Sent by <font color='#59b3a6'>Folio.</font> Change your email preferences in your<a href='folio.is/accounts'>account settings.</a></font>" | mail -a "Content-type: text/html" -s "Your book was not accepted into a library on Folio" -a "From: \"Folio\" <donotreply@folio.is>" $3
