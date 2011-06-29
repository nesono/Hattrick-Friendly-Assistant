// global variable to be used in sort and discard functions
var myCountries = new Array();

// sort function to sort by number of divisions per country
// and if divisions equal by number of teams
function sort_by_divs( a, b )
{
  var div_a = myCountries[a.value];
  var div_b = myCountries[b.value];
  // get number of teams for entry 'a'
  var number_a = parseInt( a.text.replace(/.*\((\d+)\)/g, "$1") );
  // get number of teams for entry 'b'
  var number_b = parseInt( b.text.replace(/.*\((\d+)\)/g, "$1") );

  if (div_a == div_b)
    return number_a - number_b;
  else
     return div_a - div_b;
}

// function to find select box
function find_pool_select()
{
  // search for pool country select box
  var selectboxes = document.getElementsByTagName( 'select' );

  // sanity check
  if( selectboxes.length != 4 )
  {
    var headers = document.getElementsByTagName( 'h2' );
    idx = 3;

    // search for browse pool href
    browse_pool = document.getElementById( 'ctl00_ctl00_CPContent_CPSidebar_btnBrowsePool' );

    if( !browse_pool )
      headers[idx].innerText = headers[idx].innerText + ' ...hfa waiting until challenge finished';
    else
      headers[idx].innerText = headers[idx].innerText + ' ...press browse pool';
    return;
  }

  // return found box
  return selectboxes[0];
}

// functionn parsing the flags page
function flags_page()
{
  // check if last flag information old enough
  var now = new Date();
  //var last;
  //try {
  //  last = JSON.parse(localStorage['flags_last_update']);
  //}
  //catch( e ) {
  //  last = new Date(0);
  //}

  //var diff = now - last;
  //alert( 'diff: ' + diff );
  // now we should check if the diff is too small to do an update?

  // get all flags
  var all_flags = document.getElementsByClassName( 'flag inner' );
  //alert( all_flags.length + ' flags found!' );

  // helper variable if number of countries changes :)
  var total_countries = 127;
  // iterating index - start with 0
  var idx = 0;

  // the resulting arrays for visited_by and visited countries
  var visited_by = new Array();
  var visited    = new Array();

  // get all countries visited us and save them (first 127 flags)
  for( flag_idx=0; flag_idx<127; flag_idx++ )
  {
    // get child (img) of current anchor
    var image = all_flags[idx].childNodes[0];
    // check if country active (not inactive)
    if( image.alt.indexOf( "Inactive" ) == -1 )
    {
      // get href
      var tmp_href = all_flags[idx].href;
      // get index of LeagureID=
      var parse_idx = tmp_href.indexOf( "LeagueID=" );
      // parse to integer
      var league_id = parseInt( tmp_href.substr( parse_idx+9 ) );
      visited_by.push( league_id );
    }
    idx++;
  }
  //alert( visited_by.length + ' visited by' );

  // save data
  localStorage['flags_visited_by'] = JSON.stringify(visited_by);

  // get all visited countries and save them (next 127 flags)
  for( flag_idx=0; flag_idx<127; flag_idx++ )
  {
    // get child (img) of current anchor
    var image = all_flags[idx].childNodes[0];
    // check if country active (not inactive)
    if( image.alt.indexOf( "Inactive" ) == -1 )
    {
      // get href
      var tmp_href = all_flags[idx].href;
      // get index of LeagureID=
      var parse_idx = tmp_href.indexOf( "LeagueID=" );
      // parse to integer
      var league_id = parseInt( tmp_href.substr( parse_idx+9 ) );
      visited.push( league_id );
    }
    idx++;
  }
  //alert( visited.length + ' visited' );

  // save data
  localStorage['flags_visited'] = JSON.stringify(visited);
  // save update time for clubs flags
  localStorage['flags_last_update'] = now.toUTCString();

  //alert( 'saved flag collection at ' + localStorage['flags_last_update'] );

  var header1 = document.getElementsByTagName( 'h1' );
  if( header1.length > 0 )
    header1[0].innerText = header1[0].innerText + ' (saved!)';
  else
    alert( 'saved flag collection' )
}

// function parsing the leagues page
function leagues_page()
{
  // get the leagues table (validate me!)
  var leages_table = document.getElementsByClassName( 'indent' );

  // get allrows from table
  var leag_rows = leages_table[0].rows;

  // the resulting array
  var divs_per_league = new Array();
  // walk through all rows
  for( r_idx=0; r_idx< leag_rows.length; r_idx++ )
  {
    try
    {
      // get the cells from current row
      var leag_cols = leag_rows[r_idx].cells;
      // first cell contains flag image (and league id) in anchor
      var tmp_href = leag_cols[0].childNodes[1].href;
      // get index of LeagureID=
      var parse_idx = tmp_href.indexOf( "LeagueID=" );
      // parse to integer
      var league_id = parseInt( tmp_href.substr( parse_idx+9 ) );

      // cell 4 contains number of divisions
      divs_per_league[league_id] = leag_cols[4].innerText;

      //localStorage[ 'league ' + league_id ] = leag_cols[4].innerText;

      //alert( 'leagure ' + league_id + ' contains ' +  localStorage[ 'league ' + league_id ] + ' divisions' );
    }
    catch(e)
    {
      //alert( 'exception occured' );
    }
  }

  // save data
  localStorage['divs_per_league'] = JSON.stringify( divs_per_league );

  var header1 = document.getElementsByTagName( 'h1' );
  if( header1.length > 0 )
    header1[0].innerText = header1[0].innerText + ' (saved!)';
  else
    alert( 'saved divisions per country' )

}

