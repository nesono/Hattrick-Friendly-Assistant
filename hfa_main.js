// search for pool counrty select box
var selectboxes = document.getElementsByName( 'ctl00$CPMain$ddlPoolLeagues' );

// sanity check
if( selectboxes.length != 1 )
{
  alert( 'selectbox search error!' );
  return;
}

// get first and only selectbox
var selectbox = selectboxes[0];
// for debugging purposes
selectbox.options.length = 0;

// array for later sorting
var sortlist = new Array(selectbox.options.length);

for( iter=0; iter<selectbox.length; iter++ )
{
  sortlist[iter] = selectbox.options[iter];
}
