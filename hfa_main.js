// define sort function for select list
function sort_by_nofteams( a, b )
{
  // get number of teams for entry 'a'
  // get number of teams for entry 'b'
  // return result
}

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

// array for later sorting
var sortlist = new Array(selectbox.options.length);

// fill array with select elements
for( iter=0; iter<selectbox.length; iter++ )
{
  sortlist[iter] = selectbox.options[iter];
}

// sort array
sortlist.sort(sort_by_nofteams);

// apply sorting to select box
for( iter=0; iter<selectbox.length; iter++ )
{
   selectbox.options[iter] = sortlist[iter];
}