// function handling the challenges page
function challenge_page()
{
  // get first and only selectbox
  var selectbox = find_pool_select();
  if( selectbox == null )
    return;

  var last = localStorage['flags_last_update'];
  if( last == undefined )
  {
    myId = document.getElementById("teamLinks");
    team_id = myId.innerHTML.match(/.*TeamID=(\d+)\".*/,"$1")[1];

    sidebar = document.getElementById( 'sidebar' );
    sidebar.innerHTML += '<div class="sidebarBox"><div class="boxHead"><div class="boxLeft">\
                          <h2 class="">HFA update necessary</h2></div></div><div class="boxBody">\
                          Please update your flags and leagues data by clicking the links below \
                          and come back to this page.<ul><li><a id="" href="/Club/Flags/?teamid="'+team_id+'">\
                          Flags</a></li><li><a id="" href="/World/Leagues/">Leagues</a></li></ul></div>\
                          <div class=\'boxFooter\'><div class=\'boxLeft\'>&nbsp;</div></div></div>';
    return;
  }

  // fill my countries array with league table
  myCountries = JSON.parse( localStorage['divs_per_league'] );

  // get visited list (ignore visited by for now)
  var visited = JSON.parse( localStorage['flags_visited'] );
  // reset visited countries in my countries array
  for (iter = 0; iter < visited.length; iter++ )
    myCountries[visited[iter]] = "visited";

  // get selected value from checkbox
  var selected_value = selectbox.options[selectbox.options.selectedIndex].value;

  // array for later sorting
  var sortlist = new Array(selectbox.options.length);

  // debug output
  var debug_text = 'Old order: ';

  // remember text of selected item
  var select_text = selectbox.options[selectbox.options.selectedIndex].text;

  // counts removed items
  var rem_count=0;
  // to store removed countries
  var removed="";
  // remember original length
  var orig_len = selectbox.options.length;

  // start debugging string
  debug_text += "Found "+ selectbox.options.length + " available countries\n";

  // iteration index
  var iter = 0;
  // temporary list
  var new_list = new Array();
  // go through all items in checkbox
  while(selectbox.options.length > 0)
  {
    // check if country NOT already visited
    if (myCountries[selectbox.options[0].value] != "visited")
    {
      // move entry to new list
      new_list[iter] = selectbox.options[0];
      new_list[iter].text += " [" + myCountries[selectbox.options[0].value] + "]";
      iter++;
    }
    else
    {
      // remember removed text
      removed += selectbox.options[0].text;
      rem_count++;
    }
    // reset item in select box
    selectbox.options[0] = null;
  }

  // update debug text
  debug_text += "Kept "+ iter + " non-visited\n";
  debug_text += "Removed "+ rem_count + " already visited\n";

  // sort remaining items by divisions
  new_list.sort(sort_by_divs);

  // move items back into selectbox
  for( iter=0; iter<new_list.length; iter++ )
  {
    selectbox.options[iter] = new_list[iter];
  }

  // reset selected item
  for( iter=0; iter<selectbox.options.length; iter++ )
  {
    if( selectbox[iter].value == selected_value )
    {
      selectbox.options.selectedIndex = iter;
    }
  }
  //setTimeout('__doPostBack(\'ctl00$ctl00$CPContent$CPMain$ddlPoolLeagueLevels\',\'\')', 100)

  // update status display
  var textbox = document.getElementById("ctl00_ctl00_CPContent_CPMain_pnlPoolCounts");
  // check if everything remove but own country
  if( rem_count == orig_len-1 )
  {
    // tell how many countries have been removed
    textbox.innerHTML += "<br>Removed <b>"+ rem_count +"/" + orig_len + "</b> countries. Reloading...";
    setTimeout('__doPostBack(\'ctl00$ctl00$CPContent$CPMain$ddlPoolLeagues\',\'\')', 500);
  }
  else
  {
    // we have a match!
    // select zero item
    //selectbox.options.selectedIndex = 0;
    //setTimeout('__doPostBack(\'ctl00$ctl00$CPContent$CPMain$ddlPoolLeagues\',\'\')', 100);
    // tell how many countries have been removed
    textbox.innerHTML += "<br/>Removed <b style=\"color:red;\">"+ rem_count +"/" + orig_len + "</b> countries.";
  }

  // append reload button
  textbox.innerHTML += ' <a id="ctl00_ctl00_CPContent_CPSidebar_btnBrowsePool" href="javascript:__doPostBack(\'ctl00$ctl00$CPContent$CPMain$ddlPoolLeagues\',\'\')">Reload</a>';

  // fill array with select elements
  for( iter=0; iter<selectbox.length; iter++ )
  {
    sortlist[iter] = selectbox.options[iter];
    debug_text += selectbox.options[iter].text + ' ';
  }

  //alert( debug_text )
}

// switch functions by url
var flags_idx = document.URL.indexOf( "/Club/Flags/" );
var chall_idx = document.URL.indexOf( "/Club/Challenges/" );
var leags_idx = document.URL.indexOf( "/World/Leagues/" );

if( flags_idx != -1 )
  flags_page( );

if( chall_idx != -1 )
  challenge_page( );

if( leags_idx != -1 )
  leagues_page();
