// Minimal Clash iOS cron script: directly POST to two firewall endpoints.
// Credentials live in the module's argument, not in this public JS file.
var tokens = String($argument || '').split(',');
var pending = 0;
var i;

for (i = 0; i < tokens.length; i++) {
  tokens[i] = tokens[i].trim();
  if (tokens[i]) pending++;
}

if (pending === 0) {
  console.log('POST: no tokens configured');
  $done();
} else {
  tokens.forEach(function (token, index) {
    if (!token) return;
    var url = 'https://124.221.69.228/api/firewall/' + token + '/add';
    $httpClient.post(url, function (error, response, body) {
      console.log('POST ' + (index + 1) + ': ' + (error ? String(error) : 'HTTP ' + (response && (response.status || response.statusCode) || 'unknown')));
      pending--;
      if (pending === 0) $done();
    });
  });
}
