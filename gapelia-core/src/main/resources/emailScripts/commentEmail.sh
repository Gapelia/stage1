#! /bin/bash

echo "<img src ='folio.is/static/images/folio-icon-solid.png'><br></img> <font color='#59b3a6'><h2><i>Feedback: </i></h2></font> You got feedback on your story <b>$1</b>. <br><br><a href='folio.is/read/$2'><b>Log into folio and check it out!</b></a><br><br><hr><font color=‘gray’>Sent by <font color='#59b3a6'>Folio.</font> Change your email preferences in your<a href='folio.is/accounts'>account settings.</a></font>" | mail -a "Content-type: text/html" -s "You've received feedback on Folio" -a "From: \"Folio\" <donotreply@folio.is>" $3
