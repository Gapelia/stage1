#!/bin/bash

echo "<img src ='folio.is/static/images/folio-icon-solid.png'><br></img> <h2><br><i>Feedback Email</i></h2><br>Users name: <b>$1</b><br>Users email: <b>$2</b><br>Users message:<i><b>$3</b></i><br><br><hr><font color=‘gray’>Sent by <font color='#59b3a6'>Folio.</font> Change your email preferences in your<a href='folio.is/accounts'>account settings.</a></font>"" | mail -a "Content-type: text/html" -s "User feedback on Folio" -a "From: \"Folio\" <donotreply@folio.is>" tommy@gapelia.com