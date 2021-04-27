import 'dart:async';
import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:mobile/annotation_result.dart';
import 'package:mobile/api.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:mobile/retrieval_result.dart';

class ImagePreviewPage extends StatelessWidget {
  final XFile imageFile;
  final bool cropBeforeShow;

  const ImagePreviewPage(
      {Key? key, required this.imageFile, required this.cropBeforeShow})
      : super(key: key);

  Future<File?> croppedImageFuture(String sourcePath) {
    return ImageCropper.cropImage(
        sourcePath: sourcePath,
        aspectRatioPresets: [
          CropAspectRatioPreset.square,
          CropAspectRatioPreset.ratio3x2,
          CropAspectRatioPreset.original,
          CropAspectRatioPreset.ratio4x3,
          CropAspectRatioPreset.ratio16x9
        ],
        androidUiSettings: AndroidUiSettings(
            toolbarTitle: 'Crop Image',
            toolbarColor: Colors.deepPurple,
            toolbarWidgetColor: Colors.white,
            initAspectRatio: CropAspectRatioPreset.original,
            lockAspectRatio: false),
        iosUiSettings: IOSUiSettings(
          minimumAspectRatio: 1.0,
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Photo'),
      ),
      body: FutureBuilder<File?>(
        future: cropBeforeShow
            ? croppedImageFuture(imageFile.path)
            : Future.value(File(imageFile.path)),
        builder: (context, snapshot) {
          return snapshot.hasData && snapshot.data != null
              ? InnerPrevivew(imageFile: snapshot.data!)
              : InnerPrevivew(imageFile: File(imageFile.path));
        },
      ),
    );
  }
}

class InnerPrevivew extends StatefulWidget {
  InnerPrevivew({
    Key? key,
    required this.imageFile,
  }) : super(key: key);

  final File imageFile;

  @override
  _InnerPrevivewState createState() => _InnerPrevivewState();
}

class _InnerPrevivewState extends State<InnerPrevivew> {
  final _controller = ScrollController();

  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    Timer(
      Duration(milliseconds: 500),
      () => _controller.animateTo(
        _controller.position.maxScrollExtent,
        duration: Duration(seconds: 1),
        curve: Curves.fastOutSlowIn,
      ),
    );

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: ListView(
        controller: _controller,
        children: [
          Image.file(this.widget.imageFile),
          OutlinedButton(
            child: Text('Annotate Image'),
            onPressed: () {
              EasyLoading.show(status: 'loading...');
              annotateImage(this.widget.imageFile).then((value) {
                EasyLoading.dismiss();
                print(value);
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return AnnotationResult(data: value);
                }));
              });
            },
          ),
          OutlinedButton(
            child: Text('Retrieve Similiar Products'),
            onPressed: () {
              EasyLoading.show(status: 'This might take a while...');
              retrieveSimiliar(this.widget.imageFile).then((value) {
                EasyLoading.dismiss();
                print(value);
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return RetrievalResult(data: value);
                }));
              });
            },
          ),
        ],
      ),
    );
  }
}
