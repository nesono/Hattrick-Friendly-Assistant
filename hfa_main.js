// define sort function for select list
function sort_by_nofteams( a, b )
{
  // get number of teams for entry 'a'
  var number_a = parseInt( a.text.replace(/.*\((\d+)\)/g, "$1") );
  // get number of teams for entry 'b'
  var number_b = parseInt( b.text.replace(/.*\((\d+)\)/g, "$1") );
  // return result
  var result = number_a - number_b;
  return result;
}

// search for pool counrty select box
var selectboxes = document.getElementsByName( 'ctl00$CPMain$ddlPoolLeagues' );

// sanity check
if( selectboxes.length != 1 )
{
  var first_header = document.getElementsByTagName( 'h1' )[0];
  first_header.innerText = first_header.innerText + ' [hfa on]';
  return;
}

// get first and only selectbox
var selectbox = selectboxes[0];

// array for later sorting
var sortlist = new Array(selectbox.options.length);

// debug output
var debug_text = 'Old order: ';

// fill array with select elements
for( iter=0; iter<selectbox.length; iter++ )
{
  sortlist[iter] = selectbox.options[iter];
  debug_text += selectbox.options[iter].text + ' ';
}

// sort array
sortlist.sort(sort_by_nofteams);
debug_text += '.\nNew order: ';

// apply sorting to select box
for( iter=0; iter<selectbox.length; iter++ )
{
  selectbox.options[iter] = sortlist[iter];
  debug_text += sortlist[iter].text + ' ';
}

selectbox.options.selectedIndex = 0;

//alert( debug_text )

