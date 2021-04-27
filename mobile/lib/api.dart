import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

final basePath = 'http://34.91.142.201';

Future<dynamic> annotateImage(File imageFile) async {
  var uri = Uri.parse(basePath + '/annotate');

  var request = new http.MultipartRequest("POST", uri);

  request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));

  return request.send().then((response) async {
    if (response.statusCode == 200) {
      var data = await response.stream
          .transform(utf8.decoder)
          .transform(json.decoder)
          .first;

      return data;
    }
  });
}

Future<dynamic> retrieveSimiliar(File imageFile) async {
  var uri = Uri.parse(basePath + '/retrieve');

  var request = new http.MultipartRequest("POST", uri);

  request.files.add(await http.MultipartFile.fromPath('image', imageFile.path));

  return request.send().then((response) async {
    if (response.statusCode == 200) {
      var data = await response.stream
          .transform(utf8.decoder)
          .transform(json.decoder)
          .first;

      return data;
    }
  });
}
