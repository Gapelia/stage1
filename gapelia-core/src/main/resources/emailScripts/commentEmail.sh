#! /bin/bash

echo "<img src ='http://folio.is/static/images/folio-icon-solid.png'></img> <font color='#59b3a6'><h2></h2></font> $4 left a $1 on your story, <b><font color='#59b3a6'><a href='folio.is/read/$2'>$3</a></font></b>. <br><br><i>$5</i><br><br><hr><font color='gray'>Sent by <font color='#59b3a6'>Folio.</font> Change your email preferences in your <a href='folio.is/accounts'><font color='#59b3a6'>account settings.</font></a></font></font>" | mail -a "Content-type: text/html" -s "You've received feedback on Folio" -a "From: \"Folio\" <donotreply@folio.is>" $6
