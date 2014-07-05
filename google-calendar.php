<?php
$your_google_calendar="https://www.google.com/calendar/embed?showPrint=0&showTitle=0&showCalendars=0&mode=AGENDA&height=500&wkst=1&bgcolor=%23FFFFFF&src=hoteltellurideco%40gmail.com&color=%232952A3&ctz=America%2FDenver";
$url= parse_url($your_google_calendar);
$google_domain = $url['scheme'].'://'.$url['host'].dirname($url['path']).'/';
// Load and parse Google's raw calendar
$dom = new DOMDocument;
$dom->loadHTMLfile($your_google_calendar);
// Change Google's CSS file to use absolute URLs (assumes there's only one element)
$css = $dom->getElementsByTagName('link')->item(0);
$css_href = $css->getAttribute('href');
$css->setAttribute('href', $google_domain . $css_href);
// Change Google's JS file to use absolute URLs
$scripts = $dom->getElementsByTagName('script');
foreach ($scripts as $script) {
$js_src = $script->getAttribute('src');
if ($js_src) $script->setAttribute('src', $google_domain . $js_src);
}
// Create a link to a new CSS file called custom_calendar.css
$element = $dom->createElement('link');
$element->setAttribute('type', 'text/css');
$element->setAttribute('rel', 'stylesheet');
$element->setAttribute('href', 'css/calendar.css');
// Append this link at the end of the element
$head = $dom->getElementsByTagName('head')->item(0);
$head->appendChild($element);
// Export the HTML
echo $dom->saveHTML();
?>
