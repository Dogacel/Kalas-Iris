// Copyright 2013 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// ignore_for_file: public_member_api_docs

import 'dart:async';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:mobile/camera_view.dart';
import 'package:mobile/helpers.dart';
import 'package:provider/provider.dart';

Future<void> main() async {
  // Fetch the available cameras before initializing the app.
  List<CameraDescription> cameras = List.empty();
  try {
    WidgetsFlutterBinding.ensureInitialized();
    cameras = await availableCameras();
  } on CameraException catch (e) {
    logError(e.code, e.description);
  }
  runApp(CameraApp(cameras: cameras));
}

class CameraApp extends StatelessWidget {
  final List<CameraDescription> cameras;

  const CameraApp({Key? key, required this.cameras}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Provider<List<CameraDescription>>.value(
      value: this.cameras,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primaryColor: Colors.deepPurple,
          accentColor: Colors.deepPurpleAccent,
        ),
        home: Scaffold(
          body: SafeArea(
            child: CameraExampleHome(),
          ),
        ),
        builder: EasyLoading.init(),
      ),
    );
  }
}
