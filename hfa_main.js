// define sort function for select list
function sort_by_nofteams( a, b )
{
  // get number of teams for entry 'a'
  number_a = parseInt( a.text.replace(/.*\((\d+)\)/g, "$1") );
  // get number of teams for entry 'b'
  number_b = parseInt( b.text.replace(/.*\((\d+)\)/g, "$1") );
  // return result
  result = number_a - number_b;
  return result;
}

// search for pool country select box
var selectboxes = document.getElementsByName( 'ctl00$CPMain$ddlPoolLeagues' );

// sanity check
if( selectboxes.length != 1 )
{
  var first_header = document.getElementsByTagName( 'h1' )[0];
  first_header.innerText = first_header.innerText + ' [hfa]';
  return;
}

// get first and only selectbox
var selectbox = selectboxes[0];

// array for later sorting
var sortlist = new Array(selectbox.options.length);

// debug output
var debug_text = 'Old order: ';

// remember text of selected item
var select_text = selectbox.options[selectbox.options.selectedIndex].text;

// fill array with select elements
for( iter=0; iter<selectbox.length; iter++ )
{
  sortlist[iter] = selectbox.options[iter];
  debug_text += selectbox.options[iter].text + ' ';
}

// sort array
sortlist.sort(sort_by_nofteams);
debug_text += '.\nNew order: ';

var selected_index = 0;
// apply sorting to select box
for( iter=0; iter<sortlist.length; iter++ )
{
  selectbox.options[iter] = sortlist[iter];
  debug_text += sortlist[iter].text + ' ';

  if( select_text == sortlist[iter].text )
    selected_index = iter;
}

// recover selected item
selectbox.options.selectedIndex = selected_index;

//alert( debug_text )
